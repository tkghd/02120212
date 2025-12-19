import React, { useState, useEffect } from 'react';
import { Crown, Gem, TrendingUp, Zap, Globe, Shield } from 'lucide-react';

export const OwnerVaultView: React.FC = () => {
  const [vaultData, setVaultData] = useState<any>(null);

  useEffect(() => {
    fetch('https://tkghd-api.vercel.app/api/owner-assets')
      .then(r => r.json())
      .then(setVaultData);
  }, []);

  if (!vaultData) return <div className="text-white">Loading...</div>;

  return (
    <div className="space-y-6 pb-20">
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600 flex items-center gap-3">
        <Crown size={32} /> OWNER PERSONAL VAULT
      </h2>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 border border-amber-500/30 rounded-xl p-6">
          <div className="text-amber-400 text-sm mb-2">QUICK TRANSFER</div>
          <div className="text-3xl font-bold text-white">¥ 2兆円</div>
        </div>
        <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-xl p-6">
          <div className="text-purple-400 text-sm mb-2">MARKET CAP</div>
          <div className="text-3xl font-bold text-white">162京 5,000兆円</div>
        </div>
        <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border border-cyan-500/30 rounded-xl p-6">
          <div className="text-cyan-400 text-sm mb-2">TOKEN VALUATION</div>
          <div className="text-3xl font-bold text-white">35,888京 2,500兆円</div>
        </div>
      </div>

      {/* Proprietary Tokens */}
      <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Gem className="text-purple-400" /> Proprietary Token Vault (20 Assets)
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {vaultData.proprietaryTokens.map((token: any) => (
            <div key={token.symbol} className="bg-slate-800/50 border border-slate-600 rounded-lg p-4 hover:border-purple-500 transition-all">
              <div className="text-purple-400 font-bold text-lg">{token.symbol}</div>
              <div className="text-slate-400 text-xs mb-2">{token.name}</div>
              <div className="text-white font-mono text-xl">{token.balance}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
