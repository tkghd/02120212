import React, { useState, useEffect } from 'react';
import { Wallet, TrendingUp, Shield, Zap } from 'lucide-react';

const API_URL = 'https://gentle-insight-production-df4a.up.railway.app';

export default function GlobalDashboard() {
  const [balance, setBalance] = useState(0);
  const [cryptoData, setCryptoData] = useState(null);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [apiStatus, setApiStatus] = useState('checking');

  // API接続確認
  useEffect(() => {
    checkAPIConnection();
    loadBalance();
  }, []);

  const checkAPIConnection = async () => {
    try {
      const response = await fetch(`${API_URL}/`);
      const data = await response.json();
      if (data.status === 'OK') {
        setApiStatus('connected');
      }
    } catch (error) {
      setApiStatus('error');
      console.error('API接続エラー:', error);
    }
  };

  const loadBalance = async () => {
    try {
      const response = await fetch(`${API_URL}/api/balance`);
      const data = await response.json();
      if (data.success) {
        setBalance(data.balance);
      }
    } catch (error) {
      console.error('残高取得エラー:', error);
    }
  };

  const handleWithdraw = async () => {
    const withdrawAmount = parseInt(amount);
    if (!amount || withdrawAmount <= 0 || withdrawAmount > balance) {
      setMessage('⚠️ 正しい金額を入力してください');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${API_URL}/api/withdraw`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: withdrawAmount })
      });
      const data = await response.json();

      if (data.success) {
        setBalance(data.balance);
        setMessage(data.message);
        setAmount('');
      }
    } catch (error) {
      setMessage('❌ エラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  const loadCrypto = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/crypto`);
      const data = await response.json();
      if (data.success) {
        setCryptoData(data.portfolio);
      }
    } catch (error) {
      setMessage('❌ 暗号資産データの取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* ヘッダー */}
        <div className="text-center mb-12 anim-enter-bottom">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            🚀 Godmode Ultra HUD
          </h1>
          <p className="text-xl text-slate-400">Railway Backend × Vercel Frontend | 完全統合システム</p>
        </div>

        {/* ステータスバー */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 anim-enter-right anim-delay-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">バックエンド</p>
                <p className={`text-lg font-bold ${apiStatus === 'connected' ? 'text-green-400' : 'text-yellow-400'}`}>
                  {apiStatus === 'connected' ? '🟢 Railway' : '🟡 接続中...'}
                </p>
              </div>
              <Shield className="text-cyan-400" size={32} />
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 anim-enter-right anim-delay-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">フロントエンド</p>
                <p className="text-lg font-bold text-green-400">🟢 Vercel</p>
              </div>
              <Zap className="text-purple-400" size={32} />
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 anim-enter-right anim-delay-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">総残高</p>
                <p className="text-lg font-bold text-cyan-400">¥{balance.toLocaleString()}</p>
              </div>
              <Wallet className="text-green-400" size={32} />
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 anim-enter-right anim-delay-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">システム</p>
                <p className="text-lg font-bold text-green-400">🟢 稼働中</p>
              </div>
              <TrendingUp className="text-blue-400" size={32} />
            </div>
          </div>
        </div>

        {/* メインコンテンツ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* 銀行口座カード */}
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 anim-enter-bottom anim-delay-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-cyan-400">💳 普通預金口座</h2>
              <button
                onClick={loadBalance}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-xl text-white font-bold transition-all"
              >
                🔄 更新
              </button>
            </div>

            <div className="text-6xl font-bold text-white mb-8">
              ¥{balance.toLocaleString()}
            </div>

            <div className="space-y-4">
              <label className="block text-slate-300 font-semibold">引き出し金額</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="金額を入力"
                disabled={loading}
                className="w-full px-6 py-4 bg-slate-900/80 border-2 border-slate-700 rounded-xl text-white text-xl focus:border-cyan-400 focus:outline-none transition-all"
              />
              <button
                onClick={handleWithdraw}
                disabled={loading || !amount}
                className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-xl text-white font-bold text-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
              >
                {loading ? '処理中...' : '💸 引き出し実行'}
              </button>
            </div>

            {message && (
              <div className={`mt-6 p-4 rounded-xl font-semibold ${
                message.includes('❌') || message.includes('⚠️') 
                  ? 'bg-red-500/20 text-red-400 border border-red-500/50' 
                  : 'bg-green-500/20 text-green-400 border border-green-500/50'
              }`}>
                {message}
              </div>
            )}
          </div>

          {/* 暗号資産カード */}
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 anim-enter-bottom anim-delay-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-purple-400">₿ 暗号資産</h2>
              <button
                onClick={loadCrypto}
                disabled={loading}
                className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-xl text-white font-bold transition-all"
              >
                {loading ? '読込中...' : '🔄 更新'}
              </button>
            </div>

            {cryptoData ? (
              <>
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 mb-6">
                  <p className="text-slate-200 text-sm mb-2">総評価額</p>
                  <p className="text-5xl font-bold text-white">
                    ¥{cryptoData.totalValue.toLocaleString()}
                  </p>
                </div>

                <div className="space-y-4">
                  {cryptoData.assets.map((asset) => (
                    <div
                      key={asset.symbol}
                      className="bg-slate-900/80 border border-slate-700 rounded-2xl p-6 hover:border-cyan-400 transition-all"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-2xl font-bold text-white">{asset.symbol}</p>
                          <p className="text-slate-400">{asset.name}</p>
                          <p className="text-sm text-slate-500 mt-1">保有: {asset.balance}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-white">
                            ¥{asset.value.toLocaleString()}
                          </p>
                          <span className={`inline-block px-3 py-1 rounded-lg font-bold ${
                            asset.change.startsWith('+') 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {asset.change}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-6xl mb-4">📊</p>
                <p className="text-slate-400 text-lg">「更新」ボタンをクリック</p>
              </div>
            )}
          </div>
        </div>

        {/* フッター */}
        <div className="text-center mt-12 text-slate-500">
          <p className="text-sm">🚀 Powered by Railway (Backend) + Vercel (Frontend)</p>
          <p className="text-xs mt-2">API: {API_URL}</p>
        </div>
      </div>
    </div>
  );
}
