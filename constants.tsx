
import { League, PlayerRole, Player, Team } from './types';

export const LEAGUE_CONFIG = {
  [League.IPL]: {
    name: 'Indian Premier League',
    currency: '₹',
    unit: 'Cr',
    purse: 120,
    minSpend: 90,
    maxSquad: 25,
    minSquad: 18,
    maxOverseas: 8,
    primaryColor: '#2b1c6d',
    accentColor: '#fde047',
  },
  [League.SA20]: {
    name: 'SA20 League',
    currency: 'R',
    unit: 'M',
    purse: 41,
    minSpend: 30,
    maxSquad: 19,
    minSquad: 19,
    maxOverseas: 7,
    primaryColor: '#0d9488',
    accentColor: '#facc15',
  },
  [League.BBL]: {
    name: 'Big Bash League',
    currency: 'A$',
    unit: 'M',
    purse: 3,
    minSpend: 2.5,
    maxSquad: 18,
    minSquad: 15,
    maxOverseas: 3,
    primaryColor: '#4d7c0f',
    accentColor: '#f97316',
  }
};

export const MOCK_PLAYERS: Player[] = [
  { id: '1', name: 'Virat Kohli', role: PlayerRole.BATSMAN, nationality: 'India', basePrice: 2, stats: { matches: 252, runs: 8004, strikeRate: 131.97 }, image: 'https://picsum.photos/seed/virat/400/400' },
  { id: '2', name: 'Jasprit Bumrah', role: PlayerRole.BOWLER, nationality: 'India', basePrice: 2, stats: { matches: 133, wickets: 165, economy: 7.30 }, image: 'https://picsum.photos/seed/bumrah/400/400' },
  { id: '3', name: 'Pat Cummins', role: PlayerRole.ALL_ROUNDER, nationality: 'Australia', basePrice: 2, stats: { matches: 50, wickets: 60, runs: 500, strikeRate: 140 }, image: 'https://picsum.photos/seed/cummins/400/400' },
  { id: '4', name: 'Heinrich Klaasen', role: PlayerRole.WICKET_KEEPER, nationality: 'South Africa', basePrice: 1.5, stats: { matches: 80, runs: 1200, strikeRate: 170.5 }, image: 'https://picsum.photos/seed/klaasen/400/400' },
  { id: '5', name: 'Rashid Khan', role: PlayerRole.BOWLER, nationality: 'Afghanistan', basePrice: 2, stats: { matches: 120, wickets: 140, economy: 6.8 }, image: 'https://picsum.photos/seed/rashid/400/400' },
  { id: '6', name: 'Glenn Maxwell', role: PlayerRole.ALL_ROUNDER, nationality: 'Australia', basePrice: 2, stats: { matches: 120, runs: 2800, strikeRate: 155 }, image: 'https://picsum.photos/seed/maxy/400/400' },
  { id: '7', name: 'Nicholas Pooran', role: PlayerRole.WICKET_KEEPER, nationality: 'West Indies', basePrice: 1.5, stats: { matches: 100, runs: 2500, strikeRate: 160 }, image: 'https://picsum.photos/seed/pooran/400/400' },
];

export const MOCK_TEAMS: Record<League, Team[]> = {
  [League.IPL]: [
    { id: 'csk', name: 'Chennai Super Kings', shortName: 'CSK', logo: 'CSK', purse: 120, playersBought: [], overseasCount: 0, isAI: true },
    { id: 'mi', name: 'Mumbai Indians', shortName: 'MI', logo: 'MI', purse: 120, playersBought: [], overseasCount: 0, isAI: true },
    { id: 'rcb', name: 'Royal Challengers Bengaluru', shortName: 'RCB', logo: 'RCB', purse: 120, playersBought: [], overseasCount: 0, isAI: true },
    { id: 'kkr', name: 'Kolkata Knight Riders', shortName: 'KKR', logo: 'KKR', purse: 120, playersBought: [], overseasCount: 0, isAI: true },
    { id: 'gt', name: 'Gujarat Titans', shortName: 'GT', logo: 'GT', purse: 120, playersBought: [], overseasCount: 0, isAI: true },
    { id: 'lsg', name: 'Lucknow Super Giants', shortName: 'LSG', logo: 'LSG', purse: 120, playersBought: [], overseasCount: 0, isAI: true },
    { id: 'rr', name: 'Rajasthan Royals', shortName: 'RR', logo: 'RR', purse: 120, playersBought: [], overseasCount: 0, isAI: true },
    { id: 'dc', name: 'Delhi Capitals', shortName: 'DC', logo: 'DC', purse: 120, playersBought: [], overseasCount: 0, isAI: true },
    { id: 'pbks', name: 'Punjab Kings', shortName: 'PBKS', logo: 'PBKS', purse: 120, playersBought: [], overseasCount: 0, isAI: true },
    { id: 'srh', name: 'Sunrisers Hyderabad', shortName: 'SRH', logo: 'SRH', purse: 120, playersBought: [], overseasCount: 0, isAI: true },
  ],
  [League.SA20]: [
    { id: 'jsk', name: 'Joburg Super Kings', shortName: 'JSK', logo: 'JSK', purse: 41, playersBought: [], overseasCount: 0, isAI: true },
    { id: 'sec', name: 'Sunrisers Eastern Cape', shortName: 'SEC', logo: 'SEC', purse: 41, playersBought: [], overseasCount: 0, isAI: true },
    { id: 'dsg', name: 'Durban Super Giants', shortName: 'DSG', logo: 'DSG', purse: 41, playersBought: [], overseasCount: 0, isAI: true },
    { id: 'pr', name: 'Paarl Royals', shortName: 'PR', logo: 'PR', purse: 41, playersBought: [], overseasCount: 0, isAI: true },
    { id: 'mict', name: 'MI Cape Town', shortName: 'MICT', logo: 'MICT', purse: 41, playersBought: [], overseasCount: 0, isAI: true },
    { id: 'pc', name: 'Pretoria Capitals', shortName: 'PC', logo: 'PC', purse: 41, playersBought: [], overseasCount: 0, isAI: true },
  ],
  [League.BBL]: [
    { id: 'ss', name: 'Sydney Sixers', shortName: 'SS', logo: 'SS', purse: 3, playersBought: [], overseasCount: 0, isAI: true },
    { id: 'ps', name: 'Perth Scorchers', shortName: 'PS', logo: 'PS', purse: 3, playersBought: [], overseasCount: 0, isAI: true },
    { id: 'bh', name: 'Brisbane Heat', shortName: 'BH', logo: 'BH', purse: 3, playersBought: [], overseasCount: 0, isAI: true },
    { id: 'mr', name: 'Melbourne Renegades', shortName: 'MR', logo: 'MR', purse: 3, playersBought: [], overseasCount: 0, isAI: true },
    { id: 'ms', name: 'Melbourne Stars', shortName: 'MS', logo: 'MS', purse: 3, playersBought: [], overseasCount: 0, isAI: true },
    { id: 'as', name: 'Adelaide Strikers', shortName: 'AS', logo: 'AS', purse: 3, playersBought: [], overseasCount: 0, isAI: true },
    { id: 'st', name: 'Sydney Thunder', shortName: 'ST', logo: 'ST', purse: 3, playersBought: [], overseasCount: 0, isAI: true },
    { id: 'hh', name: 'Hobart Hurricanes', shortName: 'HH', logo: 'HH', purse: 3, playersBought: [], overseasCount: 0, isAI: true },
  ]
};
