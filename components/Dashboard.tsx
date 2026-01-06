
import React, { useState } from 'react';
import { 
  Play, 
  History, 
  TrendingUp, 
  Plus, 
  ArrowRight,
  ShieldCheck,
  User as UserIcon,
  Gavel,
  Trophy,
  Zap,
  FileUp,
  UserPlus,
  Trash2
} from 'lucide-react';
import { League, User, UserRole, Player } from '../types';
import { LEAGUE_CONFIG } from '../constants';
import { ImportPlayers } from './ImportPlayers';
import { AddPlayerForm } from './AddPlayerForm';

interface DashboardProps {
  user: User;
  onStartAuction: (league: League) => void;
  onImportCustomPool: (players: Player[]) => void;
  onAddCustomPlayer: (player: Player) => void;
  customPoolSize: number;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onStartAuction, onImportCustomPool, onAddCustomPlayer, customPoolSize }) => {
  const [showImport, setShowImport] = useState(false);
  const [showAddPlayer, setShowAddPlayer] = useState(false);

  const stats = [
    { label: 'Live Rooms', value: '12', icon: Zap, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { label: 'History', value: '158', icon: History, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: 'Custom Pool', value: customPoolSize.toString(), icon: FileUp, color: 'text-orange-400', bg: 'bg-orange-500/10' },
    { label: 'Rank', value: '#42', icon: Trophy, color: 'text-amber-400', bg: 'bg-amber-500/10' },
  ];

  const clearCustomPool = () => {
    onImportCustomPool([]);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 animate-fadeIn pb-24">
      {/* CREX Hub Header */}
      <div className="bg-slate-800 rounded-2xl sm:rounded-[2rem] border border-slate-700 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full w-fit border border-indigo-500/20">
               {user.role === UserRole.ADMIN ? <ShieldCheck size={12} /> : user.role === UserRole.AUCTIONEER ? <Gavel size={12} /> : <UserIcon size={12} />}
               <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest leading-none">{user.role} ACCESS</span>
            </div>
            <div>
               <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tighter leading-tight">Elite Hub</h2>
               <p className="text-slate-400 text-xs sm:text-sm font-medium max-w-sm">Welcome back, {user.name}. Ready to setup your custom auction?</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {/* Enabled for all users to support "Custom Auctions" for everyone */}
            <button 
              onClick={() => setShowAddPlayer(true)}
              className="bg-slate-700 hover:bg-slate-600 text-slate-200 px-6 py-3.5 rounded-xl sm:rounded-2xl font-black text-[10px] sm:text-xs uppercase tracking-widest transition-all border border-slate-600 flex items-center justify-center gap-2 shadow-lg"
            >
              <UserPlus size={16} /> ADD PLAYER
            </button>
            <button 
              onClick={() => setShowImport(true)}
              className="bg-slate-700 hover:bg-slate-600 text-slate-200 px-6 py-3.5 rounded-xl sm:rounded-2xl font-black text-[10px] sm:text-xs uppercase tracking-widest transition-all border border-slate-600 flex items-center justify-center gap-2 shadow-lg"
            >
              <FileUp size={16} /> IMPORT POOL
            </button>
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3.5 rounded-xl sm:rounded-2xl font-black text-[10px] sm:text-xs uppercase tracking-widest transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2">
              <Plus size={16} /> CREATE ROOM
            </button>
          </div>
        </div>
        
        {customPoolSize > 0 && (
          <div className="absolute top-4 right-4 z-20 animate-pulse flex items-center gap-2 bg-orange-500/20 border border-orange-500/40 px-3 py-1 rounded-full">
            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
            <span className="text-[9px] font-black text-orange-400 uppercase tracking-widest">Custom Pool Active ({customPoolSize})</span>
            <button onClick={clearCustomPool} className="hover:text-red-400 text-orange-400/60 ml-1 transition-colors">
              <Trash2 size={12} />
            </button>
          </div>
        )}
        
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-indigo-500/5 rounded-bl-full -mr-16 -mt-16 sm:-mr-20 sm:-mt-20"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-slate-800 p-4 sm:p-5 rounded-xl sm:rounded-3xl border border-slate-700 flex flex-col gap-3 sm:gap-4 group hover:border-indigo-500/50 transition-all">
            <div className={`${stat.bg} ${stat.color} w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center`}>
              <stat.icon size={16} sm:size={20} />
            </div>
            <div>
              <p className="text-[8px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
              <p className="text-lg sm:text-2xl font-black text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tournament Selection */}
      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-[10px] sm:text-xs font-black text-slate-500 uppercase tracking-widest">Select League to Begin</h3>
          <p className="text-[9px] font-bold text-slate-600 uppercase italic">
            {customPoolSize > 0 ? 'Custom pool will replace default players' : 'Using default league pools'}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(LEAGUE_CONFIG).map(([key, config]) => (
            <div 
              key={key} 
              className="bg-slate-800 rounded-2xl sm:rounded-3xl border border-slate-700 p-5 sm:p-6 hover:shadow-2xl hover:border-indigo-500/50 transition-all cursor-pointer group overflow-hidden relative"
              onClick={() => onStartAuction(key as League)}
            >
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4 sm:mb-6">
                  <span className="text-4xl sm:text-5xl drop-shadow-lg">{key === League.IPL ? '🇮🇳' : key === League.SA20 ? '🇿🇦' : '🇦🇺'}</span>
                  <div className="bg-green-500/10 text-green-500 text-[8px] sm:text-[9px] font-black px-2 py-1 rounded-md tracking-tighter border border-green-500/20 uppercase">READY</div>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white mb-1 sm:mb-2 leading-none uppercase tracking-tight">{config.name}</h3>
                <p className="text-slate-500 text-[10px] sm:text-xs font-medium mb-4 sm:mb-6 leading-relaxed">
                  Budget: <span className="text-slate-300 font-bold">{config.currency}{config.purse}{config.unit}</span>
                </p>
                <div className="mt-auto flex items-center justify-between">
                   <div className="flex items-center gap-2 text-indigo-400 font-black text-[10px] uppercase tracking-widest group-hover:gap-4 transition-all">
                    START AUCTION <ArrowRight size={14} />
                   </div>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-500/5 rounded-full group-hover:scale-150 transition-transform"></div>
            </div>
          ))}
        </div>
      </div>

      {showImport && <ImportPlayers onImport={onImportCustomPool} onClose={() => setShowImport(false)} />}
      {showAddPlayer && <AddPlayerForm onAdd={onAddCustomPlayer} onClose={() => setShowAddPlayer(false)} />}
    </div>
  );
};
