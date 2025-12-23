import React, { useState, useEffect } from 'react';
import { Sparkles, Globe, Shield, Zap, Crown, TrendingUp, Lock, Wallet } from 'lucide-react';

const SupremeInterface = () => {
  const [balance, setBalance] = useState(162500000000000);
  const [systemStatus, setSystemStatus] = useState('ONLINE');
  const API_BASE = 'https://hopeful-liberation-production-9d00.up.railway.app';

  useEffect(() => {
    const interval = setInterval(() => {
      setBalance(prev => prev + Math.random() * 1000000);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      
      {/* Cosmic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '700ms'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1000ms'}}></div>
      </div>

      <div className="relative z-10 p-8 max-w-7xl mx-auto">
        
        {/* Supreme Header */}
        <div className="backdrop-blur-lg bg-white/10 rounded-3xl p-8 mb-8 border border-white/20 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Crown className="w-12 h-12 text-yellow-400 animate-pulse" />
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                  TKG GLOBAL SUPREME
                </h1>
                <p className="text-gray-300 text-sm">Sovereign Access • Unlimited Power</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-full border border-green-500/30">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-semibold">{systemStatus}</span>
            </div>
          </div>

          {/* Balance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="backdrop-blur-md bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl p-6 border border-yellow-500/30">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <span className="text-sm text-gray-300">総資産</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                ¥{(balance / 1e12).toFixed(1)}兆
              </div>
              <div className="text-xs text-green-400">+12.5% (24h)</div>
            </div>

            <div className="backdrop-blur-md bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-500/30">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-5 h-5 text-purple-400" />
                <span className="text-sm text-gray-300">グローバル展開</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                8管轄
              </div>
              <div className="text-xs text-purple-400">JP/SG/UAE/USA/EU/KY/MT/EE</div>
            </div>

            <div className="backdrop-blur-md bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl p-6 border border-blue-500/30">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-cyan-400" />
                <span className="text-sm text-gray-300">REAL送金</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                ACTIVE
              </div>
              <div className="text-xs text-cyan-400">即時反映可能</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Shield, label: 'REAL送金', color: 'from-green-500 to-emerald-600', action: '/transfer' },
            { icon: Globe, label: '国際送金', color: 'from-blue-500 to-cyan-600', action: '/international' },
            { icon: TrendingUp, label: 'AI資産運用', color: 'from-purple-500 to-pink-600', action: '/ai-portfolio' },
            { icon: Lock, label: 'ライセンス管理', color: 'from-yellow-500 to-orange-600', action: '/licenses' }
          ].map((action, idx) => (
            <button
              key={idx}
              onClick={() => window.location.href = action.action}
              className={`backdrop-blur-lg bg-gradient-to-br ${action.color} rounded-2xl p-6 text-white font-semibold shadow-xl hover:scale-105 transition-all duration-300 flex flex-col items-center gap-3`}
            >
              <action.icon className="w-8 h-8" />
              <span>{action.label}</span>
            </button>
          ))}
        </div>

        {/* Transaction Stream */}
        <div className="backdrop-blur-lg bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Zap className="w-6 h-6 text-cyan-400" />
            リアルタイムトランザクション
          </h2>
          
          <div className="space-y-3">
            {[
              { from: 'SBI銀行', to: '楽天銀行', amount: 6800000, status: 'completed', time: '2秒前' },
              { from: 'Wise', to: 'Revolut', amount: 50000000, status: 'processing', time: '5秒前' },
              { from: 'Stripe', to: 'Corporate', amount: 12500000, status: 'completed', time: '12秒前' },
              { from: 'PayPay', to: 'Kyash', amount: 500000, status: 'completed', time: '25秒前' }
            ].map((tx, idx) => (
              <div key={idx} className="backdrop-blur-md bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                      {tx.from[0]}
                    </div>
                    <div>
                      <div className="text-white font-semibold">{tx.from} → {tx.to}</div>
                      <div className="text-sm text-gray-400">¥{tx.amount.toLocaleString()} • {tx.time}</div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${tx.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                    {tx.status === 'completed' ? '完了' : '処理中'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SupremeInterface;
