
import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownLeft, RefreshCw, Wallet, Zap, Copy, ExternalLink, Box, Crown, Sparkles, Loader2 } from 'lucide-react';
import { WalletState } from '../types';

interface CryptoViewProps {
  wallet: WalletState;
}

export const CryptoView: React.FC<CryptoViewProps> = ({ wallet }) => {
  const [activeTab, setActiveTab] = useState<'tokens' | 'nfts' | 'defi'>('tokens');
  const [prices, setPrices] = useState({
    BTC: 65432.10,
    ETH: 3540.25,
    SOL: 145.80,
    TKG: 1500000.00
  });

  // Simulate Live Ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev => ({
        BTC: prev.BTC + (Math.random() * 100 - 40),
        ETH: prev.ETH + (Math.random() * 20 - 8),
        SOL: prev.SOL + (Math.random() * 2 - 0.8),
        TKG: prev.TKG + (Math.random() * 500 - 100)
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex justify-between items-end mb-2">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Zap className="text-amber-400" fill="currentColor" /> Crypto Wallet
          </h2>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Connected: <span className="text-green-400">ΩMAX Chain (Mainnet)</span>
          </p>
        </div>
        <button className="p-2 bg-slate-800/50 rounded-lg text-slate-400 border border-slate-700 hover:text-white transition-colors">
            <ExternalLink size={18} />
        </button>
      </div>

      {/* Balance Hero */}
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-amber-950 via-[#1a0f00] to-black border border-amber-500/30 p-8 shadow-[0_0_40px_rgba(245,158,11,0.2)] group">
         <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none">
            <Wallet size={180} />
         </div>
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
         
         <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
               <span className="text-xs font-bold text-amber-500 uppercase tracking-widest bg-amber-900/20 px-2 py-1 rounded border border-amber-500/20">
                  Total Valuation
               </span>
            </div>
            <div className="text-4xl sm:text-5xl font-mono font-bold text-white tracking-tight drop-shadow-lg mb-6">
               $ 845,291,004.52
            </div>
            <div className="flex gap-4">
               <div className="flex items-center gap-2 text-green-400 text-sm font-bold bg-green-900/20 px-3 py-1.5 rounded-lg border border-green-500/20">
                  <TrendingUp size={16} /> +12.5% (24h)
               </div>
               <div className="flex items-center gap-2 text-slate-400 text-sm bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                  <Copy size={14} /> 0x71...9A2F
               </div>
            </div>
         </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-4 gap-3">
         <ActionButton icon={<ArrowUpRight size={24} />} label="Send" color="text-cyan-400" />
         <ActionButton icon={<ArrowDownLeft size={24} />} label="Receive" color="text-green-400" />
         <ActionButton icon={<RefreshCw size={24} />} label="Swap" color="text-purple-400" />
         <ActionButton icon={<Zap size={24} />} label="Buy" color="text-amber-400" />
      </div>

      {/* Tabs */}
      <div className="flex p-1 bg-slate-900/80 rounded-xl border border-slate-800">
         <TabButton active={activeTab === 'tokens'} onClick={() => setActiveTab('tokens')} label="Tokens" />
         <TabButton active={activeTab === 'nfts'} onClick={() => setActiveTab('nfts')} label="NFTs" />
         <TabButton active={activeTab === 'defi'} onClick={() => setActiveTab('defi')} label="DeFi Yield" />
      </div>

      {/* TOKENS VIEW */}
      {activeTab === 'tokens' && (
         <div className="space-y-3 anim-enter-bottom">
            <TokenRow 
               symbol="TKG" 
               name="TK Global Coin" 
               amount={wallet.tk_coin} 
               value={`$ ${(1500000 * 999999).toLocaleString()}`} 
               price={prices.TKG} 
               change={+15.4} 
               icon={<Crown size={20} className="text-white" />} 
               color="bg-gradient-to-br from-amber-500 to-orange-600"
            />
            <TokenRow 
               symbol="BTC" 
               name="Bitcoin" 
               amount="1,250.00" 
               value={`$ ${(1250 * prices.BTC).toLocaleString(undefined, {maximumFractionDigits: 0})}`} 
               price={prices.BTC} 
               change={+2.4} 
               icon={<span className="text-white font-bold text-lg">₿</span>} 
               color="bg-[#F7931A]"
            />
            <TokenRow 
               symbol="ETH" 
               name="Ethereum" 
               amount="5,000.00" 
               value={`$ ${(5000 * prices.ETH).toLocaleString(undefined, {maximumFractionDigits: 0})}`} 
               price={prices.ETH} 
               change={-0.5} 
               icon={<span className="text-white font-bold text-lg">Ξ</span>} 
               color="bg-[#627EEA]"
            />
            <TokenRow 
               symbol="USDT" 
               name="Tether USD" 
               amount="50,000,000" 
               value="$ 50,000,000" 
               price={1.00} 
               change={0.01} 
               icon={<span className="text-white font-bold text-sm">T</span>} 
               color="bg-[#26A17B]"
            />
         </div>
      )}

      {/* NFTs VIEW */}
      {activeTab === 'nfts' && (
         <div className="grid grid-cols-2 gap-4 anim-enter-bottom">
            <NFTCard name="Godmode Access Key #001" collection="Genesis Prime" value="150 ETH" image="https://www.transparenttextures.com/patterns/cubes.png" color="from-cyan-500 to-blue-600" />
            <NFTCard name="Cyber Samurai #888" collection="Neo Tokyo" value="45 ETH" image="https://www.transparenttextures.com/patterns/carbon-fibre.png" color="from-red-500 to-rose-600" />
            <NFTCard name="Golden Vault" collection="TKG Assets" value="∞ TKG" image="https://www.transparenttextures.com/patterns/wood-pattern.png" color="from-amber-400 to-yellow-600" />
            <NFTCard name="Void Walker" collection="Unknown" value="???" image="https://www.transparenttextures.com/patterns/black-scales.png" color="from-purple-500 to-indigo-900" />
         </div>
      )}

      {/* DeFi VIEW */}
      {activeTab === 'defi' && (
          <div className="space-y-4 anim-enter-bottom">
              <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-900/40 to-slate-900 border border-indigo-500/30">
                  <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                              <Sparkles size={20} />
                          </div>
                          <div>
                              <div className="text-white font-bold">Godmode Staking Pool</div>
                              <div className="text-xs text-indigo-300">Auto-Compounding</div>
                          </div>
                      </div>
                      <span className="text-2xl font-bold text-green-400 font-mono">9,999% APY</span>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3 flex justify-between items-center mb-3">
                      <span className="text-xs text-slate-400">Staked Amount</span>
                      <span className="text-sm font-mono font-bold text-white">500,000 TKG</span>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3 flex justify-between items-center">
                      <span className="text-xs text-slate-400">Pending Rewards</span>
                      <span className="text-sm font-mono font-bold text-amber-400 flex items-center gap-1">
                          <Zap size={12} fill="currentColor" /> 12,450 TKG
                      </span>
                  </div>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-900/40 to-slate-900 border border-cyan-500/30">
                  <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                              <RefreshCw size={20} />
                          </div>
                          <div>
                              <div className="text-white font-bold">ETH / TKG Liquidity</div>
                              <div className="text-xs text-cyan-300">Uniswap V3 (Godmode)</div>
                          </div>
                      </div>
                      <span className="text-2xl font-bold text-green-400 font-mono">450% APR</span>
                  </div>
                  <button className="w-full py-3 bg-cyan-500/10 border border-cyan-500/50 rounded-xl text-cyan-400 font-bold hover:bg-cyan-500/20 transition-colors">
                      Manage Position
                  </button>
              </div>
          </div>
      )}

    </div>
  );
};

