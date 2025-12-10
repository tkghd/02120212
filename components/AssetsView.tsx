import React, { useState, useEffect } from 'react';
import { Wallet, TrendingUp, DollarSign, Bitcoin, Globe, Gem, Crown, ArrowUpRight, Building, Layers, Link, Loader2, ShieldCheck, CheckCircle2, XCircle, LogOut, Smartphone, HardDrive, Send, ArrowRight, Search, Flame, Zap } from 'lucide-react';
import { WalletState, OwnerAccount } from '../types';

interface AssetsViewProps {
  wallet: WalletState;
  ownerAccounts: OwnerAccount[];
}

type ConnectStatus = 'idle' | 'selecting' | 'connecting' | 'verifying' | 'connected';

export const AssetsView: React.FC<AssetsViewProps> = ({ wallet, ownerAccounts }) => {
  const [connectStatus, setConnectStatus] = useState<ConnectStatus>('idle');
  const [selectedWallet, setSelectedWallet] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [cryptoPrices, setCryptoPrices] = useState({
    BTC: 64230.50,
    ETH: 3450.20,
    USDT: 1.00,
    TKG: 150000000
  });
  const [sendModalOpen, setSendModalOpen] = useState(false);

  // Simulate Real-time Price Ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoPrices(prev => ({
        BTC: prev.BTC + (Math.random() * 100 - 50),
        ETH: prev.ETH + (Math.random() * 20 - 10),
        USDT: 1.00 + (Math.random() * 0.001 - 0.0005),
        TKG: prev.TKG + (Math.random() * 5000 - 2500)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const filteredAccounts = ownerAccounts.filter(acc => 
    acc.bankName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    acc.branchName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    acc.accountName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleWalletSelect = (walletName: string) => {
    setSelectedWallet(walletName);
    setConnectStatus('connecting');
    
    // Simulate connection process
    setTimeout(() => {
      setConnectStatus('verifying');
      // Simulate KYC/AML Check
      setTimeout(() => {
        setConnectStatus('connected');
      }, 2000);
    }, 1500);
  };

  const handleDisconnect = () => {
    setConnectStatus('idle');
    setSelectedWallet('');
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-1 anim-enter-bottom">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <Layers className="text-cyan-500" />
          資産ポートフォリオ
        </h2>
        <p className="text-sm text-slate-400">リアルタイム資産状況サマリー (Global Sync)</p>
      </div>

      {/* Owner Free Use Assets (Top Hero) - Limit Break Design */}
      <div className="p-1 rounded-[2.5rem] bg-gradient-to-r from-cyan-600 via-indigo-400 to-cyan-600 shadow-[0_0_50px_rgba(6,182,212,0.4)] anim-pulse-glow relative group anim-enter-bottom anim-delay-100">
         <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000"></div>
         <div className="bg-[#08080f] rounded-[2.2rem] p-8 relative overflow-hidden h-full">
             {/* Background Decor */}
             <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
                <Crown size={200} className="text-cyan-500" />
             </div>
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
             <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-cyan-900/20 to-transparent"></div>
             
             <div className="relative z-10">
                 <h3 className="text-cyan-500 font-bold uppercase tracking-[0.2em] text-xs mb-4 flex items-center gap-2">
                    <Crown size={14} /> オーナー自由用途資産 (Personal Vault)
                 </h3>
                 <div className="text-4xl sm:text-5xl lg:text-6xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 tracking-tight drop-shadow-2xl my-6">
                    ¥ 2,000,000,000,000
                 </div>
                 
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 border-t border-white/10 pt-6">
                     <div className="bg-white/5 p-4 rounded-2xl border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Total Market Cap</div>
                        <div className="text-lg font-mono text-white font-bold">162京 5,000兆円</div>
                     </div>
                     <div className="bg-white/5 p-4 rounded-2xl border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Token Valuation</div>
                        <div className="text-lg font-mono text-white font-bold">35,888京 2,500兆円</div>
                     </div>
                 </div>
             </div>
         </div>
      </div>

      {/* 350 Owner Accounts Summary with Search */}
      <div className="bg-[#0a0a12] border border-slate-800 rounded-[2rem] p-6 shadow-xl relative overflow-hidden flex flex-col gap-4 anim-enter-bottom anim-delay-200">
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-600 to-indigo-600"></div>
         
         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
             <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Building size={20} className="text-cyan-400" /> 分散資産管理 (全{ownerAccounts.length}口座)
             </h3>
             
             {/* Search Bar */}
             <div className="relative w-full sm:w-64">
                <input 
                   type="text" 
                   placeholder="口座を検索..." 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-cyan-500 transition-all focus:shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                />
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
             </div>
         </div>

         <div className="h-64 overflow-y-auto custom-scrollbar space-y-2 pr-2">
            {filteredAccounts.map((acc, idx) => (
               <div key={acc.id} className="flex justify-between items-center p-4 bg-slate-950/80 rounded-2xl border border-slate-800/80 hover:border-cyan-500/30 hover:bg-slate-900 transition-all group cursor-pointer hover:shadow-md">
                  <div className="flex items-center gap-4">
                     <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold shadow-lg transition-transform group-hover:scale-105 ${acc.isOverseas ? 'bg-indigo-900/50 text-indigo-200 ring-1 ring-indigo-500/30' : 'bg-slate-800 text-slate-300 ring-1 ring-white/10'}`}>
                        {acc.bankName.substring(0, 2)}
                     </div>
                     <div>
                        <div className="text-sm font-bold text-slate-200 group-hover:text-white">{acc.bankName}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{acc.branchName} • {acc.accountNumber}</div>
                     </div>
                  </div>
                  <div className="text-right">
                     <div className="text-sm font-mono text-white font-bold tracking-tight">{acc.currency === 'JPY' ? '¥' : '$'} {acc.balance}</div>
                     <div className="text-[10px] text-slate-500">{acc.accountName}</div>
                  </div>
               </div>
            ))}
            {filteredAccounts.length === 0 && (
                <div className="text-center py-8 text-slate-500 text-xs">
                    該当する口座が見つかりません
                </div>
            )}
         </div>
         <div className="mt-2 flex justify-between items-center text-xs text-slate-500 px-2">
            <span>Global Liquidity Pool</span>
            <span className="text-green-500 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Instant Transfer Ready</span>
         </div>
      </div>

      {/* Fiat Balances */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 anim-enter-bottom anim-delay-300">
        {/* JPY Card */}
        <div className="p-8 rounded-[2rem] bg-gradient-to-br from-[#1e1e40] to-[#0a0a15] border border-white/5 shadow-2xl relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]">
          <div className="absolute top-[-20px] right-[-20px] p-6 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-700 pointer-events-none">
             <span className="text-9xl font-serif font-bold text-white">¥</span>
          </div>
          <div className="flex justify-between items-start mb-10 relative z-10">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-xs font-medium text-cyan-200 backdrop-blur-md">
               <span>🇯🇵</span> JPY Balance
            </div>
            <div className="p-2.5 rounded-full bg-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform">
               <TrendingUp size={20} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight relative z-10 break-all drop-shadow-lg">
            ¥ {wallet.jpy.substring(0, 15)}...
          </div>
          <div className="mt-6 text-xs text-cyan-300/60 relative z-10 flex items-center gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
             Global Vault Bank (Tokyo Head Office)
          </div>
        </div>

        {/* USD Card */}
        <div className="p-8 rounded-[2rem] bg-gradient-to-br from-[#1a202c] to-[#000000] border border-white/5 shadow-2xl relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]">
          <div className="absolute top-[-20px] right-[-20px] p-6 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-700 pointer-events-none">
             <span className="text-9xl font-serif font-bold text-white">$</span>
          </div>
          <div className="flex justify-between items-start mb-10 relative z-10">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-xs font-medium text-emerald-200 backdrop-blur-md">
               <DollarSign size={14} /> USD Balance
            </div>
            <div className="p-2.5 rounded-full bg-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
               <ArrowUpRight size={20} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight relative z-10 break-all drop-shadow-lg">
            $ {wallet.usd.substring(0, 15)}...
          </div>
          <div className="mt-6 text-xs text-emerald-300/60 relative z-10 flex items-center gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
             Global Account (Cayman/SG)
          </div>
        </div>
      </div>

      {/* Sovereign Token Suite */}
      <div className="mt-12 anim-enter-bottom anim-delay-500">
        <h3 className="text-lg font-bold text-cyan-400 mb-6 flex items-center gap-2 tracking-wide">
           <Crown size={20} className="text-cyan-500" /> プライベート通貨 (Sovereign Suite)
        </h3>
        <div className="grid grid-cols-1 gap-4">
           {/* TK Coin Hero */}
           <div className="bg-gradient-to-r from-[#16162a] to-[#202030] border border-cyan-500/20 p-8 rounded-[2rem] flex flex-col md:flex-row items-center justify-between shadow-lg relative overflow-hidden group hover:border-cyan-500/40 transition-all">
              <div className="absolute inset-0 bg-cyan-500/5 mix-blend-overlay opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-cyan-500/10 blur-[50px] rounded-full pointer-events-none"></div>
              
              <div className="flex items-center gap-6 relative z-10 mb-4 md:mb-0 w-full md:w-auto">
                 <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-indigo-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-cyan-500/30 ring-2 ring-white/10 anim-float">
                    TK
                 </div>
                 <div>
                    <div className="font-bold text-xl text-white">TK Coin (Native)</div>
                    <div className="text-sm text-cyan-500">Governance & Utility</div>
                 </div>
              </div>
              <div className="relative z-10 text-right w-full md:w-auto">
                 <div className="text-2xl font-mono font-bold text-white">{wallet.tk_coin}</div>
                 <div className="text-xs text-slate-500 flex items-center justify-end gap-1">
                    Market Cap: <span className="text-cyan-400">∞</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};