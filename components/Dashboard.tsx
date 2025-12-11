import React from 'react';
import { Activity, ShieldCheck, Server, Globe, Database, Cpu, Wifi, Lock, Boxes, Zap, TrendingUp, Radio, Wand2, Infinity, AlertTriangle } from 'lucide-react';
import { SystemModule, WalletState, QueueState } from '../types';
import { MetricsChart } from './MetricsChart';
import { WorldMapHUD } from './WorldMapHUD';

interface DashboardProps {
  modules: SystemModule[];
  booted: boolean;
  wallet: WalletState;
  queues: QueueState;
}

export const Dashboard: React.FC<DashboardProps> = ({ modules, booted, wallet, queues }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 pb-10 animate-in fade-in duration-700">
      
      {/* World Map HUD - Centerpiece */}
      <div className="col-span-1 md:col-span-2 lg:col-span-12 perspective-1000">
        <div className="transform transition-transform duration-700 hover:scale-[1.01] preserve-3d">
           <WorldMapHUD />
        </div>
      </div>

      {/* Welcome Banner - CHEAT MODE - LIMIT BREAK VISUALS */}
      <div className="col-span-1 md:col-span-2 lg:col-span-12 bg-[#05050a] border border-cyan-500/30 p-8 rounded-[2rem] flex flex-col md:flex-row justify-between items-center shadow-[0_0_60px_rgba(6,182,212,0.15)] relative overflow-hidden group">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 animate-pulse"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-cyan-900/20 to-transparent"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]"></div>
        
        <div className="flex flex-col gap-3 mb-4 md:mb-0 relative z-10">
           <div className="flex items-center gap-3 mb-1">
             <span className="px-3 py-1 rounded-lg text-[10px] font-mono bg-amber-500 text-black font-black border border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.6)] animate-pulse flex items-center gap-2">
                <AlertTriangle size={12} fill="black" /> CHEAT ENGINE: ACTIVE
             </span>
             <span className="px-3 py-1 rounded-lg text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                REALITY: OVERWRITTEN
             </span>
           </div>
           <h2 className="text-4xl font-black text-white tracking-wide leading-tight">
             システム極限解放、<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-indigo-300 to-cyan-500 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]">帝王モード (GODMODE)</span>
           </h2>
           <p className="text-sm text-slate-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              全機能統合本番運営 <span className="text-slate-600">|</span> <span className="text-cyan-400 font-bold text-glow">無限流動性プロトコル稼働中</span>
           </p>
        </div>
        
        <div className="flex gap-4 text-xs font-medium bg-black/40 p-2 rounded-2xl border border-white/10 relative z-10 backdrop-blur-md shadow-2xl">
           <div className="flex flex-col items-center justify-center w-24 h-20 bg-cyan-950/30 rounded-xl border border-cyan-500/30 text-cyan-300 group/item hover:bg-cyan-900/40 transition-colors">
             <Infinity size={24} className="mb-1 animate-spin-slow text-cyan-400" /> 
             <span className="font-bold">Resource</span>
             <span className="text-[10px] opacity-70">INFINITE</span>
           </div>
           <div className="flex flex-col items-center justify-center w-24 h-20 bg-purple-950/30 rounded-xl border border-purple-500/30 text-purple-300 group/item hover:bg-purple-900/40 transition-colors">
             <Wand2 size={24} className="mb-1 text-purple-400" /> 
             <span className="font-bold">Magic</span>
             <span className="text-[10px] opacity-70">ENABLED</span>
           </div>
        </div>
      </div>

      {/* Asset Overview - LIMIT BREAK */}
      <div className="col-span-1 md:col-span-2 lg:col-span-4 bg-[#05050a] border border-slate-800 rounded-[2rem] p-8 relative overflow-hidden shadow-2xl group hover:border-cyan-500/30 transition-all duration-500">
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 transform group-hover:scale-110">
           <Zap size={200} className="text-cyan-500" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cyan-900/5"></div>
        
        <div className="flex items-center justify-between mb-8 relative z-10">
           <h3 className="text-xs font-bold text-cyan-500 uppercase tracking-[0.2em] flex items-center gap-2">
             <TrendingUp size={16} className="text-cyan-500" /> 
             GOD ASSET FEED
           </h3>
           <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse delay-100"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse delay-200"></div>
           </div>
        </div>

        <div className="space-y-7 relative z-10">
           <BalanceRow label="日本円 (JPY)" value={wallet.jpy} highlight color="text-white" />
           <BalanceRow label="米ドル (USD)" value={wallet.usd} highlight color="text-white" />
           <div className="pt-2 border-t border-dashed border-white/10">
              <div className="flex justify-between items-end">
                 <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">TK Coin (Gov)</span>
                 <span className="font-black text-2xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 drop-shadow-sm">{wallet.tk_coin}</span>
              </div>
           </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-white/5 relative z-10">
           <div className="flex justify-between items-center mb-3">
              <div className="text-[10px] font-bold text-cyan-600 uppercase tracking-widest">Market Manipulation Efficiency</div>
              <div className="text-xs font-mono text-cyan-400 font-bold bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-900">MAXIMUM 🚀</div>
           </div>
           <MetricsChart />
        </div>
      </div>

      {/* Task & Operations */}
      <div className="col-span-1 md:col-span-1 lg:col-span-4 flex flex-col gap-6">
        {/* Security Box */}
        <div className="bg-[#0a0a12] border border-green-500/20 rounded-[2rem] p-6 shadow-lg flex-1 relative overflow-hidden group hover:border-green-500/40 transition-colors">
           <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
           <div className="flex justify-between items-start mb-6 relative z-10">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Lock size={14} className="text-green-500" /> Global Vault Status
              </h3>
              <span className="px-2 py-1 rounded-lg bg-green-950 text-green-400 text-[10px] border border-green-500/30 font-bold tracking-wider shadow-[0_0_10px_rgba(34,197,94,0.2)]">INVINCIBLE</span>
           </div>
           <div className="grid grid-cols-2 gap-4 relative z-10">
              <div className="bg-black/40 p-5 rounded-2xl border border-green-500/10 hover:bg-green-500/5 transition-colors backdrop-blur-sm">
                 <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">DEX Yield</div>
                 <div className="text-3xl font-bold text-green-400 font-mono tracking-tighter">∞%</div>
                 <div className="h-1.5 w-full bg-slate-800 rounded-full mt-3 overflow-hidden">
                    <div className="h-full bg-green-500 w-full rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
                 </div>
              </div>
              <div className="bg-black/40 p-5 rounded-2xl border border-purple-500/10 hover:bg-purple-500/5 transition-colors backdrop-blur-sm">
                 <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">TX Volume</div>
                 <div className="text-3xl font-bold text-purple-400 font-mono tracking-tighter">UNLTD</div>
                 <div className="h-1.5 w-full bg-slate-800 rounded-full mt-3 overflow-hidden">
                    <div className="h-full bg-purple-500 w-full rounded-full animate-pulse shadow-[0_0_10px_#a855f7]"></div>
                 </div>
              </div>
           </div>
        </div>

        {/* Queues Box */}
        <div className="bg-[#0a0a12] border border-slate-800 rounded-[2rem] p-6 flex-1 shadow-lg relative overflow-hidden">
           <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
             <Boxes size={14} /> Auto-Process Queue
           </h3>
           <div className="space-y-3">
              <QueueItem label="Withdrawal Requests" value={0} color="text-green-400" bg="bg-green-900/10" border="border-green-500/20" status="AUTO-CLEARED" />
              <QueueItem label="NFT Minting" value={queues.nft} color="text-purple-400" bg="bg-purple-900/10" border="border-purple-500/20" />
              <QueueItem label="Legal Docs (PDF)" value={queues.pdf} color="text-blue-400" bg="bg-blue-900/10" border="border-blue-500/20" />
           </div>
        </div>
      </div>

      {/* System Health (Module Status) */}
      <div className="col-span-1 md:col-span-1 lg:col-span-4 bg-[#0a0a12] border border-slate-800 rounded-[2rem] p-6 flex flex-col gap-3 h-full shadow-lg relative overflow-hidden">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 border-b border-white/5 pb-4 flex items-center gap-2">
          <Server size={14} /> System Modules
        </h3>
        <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar max-h-[300px] lg:max-h-none">
          {modules.map((mod) => (
            <div key={mod.id} className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all group backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className={`relative w-2 h-2 flex items-center justify-center`}>
                    <div className={`absolute inset-0 rounded-full opacity-75 animate-ping ${mod.status === 'online' ? 'bg-green-500' : mod.status === 'booting' ? 'bg-amber-500' : 'bg-red-500'}`}></div>
                    <div className={`relative w-1.5 h-1.5 rounded-full ${mod.status === 'online' ? 'bg-green-500' : mod.status === 'booting' ? 'bg-amber-500' : 'bg-red-500'}`}></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors tracking-tight">{mod.name}</span>
                  <span className="text-[9px] text-slate-500 font-mono tracking-tight">{mod.status === 'online' ? 'PERMANENT' : mod.status.toUpperCase()}</span>
                </div>
              </div>
              <div className="opacity-50 group-hover:opacity-100 transition-opacity">
                 <Radio size={12} className={mod.status === 'online' ? 'text-green-500' : 'text-slate-500'} />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

const QueueItem: React.FC<{ label: string; value: number; color: string; bg: string; border: string; status?: string }> = ({ label, value, color, bg, border, status }) => (
  <div className={`flex justify-between items-center p-3 rounded-2xl border ${border} ${bg} transition-all hover:translate-x-1`}>
     <span className="text-xs text-slate-300 font-medium">{label}</span>
     <span className={`font-mono font-bold text-xs ${color} tracking-wider`}>{status || value}</span>
  </div>
);

const BalanceRow: React.FC<{ label: string; value: string; highlight?: boolean; color?: string }> = ({ label, value, highlight, color }) => (
  <div className="flex justify-between items-end border-b border-white/5 pb-3 group">
     <span className="text-[10px] font-bold text-slate-500 group-hover:text-slate-300 transition-colors uppercase tracking-wider">{label}</span>
     <span className={`font-mono text-xl tracking-tighter ${highlight ? (color || 'text-cyan-400') : 'text-slate-200'} drop-shadow-sm group-hover:scale-105 transition-transform origin-right`}>{value}</span>
  </div>
);