const ActionButton: React.FC<{ icon: React.ReactNode, label: string, color: string }> = ({ icon, label, color }) => (
    <button className="flex flex-col items-center gap-2 p-3 bg-slate-900 border border-slate-800 rounded-2xl hover:bg-slate-800 transition-all active:scale-95 group">
        <div className={`p-3 rounded-full bg-slate-950 shadow-inner group-hover:scale-110 transition-transform ${color}`}>
            {icon}
        </div>
        <span className="text-xs font-bold text-slate-400 group-hover:text-white">{label}</span>
    </button>
);

const TabButton: React.FC<{ active: boolean, onClick: () => void, label: string }> = ({ active, onClick, label }) => (
    <button 
        onClick={onClick}
        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${active ? 'bg-slate-700 text-white shadow-md' : 'text-slate-500 hover:text-slate-300'}`}
    >
        {label}
    </button>
);

const TokenRow: React.FC<{ symbol: string, name: string, amount: string, value: string, price: number, change: number, icon: React.ReactNode, color: string }> = ({ symbol, name, amount, value, price, change, icon, color }) => (
    <div className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-slate-600 transition-colors">
        <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${color}`}>
                {icon}
            </div>
            <div>
                <div className="text-sm font-bold text-white">{name}</div>
                <div className="text-xs text-slate-500 font-mono">{price.toLocaleString(undefined, {style: 'currency', currency: 'USD'})}</div>
            </div>
        </div>
        <div className="text-right">
            <div className="text-sm font-bold text-white font-mono">{value}</div>
            <div className={`text-xs font-mono flex items-center justify-end gap-1 ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {change >= 0 ? '+' : ''}{change.toFixed(2)}%
            </div>
        </div>
    </div>
);

const NFTCard: React.FC<{ name: string, collection: string, value: string, image: string, color: string }> = ({ name, collection, value, image, color }) => {
    const [loaded, setLoaded] = useState(false);
    
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group hover:border-slate-600 transition-all relative hover:shadow-[0_0_20px_rgba(79,70,229,0.15)]">
            <div className={`h-40 w-full bg-gradient-to-br ${color} relative flex items-center justify-center overflow-hidden`}>
                
                {/* Loading Placeholder */}
                <div className={`absolute inset-0 flex items-center justify-center bg-slate-800 z-10 transition-opacity duration-500 ${loaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                    <div className="absolute inset-0 bg-white/5 animate-pulse"></div>
                    <Loader2 size={24} className="text-indigo-400 animate-spin" />
                </div>

                {/* Actual Image */}
                <img 
                    src={image} 
                    alt={name}
                    className={`w-full h-full object-cover relative z-0 transition-all duration-700 transform ${loaded ? 'opacity-100 scale-100 group-hover:scale-110' : 'opacity-0 scale-105'}`}
                    onLoad={() => setLoaded(true)}
                />
                
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
                
                {/* Floating Badge */}
                <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md border border-white/10 px-2 py-1 rounded text-[10px] text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                   ERC-721
                </div>
            </div>
            
            <div className="p-4 relative z-10 bg-slate-900">
                <div className="flex justify-between items-start mb-1">
                    <div className="text-[10px] text-indigo-400 uppercase font-bold tracking-wider">{collection}</div>
                    <div className="text-[10px] text-slate-500 font-mono">#{Math.floor(Math.random()*9999)}</div>
                </div>
                <div className="text-sm font-bold text-white truncate mb-3">{name}</div>
                
                <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-slate-500">Floor Price</span>
                        <span className="text-xs font-mono font-bold text-slate-300">{value}</span>
                    </div>
                    <button className="px-3 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 text-xs font-bold rounded-lg transition-colors">
                        Bid
                    </button>
                </div>
            </div>
        </div>
    );
};
