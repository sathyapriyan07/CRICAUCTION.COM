
import React, { useState } from 'react';
import { 
  Gavel, 
  Clock, 
  ArrowLeft, 
  Volume2, 
  Maximize, 
  TrendingUp, 
  Info,
  ShieldAlert,
  User as UserIcon,
  Bot,
  PlayCircle,
  Share2,
  ChevronRight,
  Zap,
  List,
  MessageSquare
} from 'lucide-react';
import { League, AuctionStatus, User, UserRole, Player } from '../types';
import { LEAGUE_CONFIG } from '../constants';
import { useAuction } from '../hooks/useAuction';

interface AuctionRoomProps {
  user: User;
  league: League;
  onExit: () => void;
  customPlayers?: Player[];
}

export const AuctionRoom: React.FC<AuctionRoomProps> = ({ user, league, onExit, customPlayers }) => {
  const { state, placeBid, startAuction, commentary } = useAuction(league, user, customPlayers);
  const [mobileTab, setMobileTab] = useState<'live' | 'table' | 'history'>('live');
  const config = LEAGUE_CONFIG[league];
  const userTeam = state.teams.find(t => t.id === user.selectedTeamId);

  if (state.status === AuctionStatus.IDLE) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] sm:h-[80vh] space-y-6 sm:space-y-8 animate-fadeIn px-4">
        <div className="relative">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-indigo-500/10 rounded-2xl sm:rounded-3xl flex items-center justify-center text-indigo-400 border border-indigo-500/20">
            <Gavel size={40} />
          </div>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-slate-900 animate-pulse"></div>
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-white">Ready for the Hammer?</h2>
          <p className="text-slate-400 max-w-sm text-sm sm:text-base font-medium">The {league} 2026 Auction is about to go live. Teams are seated, purses are locked.</p>
          {customPlayers && <p className="text-indigo-400 font-black text-[10px] uppercase tracking-widest mt-2">Using Custom Pool: {customPlayers.length} Players</p>}
        </div>
        
        <button 
          onClick={startAuction}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black text-lg sm:text-xl shadow-2xl shadow-indigo-500/20 transition-all transform active:scale-95 flex items-center gap-3"
        >
          <PlayCircle size={24} />
          GO LIVE NOW
        </button>
      </div>
    );
  }

  const currentPlayer = state.currentPlayer;
  const isBiddingAllowed = user.role === UserRole.USER && state.status === AuctionStatus.LIVE && user.selectedTeamId !== state.highestBidder;

  return (
    <div className="max-w-[1400px] mx-auto flex flex-col gap-4 pb-32 lg:grid lg:grid-cols-12">
      
      {/* Mobile-Only Tab Switcher */}
      <div className="lg:hidden flex bg-slate-900/80 p-1 rounded-xl border border-slate-800 sticky top-0 z-[50] backdrop-blur-md">
        <button 
          onClick={() => setMobileTab('live')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest transition-all ${mobileTab === 'live' ? 'bg-indigo-600 text-white' : 'text-slate-500'}`}
        >
          <Zap size={14} /> Live
        </button>
        <button 
          onClick={() => setMobileTab('table')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest transition-all ${mobileTab === 'table' ? 'bg-indigo-600 text-white' : 'text-slate-500'}`}
        >
          <List size={14} /> Standings
        </button>
        <button 
          onClick={() => setMobileTab('history')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest transition-all ${mobileTab === 'history' ? 'bg-indigo-600 text-white' : 'text-slate-500'}`}
        >
          <MessageSquare size={14} /> Feed
        </button>
      </div>

      {/* Desktop Top Bar */}
      <div className="hidden lg:flex lg:col-span-12 bg-slate-800/50 backdrop-blur-md p-3 rounded-2xl border border-slate-700 items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onExit} className="p-2 hover:bg-slate-700 rounded-xl transition-colors text-slate-400">
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-2 bg-red-600/10 px-3 py-1 rounded-full border border-red-600/20">
            <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black text-red-500 uppercase tracking-tighter">LIVE</span>
          </div>
          <h1 className="font-black text-sm text-slate-200 tracking-tight">{league} AUCTION 2026</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-slate-900 px-4 py-2 rounded-xl border border-slate-700 flex items-center gap-3">
            <Clock className="text-indigo-400" size={16} />
            <span className={`text-xl font-black geist-mono leading-none ${state.timer <= 5 ? 'text-red-500' : 'text-white'}`}>
              00:{state.timer.toString().padStart(2, '0')}
            </span>
          </div>
          <button className="p-2 text-slate-400 hover:text-white transition-colors"><Share2 size={20} /></button>
        </div>
      </div>

      {/* LEFT: Standings */}
      <div className={`lg:col-span-3 space-y-3 ${mobileTab !== 'table' ? 'hidden lg:block' : 'block'}`}>
        <div className="bg-slate-800/80 rounded-2xl border border-slate-700 overflow-hidden">
          <div className="bg-slate-900/50 p-3 border-b border-slate-700 flex justify-between items-center">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Franchise Table</h3>
            <span className="text-[10px] font-black text-indigo-400">PURSE</span>
          </div>
          <div className="divide-y divide-slate-700/50 max-h-[500px] overflow-y-auto custom-scroll">
            {state.teams.map((team, idx) => (
              <div 
                key={team.id}
                className={`flex items-center justify-between p-3 transition-colors ${state.highestBidder === team.id ? 'bg-indigo-600/20' : 'hover:bg-slate-700/30'}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-slate-500 w-4">{idx + 1}</span>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-[10px] text-white shadow-inner ${team.id === user.selectedTeamId ? 'bg-amber-500' : 'bg-slate-700'}`}>
                    {team.shortName}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-200">{team.name}</span>
                    <div className="flex gap-1 items-center">
                      <span className="text-[9px] text-slate-500 font-bold uppercase">{team.playersBought.length} PLRS</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-black ${team.purse < 10 ? 'text-red-400' : 'text-white'}`}>{team.purse.toFixed(1)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CENTER: Player Profile */}
      <div className={`lg:col-span-6 space-y-4 ${mobileTab !== 'live' ? 'hidden lg:block' : 'block'}`}>
        {currentPlayer && (
          <div className="bg-slate-800 rounded-2xl sm:rounded-3xl border border-slate-700 overflow-hidden flex flex-col h-full shadow-2xl">
            {/* Timer Overlay for Mobile */}
            <div className="lg:hidden absolute top-4 right-4 z-20">
               <div className="bg-slate-900/80 backdrop-blur px-3 py-1.5 rounded-xl border border-slate-700 flex items-center gap-2">
                  <Clock size={12} className="text-indigo-400" />
                  <span className={`text-sm font-black geist-mono ${state.timer <= 5 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                    00:{state.timer.toString().padStart(2, '0')}
                  </span>
               </div>
            </div>

            {/* Player Profile Header */}
            <div className="bg-gradient-to-br from-slate-700 to-slate-800 p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 hidden sm:block">
                <div className="bg-indigo-500 text-white text-[9px] font-black px-2 py-1 rounded-md tracking-widest shadow-lg uppercase">MARQUEE</div>
              </div>

              <div className="shrink-0 flex justify-center sm:block">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-4 border-slate-600/50 bg-slate-900 shadow-xl">
                   <img src={currentPlayer.image} alt={currentPlayer.name} className="w-full h-full object-cover" />
                </div>
              </div>
              
              <div className="flex-1 space-y-3 sm:space-y-4 pt-2 text-center sm:text-left">
                <div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                    <img src={`https://flagsapi.com/${currentPlayer.nationality === 'India' ? 'IN' : currentPlayer.nationality === 'Australia' ? 'AU' : 'ZA'}/flat/64.png`} className="w-3 h-3 sm:w-4 sm:h-4 rounded-sm" />
                    <span className="text-[10px] sm:text-[11px] font-black text-indigo-400 uppercase tracking-widest">{currentPlayer.nationality}</span>
                    <span className="w-1 h-1 bg-slate-500 rounded-full"></span>
                    <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase">{currentPlayer.role}</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-black text-white leading-none tracking-tighter">{currentPlayer.name.toUpperCase()}</h2>
                </div>

                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                  <PillStat label="MTS" value={currentPlayer.stats.matches} color="bg-slate-700 text-slate-200" />
                  <PillStat label={currentPlayer.role === 'Bowler' ? 'WKT' : 'RUN'} value={currentPlayer.role === 'Bowler' ? currentPlayer.stats.wickets : currentPlayer.stats.runs} color="bg-blue-600/20 text-blue-400" />
                  <PillStat label={currentPlayer.role === 'Bowler' ? 'ECN' : 'STR'} value={currentPlayer.role === 'Bowler' ? currentPlayer.stats.economy : currentPlayer.stats.strikeRate} color="bg-orange-600/20 text-orange-400" />
                </div>
              </div>
            </div>

            {/* CREX Style Bid Box */}
            <div className="flex-1 p-6 flex flex-col justify-center items-center bg-slate-900/40 space-y-6 sm:space-y-8 min-h-[250px] sm:min-h-[300px]">
              <div className="text-center">
                <p className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-3 sm:mb-4">CURRENT BID VALUE</p>
                <div className="flex items-end justify-center gap-2 sm:gap-3">
                  <span className="text-xl sm:text-2xl text-slate-600 font-black mb-1 sm:mb-2">{config.currency}</span>
                  <span className="text-6xl sm:text-8xl font-black geist-mono tracking-tighter text-white tabular-nums drop-shadow-2xl">
                    {state.currentBid.toFixed(2)}
                  </span>
                  <span className="text-lg sm:text-xl text-slate-600 font-black uppercase mb-1 sm:mb-2">{config.unit}</span>
                </div>
              </div>

              {state.highestBidder ? (
                <div className="animate-slideIn flex items-center gap-3 sm:gap-4 bg-indigo-500/10 border border-indigo-500/20 px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl w-full max-w-sm justify-center">
                  <Zap size={16} className="text-indigo-400 fill-indigo-400" />
                  <div className="text-center">
                    <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Leading Bidder</p>
                    <p className="text-base sm:text-lg font-black text-indigo-400 leading-none">{state.teams.find(t => t.id === state.highestBidder)?.name}</p>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-800/50 border border-slate-700 px-5 py-2 rounded-xl text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                  STARTING FROM {config.currency}{currentPlayer.basePrice}{config.unit}
                </div>
              )}
            </div>
            
            {/* AI Commentary */}
            <div className="bg-slate-900 p-3 sm:p-4 border-t border-slate-700 flex items-center gap-3 sm:gap-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0">
                <Volume2 className="text-indigo-400" size={16} />
              </div>
              <p className="text-[10px] sm:text-xs font-medium text-slate-300 italic leading-relaxed">"{commentary}"</p>
            </div>
          </div>
        )}
      </div>

      {/* RIGHT: Bidding Log */}
      <div className={`lg:col-span-3 space-y-4 ${mobileTab !== 'history' ? 'hidden lg:block' : 'block'}`}>
        <div className="hidden lg:block">
           {user.role === UserRole.USER && user.selectedTeamId && (
            <BiddingPaddle state={state} user={user} userTeam={userTeam} config={config} isBiddingAllowed={isBiddingAllowed} placeBid={placeBid} />
           )}
        </div>

        {user.role === UserRole.AUCTIONEER && (
           <div className="bg-slate-800 rounded-3xl border border-slate-700 p-5 sm:p-6 space-y-4">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Management Panel</h3>
              <div className="space-y-2">
                 <button className="w-full bg-slate-700 hover:bg-slate-600 p-3 sm:p-4 rounded-xl font-bold flex items-center justify-between text-[10px] sm:text-xs transition-colors border border-slate-600/50">
                    SKIP TO NEXT <ChevronRight size={16} />
                 </button>
                 <button className="w-full bg-indigo-600 hover:bg-indigo-500 p-3 sm:p-4 rounded-xl font-black text-white transition-all shadow-lg active:scale-95 text-[11px] sm:text-sm uppercase tracking-widest">
                    CONFIRM SOLD
                 </button>
              </div>
           </div>
        )}

        <div className="bg-slate-800 rounded-2xl sm:rounded-3xl border border-slate-700 p-4 sm:p-5 flex flex-col h-[300px] sm:h-[350px]">
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Live Commentary Feed</h3>
          <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scroll">
            {state.bidHistory.length > 0 ? state.bidHistory.map((bid, i) => (
              <div key={i} className="flex items-start gap-2 sm:gap-3 animate-slideIn">
                <div className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 rounded bg-slate-700 flex items-center justify-center text-[8px] sm:text-[10px] font-black text-slate-300 mt-1 uppercase">
                  {state.teams.find(t => t.id === bid.teamId)?.shortName}
                </div>
                <div className="flex flex-col border-l border-slate-700 pl-2 sm:pl-3 pb-2">
                   <p className="text-[10px] sm:text-[11px] font-bold text-slate-300 leading-tight">
                     <span className="text-indigo-400 font-black uppercase">{state.teams.find(t => t.id === bid.teamId)?.name}</span> 
                     {' '}raised bid to <span className="text-white font-black">{config.currency}{bid.amount.toFixed(2)}</span>
                   </p>
                </div>
              </div>
            )) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-600 text-center space-y-2 opacity-50">
                <TrendingUp size={24} />
                <p className="text-[8px] sm:text-[10px] font-black uppercase">Awaiting first bid</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE BIDDING PADDLE */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] p-4 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
          {user.role === UserRole.USER && user.selectedTeamId && (
             <div className="flex items-center gap-3">
                <div className="flex-1">
                   <div className="flex justify-between items-center mb-1">
                      <span className="text-[8px] font-black text-slate-500 uppercase">Purse Left</span>
                      <span className="text-[10px] font-black text-white">{config.currency}{userTeam?.purse.toFixed(2)}</span>
                   </div>
                   <button
                      disabled={!isBiddingAllowed || (userTeam?.purse || 0) < (state.currentBid + 0.5)}
                      onClick={() => placeBid(user.selectedTeamId!)}
                      className={`w-full py-4 rounded-xl font-black text-base transition-all shadow-xl active:scale-95 flex flex-col items-center justify-center ${
                        isBiddingAllowed ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-600 cursor-not-allowed border border-slate-700'
                      }`}
                    >
                      RAISE BID +{state.currentBid < 5 ? 0.2 : 0.5}
                    </button>
                </div>
                <button onClick={onExit} className="p-4 bg-slate-800 rounded-xl text-slate-400">
                  <ArrowLeft size={20} />
                </button>
             </div>
          )}
          {user.role === UserRole.AUCTIONEER && (
            <button className="w-full bg-indigo-600 py-4 rounded-xl font-black text-white uppercase tracking-widest text-sm">
               Confirm Sold
            </button>
          )}
      </div>

      {/* DESKTOP Summary Bar */}
      <div className="hidden lg:flex fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-[800px] bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 shadow-2xl p-4 rounded-full items-center justify-between z-[100] px-10">
        <div className="flex items-center gap-10">
          <div className="flex flex-col items-center">
            <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Pool</span>
            <span className="text-sm font-black text-white">{state.playerQueue.length}</span>
          </div>
          <div className="h-6 w-px bg-slate-800"></div>
          <div className="flex flex-col items-center">
            <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Sold</span>
            <span className="text-sm font-black text-white">{state.soldPlayers.length}</span>
          </div>
          <div className="h-6 w-px bg-slate-800"></div>
          <div className="flex flex-col items-center">
            <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Avg Bid</span>
            <span className="text-sm font-black text-indigo-400">12.4</span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
             <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
             <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">System Ready</span>
          </div>
          <div className="flex gap-4">
             <Volume2 className="text-slate-400 cursor-pointer hover:text-white" size={20} />
             <Maximize className="text-slate-400 cursor-pointer hover:text-white" size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

const BiddingPaddle = ({ state, user, userTeam, config, isBiddingAllowed, placeBid }: any) => (
  <div className="bg-indigo-600 rounded-3xl p-6 shadow-2xl shadow-indigo-600/20 relative overflow-hidden group">
    <div className="relative z-10 flex flex-col gap-4">
       <div className="flex justify-between items-center">
         <h3 className="text-[10px] font-black text-white/60 uppercase tracking-widest">Your Paddle</h3>
         <span className="text-[10px] font-black bg-white/20 px-2 py-0.5 rounded text-white">{userTeam?.shortName}</span>
       </div>
       
       <button
          disabled={!isBiddingAllowed || (userTeam?.purse || 0) < (state.currentBid + 0.5)}
          onClick={() => placeBid(user.selectedTeamId!)}
          className={`w-full py-5 rounded-2xl font-black text-2xl transition-all shadow-xl active:scale-95 flex flex-col items-center justify-center ${
            isBiddingAllowed ? 'bg-white text-indigo-700 hover:bg-slate-100' : 'bg-indigo-700 text-indigo-400/50 cursor-not-allowed border border-white/10'
          }`}
        >
          RAISE BID
          <span className="text-[11px] font-bold uppercase mt-1 opacity-60">
            +{state.currentBid < 5 ? 0.2 : 0.5} {config.unit}
          </span>
        </button>
        
        <div className="flex justify-between items-center border-t border-white/10 pt-4">
           <div className="flex flex-col">
             <span className="text-[9px] text-white/50 font-black uppercase tracking-widest">Budget</span>
             <span className="text-sm font-black text-white">{config.currency}{userTeam?.purse.toFixed(2)}</span>
           </div>
           <div className="flex flex-col text-right">
             <span className="text-[9px] text-white/50 font-black uppercase tracking-widest">Squad</span>
             <span className="text-sm font-black text-white">{userTeam?.playersBought.length}/{config.maxSquad || 18}</span>
           </div>
        </div>
    </div>
    <div className="absolute -bottom-6 -right-6 text-white/5 transform rotate-12 group-hover:scale-110 transition-transform">
      <Gavel size={120} />
    </div>
  </div>
);

const PillStat = ({ label, value, color }: { label: string, value: any, color: string }) => (
  <div className={`${color} px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl border border-white/5 flex items-center gap-1.5 sm:gap-2`}>
    <span className="text-[8px] sm:text-[10px] font-black uppercase opacity-60 tracking-widest">{label}</span>
    <span className="text-[10px] sm:text-xs font-black">{value}</span>
  </div>
);
