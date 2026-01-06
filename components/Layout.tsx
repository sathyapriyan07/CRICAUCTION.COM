
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Trophy, 
  Users, 
  Settings, 
  Bell, 
  Search, 
  ChevronDown,
  Menu,
  X,
  LogOut,
  Zap
} from 'lucide-react';
import { League, User } from '../types.ts';
import { LEAGUE_CONFIG } from '../constants.tsx';

interface LayoutProps {
  children: React.ReactNode;
  user: User;
  currentLeague: League;
  onLeagueChange: (league: League) => void;
  onNavigate: (view: 'dashboard' | 'auction' | 'settings') => void;
  onLogout: () => void;
  currentView: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, user, currentLeague, onLeagueChange, onNavigate, onLogout, currentView }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-200">
      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-[60] lg:hidden backdrop-blur-sm" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-[70] w-72 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-black text-xl shadow-xl shadow-indigo-600/20 text-white">E</div>
              <div>
                <h1 className="text-base font-black tracking-tighter leading-none text-white uppercase">Pro Hub</h1>
                <p className="text-[8px] font-black text-slate-500 tracking-[0.3em] mt-1 uppercase">Auction Elite</p>
              </div>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-500 hover:text-white">
              <X size={20} />
            </button>
          </div>

          <nav className="space-y-1 flex-1">
            <NavItem 
              onClick={() => { onNavigate('dashboard'); setIsSidebarOpen(false); }} 
              icon={LayoutDashboard} label="Hub Feed" active={currentView === 'dashboard'} 
            />
            <NavItem icon={Zap} label="Live Rooms" />
            <NavItem icon={Trophy} label="Rankings" />
            <NavItem icon={Users} label="Scouting" />
            <NavItem 
              onClick={() => { onNavigate('settings'); setIsSidebarOpen(false); }}
              icon={Settings} label="Prefs" active={currentView === 'settings'} 
            />
          </nav>

          <div className="pt-6 border-t border-slate-800 space-y-4">
            <div className="flex items-center gap-3 px-3">
               <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-black text-white shadow-lg">{user.name[0]}</div>
               <div className="flex-1 overflow-hidden">
                 <p className="text-xs font-black text-white truncate">{user.name}</p>
                 <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">{user.role}</p>
               </div>
            </div>
            <button 
              onClick={onLogout}
              className="flex items-center gap-3 w-full p-3 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/5 transition-all font-black text-[9px] uppercase tracking-widest"
            >
              <LogOut size={14} />
              Terminate
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 sm:h-20 bg-slate-900/50 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-4 sm:px-8 shrink-0">
          <div className="flex items-center gap-3 sm:gap-6">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-slate-400 hover:text-white p-2">
              <Menu size={20} />
            </button>
            
            <div className="relative">
              <select 
                value={currentLeague}
                onChange={(e) => onLeagueChange(e.target.value as League)}
                className="appearance-none bg-slate-800 border border-slate-700 rounded-xl sm:rounded-2xl px-3 sm:px-6 py-2 sm:py-3 pr-8 sm:pr-12 font-black text-[10px] sm:text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer transition-all uppercase tracking-widest"
              >
                {Object.values(League).map(l => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500" size={14} />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-6">
            <div className="hidden sm:flex items-center bg-slate-800 border border-slate-700 rounded-2xl px-4 py-2.5 w-64 focus-within:ring-2 focus-within:ring-indigo-500/50 transition-all">
              <Search className="text-slate-500" size={16} />
              <input type="text" placeholder="Scout..." className="bg-transparent border-none focus:ring-0 text-xs font-black ml-2 w-full placeholder:text-slate-600 text-white" />
            </div>
            <button className="text-slate-400 hover:text-indigo-400 transition-colors relative p-2">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-600 border-2 border-slate-900 rounded-full"></span>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scroll bg-slate-950">
          {children}
        </main>
      </div>
    </div>
  );
};

const NavItem = ({ icon: Icon, label, active = false, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all font-black text-[10px] uppercase tracking-widest ${
      active ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
    }`}
  >
    <Icon size={16} className={active ? 'text-white' : 'text-slate-500'} />
    {label}
  </button>
);