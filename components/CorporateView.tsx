import React, { useState, useEffect } from 'react';
import { Building2, Globe, TrendingUp, Activity } from 'lucide-react';

export const CorporateView: React.FC = () => {
  const [corpData, setCorpData] = useState<any>(null);

  useEffect(() => {
    fetch('https://tkghd-api.vercel.app/api/corporate-sync')
      .then(r => r.json())
      .then(setCorpData);
  }, []);

  if (!corpData) return <div className="text-white">Loading...</div>;

  return (
    <div className="space-y-6 pb-20">
      <h2 className="text-3xl font-bold text-white flex items-center gap-3">
        <Building2 className="text-blue-400" /> International Corporate Sync
      </h2>
      <div className="text-emerald-400 font-bold flex items-center gap-2 animate-pulse">
        <Activity size={20} /> SYNCING LIVE
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {corpData.corporations.map((corp: any) => (
          <div key={corp.name} className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">{corp.name}</h3>
                <div className="text-slate-400 flex items-center gap-2 mt-1">
                  <Globe size={14} /> {corp.location}
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                corp.status === 'ACTIVE' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'
              }`}>
                {corp.status}
              </span>
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {corp.currency} {(corp.balance / 1000000).toFixed(0)}M
            </div>
            <div className="flex justify-between text-sm text-slate-400">
              <span>{corp.accounts} 口座</span>
              <span>シェア {corp.marketShare}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 分散資産 */}
      <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">分散資産管理 (全{corpData.distributedAccounts.total}口座)</h3>
        {corpData.distributedAccounts.banks.map((bank: any, idx: number) => (
          <div key={idx} className="border-b border-slate-700 last:border-0 py-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-white font-bold">{bank.name}</div>
                <div className="text-slate-400 text-sm">{bank.branch} • {bank.accountNumber}</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-emerald-400">¥ {(parseInt(bank.balance) / 1000000000000).toFixed(1)}兆円</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
