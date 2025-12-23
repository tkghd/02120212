import React, { useState, useEffect } from 'react';
import { Activity, Database, Zap, Shield, TrendingUp } from 'lucide-react';

export const StatusDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      const [health, vault, crypto] = await Promise.all([
        fetch('https://tkghd-api-azure.vercel.app/api/health').then(r => r.json()),
        fetch('https://tkghd-api-azure.vercel.app/api/owner-vault').then(r => r.json()),
        fetch('https://tkghd-api-azure.vercel.app/api/crypto-wallet').then(r => r.json())
      ]);
      setStats({ health, vault, crypto });
    } catch (err) {
      console.error('Stats fetch error:', err);
    }
  };

  if (!stats) return null;

  return (
    <div className="fixed top-4 right-4 z-50 w-96 bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/30 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Activity className="text-green-400" size={24} />
          System Status
        </h3>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-green-400 font-bold">LIVE</span>
        </div>
      </div>

      {/* 総資産 */}
      <div className="mb-4 p-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl border border-purple-500/30">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="text-purple-400" size={18} />
          <span className="text-sm text-purple-300">総資産</span>
        </div>
        <p className="text-2xl font-bold text-white">{stats.vault.summary.totalMarketCap}</p>
        <p className="text-xs text-purple-200 mt-1">350口座分散管理</p>
      </div>

      {/* トークン評価額 */}
      <div className="mb-4 p-4 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-xl border border-blue-500/30">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="text-blue-400" size={18} />
          <span className="text-sm text-blue-300">トークン評価額</span>
        </div>
        <p className="text-2xl font-bold text-white">{stats.vault.summary.tokenValuation}</p>
      </div>

      {/* 暗号通貨 */}
      <div className="mb-4 p-4 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-xl border border-green-500/30">
        <div className="flex items-center gap-2 mb-2">
          <Database className="text-green-400" size={18} />
          <span className="text-sm text-green-300">暗号通貨</span>
        </div>
        <p className="text-2xl font-bold text-white">${stats.crypto.totalValuation.toLocaleString()}</p>
        <p className="text-xs text-green-200 mt-1">+{stats.crypto.change24h}% (24h)</p>
      </div>

      {/* システムステータス */}
      <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
        <div className="flex items-center gap-2 mb-3">
          <Shield className="text-cyan-400" size={18} />
          <span className="text-sm text-slate-300">セキュリティ</span>
        </div>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-400">Backend</span>
            <span className="text-green-400 font-bold">{stats.health.backend}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Database</span>
            <span className="text-yellow-400 font-bold">AWS RDS</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Mode</span>
            <span className="text-purple-400 font-bold">IMMORTAL</span>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-slate-500">Last update: {new Date().toLocaleTimeString()}</p>
      </div>
    </div>
  );
};
