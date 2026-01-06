
import { useState, useEffect, useCallback, useRef } from 'react';
import { AuctionState, AuctionStatus, League, Player, Team, Bid, User, UserRole } from '../types.ts';
import { MOCK_PLAYERS, MOCK_TEAMS, LEAGUE_CONFIG } from '../constants.tsx';
import { getAuctionCommentary } from '../services/geminiService.ts';

export const useAuction = (initialLeague: League, user: User, customPlayers?: Player[]) => {
  const [state, setState] = useState<AuctionState>(() => {
    // If the user selected a team, mark it as non-AI
    const initialTeams = MOCK_TEAMS[initialLeague].map(t => 
      t.id === user.selectedTeamId ? { ...t, isAI: false } : t
    );

    const playersToUse = customPlayers && customPlayers.length > 0 ? customPlayers : [...MOCK_PLAYERS];

    return {
      currentLeague: initialLeague,
      status: AuctionStatus.IDLE,
      currentPlayer: null,
      currentBid: 0,
      highestBidder: null,
      bidHistory: [],
      timer: 15,
      teams: initialTeams,
      playerQueue: playersToUse,
      soldPlayers: [],
      unsoldPlayers: []
    };
  });

  const [commentary, setCommentary] = useState("Waiting for the auctioneer to start...");
  const timerRef = useRef<any>(null);
  const aiTimerRef = useRef<any>(null);

  const startAuction = () => {
    nextPlayer();
  };

  const nextPlayer = useCallback(() => {
    setState(prev => {
      const nextQ = [...prev.playerQueue];
      const player = nextQ.shift();
      if (!player) return { ...prev, status: AuctionStatus.COMPLETED };

      return {
        ...prev,
        status: AuctionStatus.LIVE,
        currentPlayer: player,
        currentBid: player.basePrice,
        highestBidder: null,
        bidHistory: [],
        timer: 15,
        playerQueue: nextQ
      };
    });
  }, []);

  const placeBid = useCallback((teamId: string) => {
    setState(prev => {
      if (prev.status !== AuctionStatus.LIVE) return prev;
      
      const team = prev.teams.find(t => t.id === teamId);
      if (!team) return prev;
      
      const increment = prev.currentBid < 5 ? 0.2 : (prev.currentBid < 10 ? 0.5 : 1.0);
      const nextAmount = prev.highestBidder ? prev.currentBid + increment : prev.currentBid;

      if (team.purse < nextAmount) return prev;
      if (prev.highestBidder === teamId) return prev; // Cannot outbid self

      const newBid: Bid = { teamId, amount: nextAmount, timestamp: Date.now() };
      return {
        ...prev,
        currentBid: nextAmount,
        highestBidder: teamId,
        bidHistory: [newBid, ...prev.bidHistory],
        timer: 15 
      };
    });
  }, []);

  // AI Bidding Logic
  useEffect(() => {
    if (state.status === AuctionStatus.LIVE && state.currentPlayer) {
      aiTimerRef.current = setInterval(() => {
        // Randomly pick an AI team to bid
        const aiTeams = state.teams.filter(t => t.isAI && t.id !== state.highestBidder);
        if (aiTeams.length === 0) return;

        const bidder = aiTeams[Math.floor(Math.random() * aiTeams.length)];
        
        // Strategy: Bid if below estimated value (simulated)
        const estimatedValue = state.currentPlayer!.basePrice * (1.5 + Math.random() * 2);
        const increment = state.currentBid < 5 ? 0.2 : (state.currentBid < 10 ? 0.5 : 1.0);
        const nextAmount = state.highestBidder ? state.currentBid + increment : state.currentBid;

        if (state.currentBid < estimatedValue && Math.random() > 0.7 && bidder.purse >= nextAmount) {
          placeBid(bidder.id);
        }
      }, 2500); // Check for AI bid every 2.5s
    } else {
      if (aiTimerRef.current) clearInterval(aiTimerRef.current);
    }
    return () => clearInterval(aiTimerRef.current);
  }, [state.status, state.currentPlayer, state.currentBid, state.highestBidder, placeBid, state.teams]);

  useEffect(() => {
    if (state.status === AuctionStatus.LIVE && state.timer > 0) {
      timerRef.current = setInterval(() => {
        setState(prev => ({ ...prev, timer: prev.timer - 1 }));
      }, 1000);
    } else if (state.timer === 0 && state.status === AuctionStatus.LIVE) {
      handleEndOfBidding();
    }
    return () => clearInterval(timerRef.current);
  }, [state.status, state.timer]);

  const handleEndOfBidding = async () => {
    if (!state.currentPlayer) return;

    const isSold = !!state.highestBidder;
    const winnerTeam = state.teams.find(t => t.id === state.highestBidder);
    
    setCommentary(`Sold to ${winnerTeam?.name || "Unsold"}!`);
    
    const comm = await getAuctionCommentary(
      state.currentLeague,
      state.currentPlayer.name,
      state.currentBid,
      winnerTeam?.name || "No one",
      isSold
    );
    setCommentary(comm);

    if (isSold && state.highestBidder) {
      const bid = state.currentBid;
      const teamId = state.highestBidder;
      
      setState(prev => ({
        ...prev,
        status: AuctionStatus.PAUSED,
        soldPlayers: [...prev.soldPlayers, { playerId: prev.currentPlayer!.id, teamId, price: bid }],
        teams: prev.teams.map(t => t.id === teamId ? {
          ...t,
          purse: t.purse - bid,
          playersBought: [...t.playersBought, prev.currentPlayer!.id]
        } : t)
      }));
    } else {
      setState(prev => ({
        ...prev,
        status: AuctionStatus.PAUSED,
        unsoldPlayers: [...prev.unsoldPlayers, prev.currentPlayer!.id]
      }));
    }

    setTimeout(() => {
      nextPlayer();
    }, 5000);
  };

  return { state, placeBid, startAuction, commentary };
};