
import React, { useState } from 'react';
import { X, UserPlus, Link as LinkIcon, BarChart3, Target, Zap, Activity } from 'lucide-react';
import { Player, PlayerRole } from '../types.ts';

interface AddPlayerFormProps {
  onAdd: (player: Player) => void;
  onClose: () => void;
}

export const AddPlayerForm: React.FC<AddPlayerFormProps> = ({ onAdd, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: PlayerRole.BATSMAN,
    nationality: 'India',
    basePrice: 0.5,
    image: '',
    matches: 0,
    runs: 0,
    wickets: 0,
    strikeRate: 0,
    economy: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPlayer: Player = {
      id: `manual-${Date.now()}`,
      name: formData.name,
      role: formData.role,
      nationality: formData.nationality,
      basePrice: formData.basePrice,
      stats: {
        matches: formData.matches,
        runs: formData.runs,
        wickets: formData.wickets,
        strikeRate: formData.strikeRate,
        economy: formData.economy,
      },
      image: formData.image || `https://picsum.photos/seed/${formData.name || 'player'}/400/400`,
    };
    onAdd(newPlayer);
    onClose();
  };

  const handleNumberChange = (field: string, value: string) => {
    const val = value === '' ? 0 : parseFloat(value);
    setFormData(prev => ({ ...prev, [field]: isNaN(val) ? 0 : val }));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl overflow-y-auto">
      <div className="bg-slate-900 w-full max-w-2xl rounded-[2.5rem] border border-slate-800 shadow-2xl overflow-hidden animate-slideIn my-8">
        <div className="p-8 border-b border-slate-800 flex justify-between items-center sticky top-0 bg-slate-900 z-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400">
              <UserPlus size={24} />
            </div>
            <div>
              <h3 className="font-black text-lg uppercase tracking-widest text-white">Draft New Talent</h3>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Add a custom player to the auction pool</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 bg-slate-800 rounded-full text-slate-500 hover:text-white transition-all">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Identity & Role Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Full Name</label>
              <input 
                required
                type="text" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. Suryakumar Yadav"
                className="w-full bg-slate-800/50 border-slate-700 border-2 rounded-2xl px-5 py-4 text-sm text-white font-bold outline-none focus:border-indigo-600 transition-all placeholder:text-slate-600" 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Specialization</label>
              <select 
                value={formData.role}
                onChange={e => setFormData({...formData, role: e.target.value as PlayerRole})}
                className="w-full bg-slate-800/50 border-slate-700 border-2 rounded-2xl px-5 py-4 text-xs text-white font-bold outline-none cursor-pointer focus:border-indigo-600 transition-all appearance-none"
              >
                {Object.values(PlayerRole).map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Base Price (Cr / M)</label>
              <div className="relative">
                <input 
                  type="number" 
                  step="0.1"
                  min="0.1"
                  value={formData.basePrice}
                  onChange={e => handleNumberChange('basePrice', e.target.value)}
                  className="w-full bg-slate-800/50 border-slate-700 border-2 rounded-2xl px-5 py-4 text-sm text-white font-black outline-none focus:border-indigo-600 transition-all" 
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-indigo-400 uppercase">Premium</div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Nationality</label>
              <input 
                type="text" 
                value={formData.nationality}
                onChange={e => setFormData({...formData, nationality: e.target.value})}
                placeholder="e.g. India"
                className="w-full bg-slate-800/50 border-slate-700 border-2 rounded-2xl px-5 py-4 text-sm text-white font-bold outline-none focus:border-indigo-600 transition-all" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
              <LinkIcon size={12} /> External Image URL (optional)
            </label>
            <input 
              type="url" 
              value={formData.image}
              onChange={e => setFormData({...formData, image: e.target.value})}
              placeholder="https://example.com/player_photo.png"
              className="w-full bg-slate-800/50 border-slate-700 border-2 rounded-2xl px-5 py-4 text-xs text-white font-bold outline-none focus:border-indigo-600 transition-all" 
            />
          </div>

          {/* Statistics Grid */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-800"></div>
              <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] flex items-center gap-2">
                Performance Stats <BarChart3 size={14} />
              </h4>
              <div className="h-px flex-1 bg-slate-800"></div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              <StatInput 
                icon={Activity} 
                label="Matches" 
                value={formData.matches} 
                onChange={(v) => handleNumberChange('matches', v)} 
              />
              <StatInput 
                icon={Target} 
                label="Runs" 
                value={formData.runs} 
                onChange={(v) => handleNumberChange('runs', v)} 
                highlight={formData.role === PlayerRole.BATSMAN}
              />
              <StatInput 
                icon={Zap} 
                label="Wickets" 
                value={formData.wickets} 
                onChange={(v) => handleNumberChange('wickets', v)} 
                highlight={formData.role === PlayerRole.BOWLER}
              />
              <StatInput 
                icon={BarChart3} 
                label="Strike Rate" 
                value={formData.strikeRate} 
                onChange={(v) => handleNumberChange('strikeRate', v)} 
                isFloat
              />
              <StatInput 
                icon={BarChart3} 
                label="Economy" 
                value={formData.economy} 
                onChange={(v) => handleNumberChange('economy', v)} 
                isFloat
              />
            </div>
          </div>

          {/* Preview & Action */}
          <div className="flex flex-col sm:flex-row items-center gap-6 bg-slate-800/30 p-6 rounded-[2rem] border border-slate-800">
            <div className="w-24 h-24 rounded-3xl overflow-hidden border-4 border-slate-700 bg-slate-900 shadow-2xl shrink-0">
              <img 
                src={formData.image || `https://picsum.photos/seed/${formData.name || 'player'}/400/400`} 
                alt="Preview" 
                className="w-full h-full object-cover"
                onError={(e) => (e.currentTarget.src = 'https://picsum.photos/400/400')}
              />
            </div>
            <div className="flex-1 text-center sm:text-left space-y-1">
              <p className="text-[8px] font-black text-indigo-400 uppercase tracking-[0.2em]">Ready for bidding</p>
              <h4 className="text-xl font-black text-white leading-none uppercase">{formData.name || 'New Player'}</h4>
              <p className="text-[10px] text-slate-500 font-bold uppercase">{formData.role} • {formData.nationality}</p>
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-500 shadow-xl shadow-indigo-600/20 transition-all transform active:scale-[0.95]"
            >
              Add Player
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const StatInput = ({ icon: Icon, label, value, onChange, isFloat = false, highlight = false }: any) => (
  <div className={`space-y-1.5 p-3 rounded-2xl border transition-all ${highlight ? 'bg-indigo-500/5 border-indigo-500/30' : 'bg-slate-800/30 border-slate-700/50'}`}>
    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
      <Icon size={10} className={highlight ? 'text-indigo-400' : 'text-slate-600'} />
      {label}
    </label>
    <input 
      type="number" 
      step={isFloat ? "0.01" : "1"}
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full bg-transparent border-none p-0 text-sm text-white font-black outline-none focus:ring-0" 
    />
  </div>
);