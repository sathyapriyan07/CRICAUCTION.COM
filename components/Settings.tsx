
import React from 'react';
import { ArrowLeft, Settings as SettingsIcon, Image, ImageOff, Bell, Shield, Sliders } from 'lucide-react';
import { UserSettings } from '../App.tsx';

interface SettingsProps {
  settings: UserSettings;
  onUpdateSettings: (settings: UserSettings) => void;
  onBack: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ settings, onUpdateSettings, onBack }) => {
  const toggleImages = () => {
    onUpdateSettings({ ...settings, showPlayerImages: !settings.showPlayerImages });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn pb-24">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-slate-400 hover:text-white transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight uppercase">Preferences</h2>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mt-1">Configure your auction environment</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* Performance & Visuals */}
        <div className="bg-slate-800/50 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 text-indigo-400">
            <Sliders size={20} />
            <h3 className="font-black text-xs uppercase tracking-[0.2em]">Visual Experience</h3>
          </div>

          <div className="space-y-4">
            <div 
              onClick={toggleImages}
              className="flex items-center justify-between p-4 bg-slate-900/50 rounded-2xl border border-slate-700/50 hover:border-indigo-500/50 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl transition-all ${settings.showPlayerImages ? 'bg-indigo-500/10 text-indigo-400' : 'bg-slate-800 text-slate-500'}`}>
                  {settings.showPlayerImages ? <Image size={20} /> : <ImageOff size={20} />}
                </div>
                <div>
                  <h4 className="font-black text-sm text-white uppercase tracking-tight">Display Player Images</h4>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">
                    {settings.showPlayerImages ? 'Images enabled for all pools' : 'Hiding images for performance'}
                  </p>
                </div>
              </div>
              <div className={`w-12 h-6 rounded-full relative transition-all ${settings.showPlayerImages ? 'bg-indigo-600' : 'bg-slate-700'}`}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.showPlayerImages ? 'right-1' : 'left-1'}`} />
              </div>
            </div>

            <SettingPlaceholder icon={Bell} label="Audio Commentary" desc="Live Gemini-powered narration" />
            <SettingPlaceholder icon={Shield} label="Privacy Mode" desc="Hide purse values from others" />
          </div>
        </div>

        <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-3xl p-8 text-center space-y-4">
           <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">System Version</p>
           <h4 className="text-xl font-black text-white">Elite v2.6.4 (PRO)</h4>
           <p className="text-xs text-slate-500 font-medium max-w-sm mx-auto">Preferences are saved locally to your browser session. Changes to visuals take effect immediately in live rooms.</p>
        </div>
      </div>
    </div>
  );
};

const SettingPlaceholder = ({ icon: Icon, label, desc }: any) => (
  <div className="flex items-center justify-between p-4 bg-slate-900/20 rounded-2xl border border-slate-700/30 opacity-50 cursor-not-allowed">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-slate-800 rounded-xl text-slate-600">
        <Icon size={20} />
      </div>
      <div>
        <h4 className="font-black text-sm text-slate-400 uppercase tracking-tight">{label}</h4>
        <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mt-1">{desc}</p>
      </div>
    </div>
    <div className="px-2 py-1 bg-slate-800 rounded text-[8px] font-black text-slate-500 uppercase">Coming Soon</div>
  </div>
);