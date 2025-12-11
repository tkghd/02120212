import React from 'react';
import { Target, DollarSign, MapPin, ArrowRight, DownloadCloud, Zap } from 'lucide-react';

interface AcquisitionCandidate {
  bank: string;
  country: string;
  est_price_usd: number;
}

interface GlobalBankHUDProps {
  list: AcquisitionCandidate[];
}

export const GlobalBankHUD: React.FC<GlobalBankHUDProps> = ({ list }) => {
  return (
    <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 relative overflow-hidden backdrop-blur-sm shadow-2xl">
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] pointer-events-none"></div>
      
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3 relative z-10">
        <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center text-red-400 border border-red-500/30">
          <Target size={20} />
        </div>
        Global Acquisition Targets
      </h3>
      
      <div className="space-y-4 relative z-10">
        {list.map((item, index) => (
          <div 
            key={index} 
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-black/30 border border-slate-800 rounded-2xl hover:border-red-500/30 hover:bg-slate-900/60 transition-all group"
          >
            <div className="flex items-center gap-4 mb-3 sm:mb-0">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-700 group-hover:border-red-500/50 group-hover:text-red-400 transition-colors">
                <MapPin size={18} />
              </div>
              <div>
                <div className="font-bold text-white text-base">{item.bank}</div>
                <div className="text-xs text-slate-500 font-mono mt-1">{item.country}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="text-right flex-1">
                <div className="text-xs text-slate-500">Valuation</div>
                <div className="font-mono font-bold text-red-400 text-lg">${item.est_price_usd.toLocaleString()}</div>
              </div>
              <button className="px-4 py-3 bg-red-900/30 border border-red-500/30 text-red-400 rounded-xl text-xs font-bold hover:bg-red-900/50 hover:text-white transition-all flex items-center gap-2">
                <Zap size={14} /> Acquire
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
        <button className="text-xs font-bold text-slate-400 hover:text-white transition-colors flex items-center gap-2">
          <DownloadCloud size={14} /> Download Full Prospectus
        </button>
      </div>
    </div>
  );
};
