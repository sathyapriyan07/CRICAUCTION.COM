
export enum League {
  IPL = 'IPL',
  SA20 = 'SA20',
  BBL = 'BBL'
}

export enum PlayerRole {
  BATSMAN = 'Batsman',
  BOWLER = 'Bowler',
  ALL_ROUNDER = 'All-Rounder',
  WICKET_KEEPER = 'Wicket-Keeper'
}

export enum AuctionStatus {
  IDLE = 'IDLE',
  LIVE = 'LIVE',
  PAUSED = 'PAUSED',
  COMPLETED = 'COMPLETED'
}

export enum UserRole {
  ADMIN = 'ADMIN',
  AUCTIONEER = 'AUCTIONEER',
  USER = 'USER'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  selectedTeamId?: string;
}

export interface Player {
  id: string;
  name: string;
  role: PlayerRole;
  nationality: string;
  basePrice: number;
  stats: {
    matches: number;
    runs?: number;
    wickets?: number;
    strikeRate?: number;
    economy?: number;
  };
  image: string;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  purse: number;
  playersBought: string[]; // Player IDs
  overseasCount: number;
  isAI: boolean;
}

export interface Bid {
  teamId: string;
  amount: number;
  timestamp: number;
}

export interface AuctionState {
  currentLeague: League;
  status: AuctionStatus;
  currentPlayer: Player | null;
  currentBid: number;
  highestBidder: string | null; // Team ID
  bidHistory: Bid[];
  timer: number;
  teams: Team[];
  playerQueue: Player[];
  soldPlayers: { playerId: string; teamId: string; price: number }[];
  unsoldPlayers: string[]; // Player IDs
}
