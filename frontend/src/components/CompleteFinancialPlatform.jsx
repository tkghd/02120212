import React, { useState } from 'react';

const CompleteFinancialPlatform = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_BASE = 'https://hopeful-liberation-production-9d00.up.railway.app';

  const executeAction = async (endpoint, data) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      setResult(result);
    } catch (error) {
      setResult({ error: error.message });
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      {/* REAL送金強化モジュール */}
      <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl shadow-2xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
          💸 REAL送金システム (強化版)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => executeAction('/api/real-transfer/send', {
              fromAccount: 'TKG-MAIN-001',
              toAccount: 'TKG-DEST-002',
              amount: 1000000,
              purpose: '本番送金テスト'
            })}
            disabled={loading}
            className="bg-white text-green-700 font-bold py-4 px-6 rounded-xl hover:bg-gray-100 transition disabled:opacity-50"
          >
            💰 即時送金 (¥100万)
          </button>
          <button
            onClick={() => executeAction('/api/global/transfer', {
              from: { account: 'TKG001', bank: 'TK Global Bank' },
              to: { account: 'US12345', bank: 'Chase Bank' },
              amount: 500000,
              currency: 'USD'
            })}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 font-bold py-4 px-6 rounded-xl transition disabled:opacity-50"
          >
            🌍 国際送金 ($5,000)
          </button>
        </div>
      </div>

      {/* 金融ライセンス */}
      <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl shadow-2xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-6">🏢 金融ライセンス</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => executeAction('/api/license/financial/apply', {
              companyName: 'TK Financial Services',
              type: 'banking',
              jurisdiction: 'Japan'
            })}
            disabled={loading}
            className="bg-white text-purple-700 font-bold py-4 px-6 rounded-xl hover:bg-gray-100 transition disabled:opacity-50"
          >
            🏦 銀行ライセンス
          </button>
          <button
            onClick={() => executeAction('/api/license/financial/apply', {
              companyName: 'TK Payment Solutions',
              type: 'payment',
              jurisdiction: 'Global'
            })}
            disabled={loading}
            className="bg-yellow-400 text-purple-900 font-bold py-4 px-6 rounded-xl hover:bg-yellow-300 transition disabled:opacity-50"
          >
            💳 決済ライセンス
          </button>
          <button
            onClick={() => executeAction('/api/license/financial/apply', {
              companyName: 'TK Crypto Exchange',
              type: 'crypto',
              jurisdiction: 'Singapore'
            })}
            disabled={loading}
            className="bg-orange-400 text-purple-900 font-bold py-4 px-6 rounded-xl hover:bg-orange-300 transition disabled:opacity-50"
          >
            ₿ 暗号資産ライセンス
          </button>
        </div>
      </div>

      {/* 口座開設 */}
      <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl shadow-2xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-6">🏦 口座開設</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => executeAction('/api/account/open', {
              accountType: 'personal',
              currency: 'JPY',
              holderName: '山田太郎',
              holderType: 'individual'
            })}
            disabled={loading}
            className="bg-white text-blue-700 font-bold py-4 px-6 rounded-xl hover:bg-gray-100 transition disabled:opacity-50"
          >
            👤 個人口座開設
          </button>
          <button
            onClick={() => executeAction('/api/account/open', {
              accountType: 'business',
              currency: 'USD',
              holderName: 'TK Corporation',
              holderType: 'corporation'
            })}
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 font-bold py-4 px-6 rounded-xl transition disabled:opacity-50"
          >
            🏢 法人口座開設
          </button>
        </div>
      </div>

      {/* 法人サービス */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-6">🏢 法人サービス</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => executeAction('/api/corporate/register', {
              companyName: 'TK Global Holdings',
              country: 'Japan',
              type: 'domestic',
              directors: ['Yamada Taro', 'Suzuki Hanako']
            })}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 font-bold py-4 px-6 rounded-xl transition disabled:opacity-50"
          >
            📋 国内法人登録
          </button>
          <button
            onClick={() => executeAction('/api/corporate/international-transfer', {
              from: { company: 'TK Japan', account: 'JP123456' },
              to: { company: 'TK USA', account: 'US789012' },
              amount: 10000000,
              purpose: 'Investment'
            })}
            disabled={loading}
            className="bg-purple-500 hover:bg-purple-600 font-bold py-4 px-6 rounded-xl transition disabled:opacity-50"
          >
            🌍 国際法人送金
          </button>
        </div>
      </div>

      {/* 収益化 */}
      <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl shadow-2xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-6">💰 収益化システム</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => executeAction('/api/revenue/monetize', {
              source: 'transaction_fees',
              amount: 250000,
              method: 'instant'
            })}
            disabled={loading}
            className="bg-white text-orange-700 font-bold py-4 px-6 rounded-xl hover:bg-gray-100 transition disabled:opacity-50"
          >
            💵 手数料収益化
          </button>
          <button
            onClick={async () => {
              setLoading(true);
              try {
                const response = await fetch(`${API_BASE}/api/revenue/report?period=monthly`);
                const data = await response.json();
                setResult(data);
              } catch (error) {
                setResult({ error: error.message });
              }
              setLoading(false);
            }}
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 font-bold py-4 px-6 rounded-xl transition disabled:opacity-50"
          >
            📊 収益レポート
          </button>
        </div>
      </div>

      {/* APIキー生成 */}
      <div className="bg-gradient-to-br from-red-600 to-pink-600 rounded-2xl shadow-2xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-6">🔑 APIキー管理</h2>
        <button
          onClick={() => executeAction('/api/api-keys/generate', {
            name: 'Production API Key',
            permissions: ['transfer', 'withdraw', 'deposit', 'exchange', 'analytics']
          })}
          disabled={loading}
          className="w-full bg-white text-red-700 font-bold py-4 px-6 rounded-xl hover:bg-gray-100 transition disabled:opacity-50"
        >
          🔐 本番APIキー生成
        </button>
      </div>

      {/* ローディング */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-800 font-bold text-xl">処理中...</p>
            <p className="text-gray-600 text-sm mt-2">外部連携実行中</p>
          </div>
        </div>
      )}

      {/* 結果表示 */}
      {result && !loading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-gray-800">✅ 処理完了</h3>
              <button
                onClick={() => setResult(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>
            <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm">
              {JSON.stringify(result, null, 2)}
            </pre>
            <button
              onClick={() => setResult(null)}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition"
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompleteFinancialPlatform;
