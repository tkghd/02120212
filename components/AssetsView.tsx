import React, { useState, useEffect } from 'react';
import { Wallet, TrendingUp, DollarSign, Bitcoin, Globe, Gem, Crown, ArrowUpRight, Building, Layers, Link, Loader2, ShieldCheck, CheckCircle2, XCircle, LogOut, Smartphone, HardDrive, Send, ArrowRight, Search, Flame, Zap, Boxes } from 'lucide-react';
import { WalletState, OwnerAccount } from '../types';

interface AssetsViewProps {
  wallet: WalletState;
  ownerAccounts: OwnerAccount[];
}

export const AssetsView: React.FC<AssetsViewProps> = ({ wallet, ownerAccounts }) => {
  const [selectedWallet, setSelectedWallet] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllTokens, setShowAllTokens] = useState(false);

  // 20 Proprietary Tokens List
  const proprietaryTokens = [
    { s: 'TKG', n: 'TK Global Coin', bal: '∞' },
    { s: 'LUSTRA', n: 'Lustra Gem', bal: '999,999' },
    { s: 'RUBISS', n: 'Rubiss Core', bal: '500,000' },
    { s: 'DIAMUSE', n: 'Diamuse Gov', bal: '12,000' },
    { s: 'VOID', n: 'Void Walker', bal: '666' },
    { s: 'AURA', n: 'Aura Sync', bal: '1,000,000' },
    { s: 'NEXUS', n: 'Nexus Bridge', bal: '45,000' },
    { s: 'ZEN', n: 'Zenith', bal: '88,888' },
    { s: 'OMNI', n: 'Omni Layer', bal: '250,000' },
    { s: 'FLUX', n: 'Flux Energy', bal: '10,000' },
    { s: 'TITAN', n: 'Titan Reserve', bal: '5,000' },
    { s: 'NOVA', n: 'Nova Blast', bal: '100,000' },
    { s: 'APEX', n: 'Apex Predator', bal: '1' },
    { s: 'ECHO', n: 'Echo Protocol', bal: '333,333' },
    { s: 'SOLAR', n: 'Solar Flare', bal: '9,000' },
    { s: 'LUNA', n: 'Luna Tides', bal: '15,000' },
    { s: 'TERRA', n: 'Terra Firma', bal: '20,000' },
    { s: 'ZERO', n: 'Zero Point', bal: '0.001' },
    { s: 'INF', n: 'Infinity Loop', bal: '∞' },
    { s: 'GOD', n: 'God Mode', bal: '1' },
  ];

  const filteredAccounts = ownerAccounts.filter(acc => 
    acc.bankName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    acc.branchName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    acc.accountName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col gap-1 anim-enter-bottom">
        <h2 className="text-3xl font-black text-white flex items-center gap-3 tracking-tight">
          <Layers className="text-cyan-500" size={32} />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-500">
            Godmode Vault
          </span>
        </h2>
        <p className="text-sm text-slate-400 font-mono pl-1">REAL-TIME ASSET MATRIX • GLOBAL SYNC ACTIVE</p>
      </div>

      {/* Owner Free Use Assets (Top Hero) */}
      <div className="p-1 rounded-[2.5rem] bg-gradient-to-br from-cyan-500 via-indigo-600 to-purple-700 shadow-[0_0_80px_rgba(6,182,212,0.3)] anim-pulse-glow relative group anim-enter-bottom anim-delay-100">
         <div className="absolute inset-0 bg-cyan-500 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000"></div>
         <div className="bg-[#05050a] rounded-[2.3rem] p-8 md:p-10 relative overflow-hidden h-full border border-white/5">
             <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none transform rotate-12 group-hover:scale-110 transition-transform duration-1000">
                <Crown size={280} className="text-cyan-500" />
             </div>
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
             
             <div className="relative z-10">
                 <div className="flex justify-between items-start">
                    <h3 className="text-cyan-400 font-bold uppercase tracking-[0.2em] text-xs mb-4 flex items-center gap-2 border border-cyan-500/30 bg-cyan-950/30 px-3 py-1 rounded-full backdrop-blur-md">
                        <Crown size={14} /> Personal Vault (Unlimited)
                    </h3>
                    <div className="flex gap-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></span>
                        <span className="text-[10px] text-green-400 font-bold tracking-widest">LIVE</span>
                    </div>
                 </div>
                 
                 <div className="text-5xl sm:text-6xl lg:text-7xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 tracking-tighter drop-shadow-2xl my-8 leading-none">
                    ¥ 2,000,000,000,000
                 </div>
                 
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 border-t border-white/10 pt-8">
                     <div className="bg-white/5 p-5 rounded-3xl border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors group/stat">
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-2 group-hover/stat:text-cyan-400 transition-colors">Total Market Cap</div>
                        <div className="text-xl sm:text-2xl font-mono text-white font-bold tracking-tight">162京 5,000兆円</div>
                     </div>
                     <div className="bg-white/5 p-5 rounded-3xl border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors group/stat">
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-2 group-hover/stat:text-purple-400 transition-colors">Token Valuation</div>
                        <div className="text-xl sm:text-2xl font-mono text-white font-bold tracking-tight">35,888京 2,500兆円</div>
                     </div>
                 </div>
             </div>
         </div>
      </div>

      {/* Proprietary Token Vault (20 Tokens) */}
      <div className="anim-enter-bottom anim-delay-200">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
           <div className="w-8 h-8 rounded-lg bg-purple-900/30 flex items-center justify-center border border-purple-500/30 text-purple-400">
             <Boxes size={18} />
           </div>
           Proprietary Token Vault
           <span className="text-xs text-slate-500 font-normal ml-2 font-mono border-l border-slate-700 pl-3">20 ASSETS SYNCED</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
           {proprietaryTokens.slice(0, showAllTokens ? undefined : 10).map((t, i) => (
             <div key={i} className="bg-slate-900/40 border border-slate-800 p-4 rounded-2xl hover:bg-slate-800/60 hover:border-purple-500/30 transition-all group relative overflow-hidden backdrop-blur-sm">
                <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/10 rounded-full blur-xl -mr-8 -mt-8 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex justify-between items-start mb-3 relative z-10">
                   <div className="text-[10px] font-black text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 group-hover:border-purple-500/30 group-hover:text-purple-400 transition-colors">{t.s}</div>
                   <Gem size={14} className="text-cyan-500 opacity-50 group-hover:opacity-100 transition-opacity group-hover:scale-110" />
                </div>
                <div className="font-bold text-white text-sm truncate relative z-10">{t.n}</div>
                <div className="font-mono text-xs text-purple-300 mt-1 font-bold tracking-wider relative z-10">{t.bal}</div>
             </div>
           ))}
        </div>
        <button 
          onClick={() => setShowAllTokens(!showAllTokens)} 
          className="w-full mt-4 py-3 text-xs font-bold text-slate-400 hover:text-white border border-slate-800 rounded-xl hover:bg-slate-800 transition-all hover:border-slate-600 flex items-center justify-center gap-2 group"
        >
           {showAllTokens ? "Show Less" : "View All 20 Assets"} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* International Corporate Sync */}
      <div className="bg-[#0a0a12] border border-indigo-900/30 rounded-[2rem] p-8 relative overflow-hidden anim-enter-bottom anim-delay-300 shadow-2xl">
         <div className="absolute inset-0 bg-[linear-gradient(rgba(79,70,229,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(79,70,229,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
         <div className="flex justify-between items-center mb-8 relative z-10">
             <h3 className="text-lg font-bold text-white flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                    <Globe size={20} />
                </div>
                International Corporate Sync
             </h3>
             <span className="bg-indigo-950/50 text-indigo-300 text-[10px] font-bold px-3 py-1.5 rounded-lg border border-indigo-500/30 animate-pulse flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                SYNCING LIVE
             </span>
         </div>
         <div className="space-y-3 relative z-10 max-h-60 overflow-y-auto custom-scrollbar pr-2">
             <CorporateSyncRow name="TK Holdings HK Ltd" region="Hong Kong" balance="HK$ 450M" status="active" />
             <CorporateSyncRow name="TK Global SG Pte Ltd" region="Singapore" balance="S$ 120M" status="active" />
             <CorporateSyncRow name="TK Ventures LLC" region="Dubai" balance="AED 85M" status="active" />
             <CorporateSyncRow name="TK Europe BV" region="Netherlands" balance="€ 55M" status="sync" />
             <CorporateSyncRow name="TK Caribbean Trust" region="Cayman" balance="$ 999M" status="active" />
         </div>
      </div>

      {/* 350 Owner Accounts Summary */}
      <div className="bg-[#05050a] border border-slate-800 rounded-[2rem] p-8 shadow-xl relative overflow-hidden flex flex-col gap-6 anim-enter-bottom anim-delay-400 group hover:border-slate-700 transition-colors">
         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
             <h3 className="text-lg font-bold text-white flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-900/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20">
                    <Building size={20} />
                </div>
                分散資産管理 <span className="text-slate-500 text-sm font-normal ml-2">Total {ownerAccounts.length} Accounts</span>
             </h3>
             <div className="relative w-full sm:w-72">
                <input 
                   type="text" 
                   placeholder="口座を検索..." 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-cyan-500 transition-all shadow-inner focus:bg-slate-900"
                />
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
             </div>
         </div>
         <div className="h-80 overflow-y-auto custom-scrollbar space-y-3 pr-2 relative z-10">
            {filteredAccounts.map((acc, idx) => (
               <div key={acc.id} className="flex justify-between items-center p-4 bg-slate-900/30 rounded-2xl border border-slate-800 hover:border-cyan-500/30 hover:bg-slate-900/80 transition-all group/item cursor-pointer">
                  <div className="flex items-center gap-4">
                     <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xs font-bold shadow-lg transition-transform group-hover/item:scale-105 ${acc.isOverseas ? 'bg-indigo-900/30 text-indigo-200 border border-indigo-500/30' : 'bg-slate-800 text-slate-300 border border-slate-700'}`}>
                        {acc.bankName.substring(0, 2)}
                     </div>
                     <div>
                        <div className="text-sm font-bold text-slate-200 group-hover/item:text-white transition-colors">{acc.bankName}</div>
                        <div className="text-[10px] text-slate-500 font-mono mt-0.5">{acc.branchName} • {acc.accountNumber}</div>
                     </div>
                  </div>
                  <div className="text-right">
                     <div className="text-base font-mono text-white font-bold tracking-tight group-hover/item:text-cyan-400 transition-colors">{acc.currency === 'JPY' ? '¥' : '$'} {acc.balance}</div>
                     <div className="text-[10px] text-slate-600 uppercase font-bold tracking-wider">{acc.accountType}</div>
                  </div>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
};

const CorporateSyncRow: React.FC<{ name: string; region: string; balance: string; status: 'active' | 'sync' }> = ({ name, region, balance, status }) => (
    <div className="flex justify-between items-center p-4 bg-slate-900/40 border border-slate-800/50 rounded-2xl hover:bg-slate-800/60 transition-colors group">
        <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-full bg-indigo-900/20 flex items-center justify-center text-indigo-400 border border-indigo-500/20 group-hover:scale-110 transition-transform">
                 <Globe size={16} />
             </div>
             <div>
                 <div className="text-sm font-bold text-white">{name}</div>
                 <div className="text-[10px] text-slate-500 uppercase tracking-wide">{region}</div>
             </div>
        </div>
        <div className="text-right">
             <div className="font-mono text-white text-sm font-bold tracking-tight">{balance}</div>
             <div className={`text-[9px] uppercase font-black tracking-wider flex justify-end gap-1 items-center ${status === 'active' ? 'text-green-500' : 'text-amber-500'}`}>
                {status} {status === 'active' && <CheckCircle2 size={10} />}
             </div>
        </div>
    </div>
);