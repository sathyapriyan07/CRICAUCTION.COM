
import React, { useState } from 'react';
import { UserRole, League } from '../types';
import { MOCK_TEAMS } from '../constants';
import { Gavel, User as UserIcon, ShieldCheck, Globe } from 'lucide-react';

interface LoginProps {
  onLogin: (name: string, role: UserRole, teamId?: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.USER);
  const [league, setLeague] = useState<League>(League.IPL);
  const [teamId, setTeamId] = useState('');
  const [mode, setMode] = useState<'solo' | 'multi'>('solo');

  const roles = [
    { id: UserRole.USER, label: 'Player (Solo / AI)', icon: UserIcon, desc: 'Lead your team against elite AI bidders.', mode: 'solo' },
    { id: UserRole.AUCTIONEER, label: 'Auctioneer', icon: Gavel, desc: 'Conduct the auction for others (Multiplayer).', mode: 'multi' },
    { id: UserRole.ADMIN, label: 'Admin', icon: ShieldCheck, desc: 'Manage league rules and player data.', mode: 'multi' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name) {
      onLogin(name, role, role === UserRole.USER ? teamId : undefined);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 sm:p-6">
      <div className="bg-slate-900 max-w-lg w-full rounded-2xl sm:rounded-[2.5rem] shadow-2xl border border-slate-800 p-6 sm:p-10 space-y-6 sm:space-y-8">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mx-auto shadow-xl shadow-indigo-600/20 mb-4 sm:mb-6">
            <Gavel size={32} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">Elite Auction Pro</h1>
          <p className="text-slate-500 text-xs sm:text-sm font-medium italic">Realistic cricket auction simulator.</p>
        </div>

        {/* Mode Selector */}
        <div className="flex bg-slate-800 p-1 rounded-xl sm:rounded-2xl border border-slate-700">
          <button 
            onClick={() => { setMode('solo'); setRole(UserRole.USER); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-black text-[10px] sm:text-xs uppercase tracking-widest transition-all ${mode === 'solo' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <UserIcon size={14} /> Solo
          </button>
          <button 
            onClick={() => { setMode('multi'); setRole(UserRole.AUCTIONEER); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-black text-[10px] sm:text-xs uppercase tracking-widest transition-all ${mode === 'multi' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <Globe size={14} /> Multi
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Your Identity</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Manager Name..."
              className="w-full bg-slate-800/50 border-slate-700 border-2 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all outline-none font-bold text-sm text-white placeholder:text-slate-600"
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
              Select {mode === 'solo' ? 'Seat' : 'Control Role'}
            </label>
            <div className="grid grid-cols-1 gap-2 sm:gap-3">
              {roles.filter(r => r.mode === mode).map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id)}
                  className={`flex items-center gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all text-left ${
                    role === r.id ? 'bg-indigo-500/10 border-indigo-600' : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div className={`p-2 rounded-lg sm:rounded-xl ${role === r.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'bg-slate-700 text-slate-500'}`}>
                    <r.icon size={18} />
                  </div>
                  <div>
                    <h3 className={`font-black text-[11px] sm:text-xs uppercase tracking-widest ${role === r.id ? 'text-white' : 'text-slate-400'}`}>{r.label}</h3>
                    <p className="text-[9px] text-slate-500 font-bold leading-none mt-1">{r.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {role === UserRole.USER && (
            <div className="space-y-4 animate-fadeIn">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">League</label>
                  <select
                    value={league}
                    onChange={(e) => {
                      setLeague(e.target.value as League);
                      setTeamId('');
                    }}
                    className="w-full bg-slate-800 border-slate-700 border-2 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 font-bold text-xs text-white outline-none focus:border-indigo-600"
                  >
                    {Object.values(League).map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Franchise</label>
                  <select
                    required
                    value={teamId}
                    onChange={(e) => setTeamId(e.target.value)}
                    className="w-full bg-slate-800 border-slate-700 border-2 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 font-bold text-xs text-white outline-none focus:border-indigo-600"
                  >
                    <option value="">Select Team</option>
                    {MOCK_TEAMS[league].map(t => <option key={t.id} value={t.id}>{t.shortName}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black text-sm sm:text-base uppercase tracking-[0.2em] hover:bg-indigo-500 shadow-2xl shadow-indigo-600/20 transition-all transform active:scale-[0.98] mt-4"
          >
            Launch {mode === 'solo' ? 'Solo Arena' : 'Control Room'}
          </button>
        </form>
      </div>
    </div>
  );
};
