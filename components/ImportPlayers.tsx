
import React, { useState, useRef } from 'react';
import { X, FileUp, Info, CheckCircle2, AlertCircle, Download } from 'lucide-react';
import * as XLSX from 'xlsx';
import { Player, PlayerRole } from '../types';

interface ImportPlayersProps {
  onImport: (players: Player[]) => void;
  onClose: () => void;
}

export const ImportPlayers: React.FC<ImportPlayersProps> = ({ onImport, onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'parsing' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setStatus('idle');
      setError('');
    }
  };

  const downloadTemplate = () => {
    const templateData = [
      {
        Name: "Virat Kohli",
        Role: "Batsman",
        Nationality: "India",
        BasePrice: 2.0,
        Matches: 250,
        Runs: 8000,
        Wickets: 4,
        StrikeRate: 132.5,
        Economy: 8.5,
        Image: "https://example.com/kohli.jpg"
      }
    ];
    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template");
    XLSX.writeFile(wb, "Auction_Pool_Template.xlsx");
  };

  const processFile = async () => {
    if (!file) return;

    setStatus('parsing');
    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet) as any[];

      const players: Player[] = jsonData.map((row, index) => ({
        id: `custom-${Date.now()}-${index}`,
        name: row.Name || row.name || 'Unknown Player',
        role: (row.Role || row.role || PlayerRole.BATSMAN) as PlayerRole,
        nationality: row.Nationality || row.nationality || 'Overseas',
        basePrice: parseFloat(row.BasePrice || row.price || row.Base_Price || 0.5),
        stats: {
          matches: parseInt(row.Matches || row.matches || 0),
          runs: parseInt(row.Runs || row.runs || 0),
          wickets: parseInt(row.Wickets || row.wickets || 0),
          strikeRate: parseFloat(row.SR || row.StrikeRate || row.strikeRate || 0),
          economy: parseFloat(row.Economy || row.economy || 0),
        },
        image: row.Image || row.image || `https://picsum.photos/seed/${index}/400/400`,
      }));

      if (players.length === 0) throw new Error('No valid player data found in file.');

      onImport(players);
      setStatus('success');
      setTimeout(onClose, 1500);
    } catch (err) {
      console.error(err);
      setStatus('error');
      setError('Failed to parse file. Ensure headers: Name, Role, Nationality, BasePrice, Matches, Runs, Wickets.');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 w-full max-w-md rounded-[2rem] border border-slate-800 shadow-2xl overflow-hidden animate-slideIn">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900 z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400">
              <FileUp size={20} />
            </div>
            <h3 className="font-black text-sm uppercase tracking-widest text-white">Import Custom Pool</h3>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-4 flex flex-col gap-3">
            <div className="flex gap-3">
              <Info className="text-indigo-400 shrink-0" size={18} />
              <div className="text-[10px] text-slate-400 font-medium leading-relaxed">
                <p className="font-black text-indigo-300 uppercase mb-1">Elite Bulk Upload</p>
                Upload an Excel or CSV file. All headers in the template are supported.
              </div>
            </div>
            <button 
              onClick={downloadTemplate}
              className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 py-2 rounded-xl text-[9px] font-black text-indigo-400 uppercase tracking-widest transition-all"
            >
              <Download size={12} /> Download Template (.xlsx)
            </button>
          </div>

          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`
              border-2 border-dashed rounded-[2rem] p-10 flex flex-col items-center justify-center gap-4 transition-all cursor-pointer
              ${file ? 'border-indigo-500 bg-indigo-500/5' : 'border-slate-700 hover:border-slate-600 bg-slate-800/20'}
            `}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept=".xlsx, .xls, .csv" 
              onChange={handleFileChange}
            />
            {status === 'success' ? (
              <CheckCircle2 size={48} className="text-green-500 animate-bounce" />
            ) : status === 'error' ? (
              <AlertCircle size={48} className="text-red-500" />
            ) : (
              <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center text-slate-500">
                <FileUp size={32} />
              </div>
            )}
            <div className="text-center">
              <p className="text-sm font-black text-white">
                {file ? file.name : 'Click to select file'}
              </p>
              <p className="text-[10px] text-slate-500 font-bold uppercase mt-1 tracking-widest">
                {file ? `${(file.size / 1024).toFixed(1)} KB` : 'XLSX, CSV supported'}
              </p>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-[10px] font-black text-red-400 uppercase tracking-widest">
              <AlertCircle size={14} /> {error}
            </div>
          )}

          <button
            disabled={!file || status === 'parsing' || status === 'success'}
            onClick={processFile}
            className={`
              w-full py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl
              ${!file || status === 'parsing' ? 'bg-slate-800 text-slate-600' : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-600/20'}
            `}
          >
            {status === 'parsing' ? 'Processing...' : status === 'success' ? 'Pool Updated!' : 'Confirm Import'}
          </button>
        </div>
      </div>
    </div>
  );
};
