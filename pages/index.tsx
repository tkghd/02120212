import { useEffect, useState } from 'react';
import Head from 'next/head';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081';

export default function Home() {
  const [balance, setBalance] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [access, setAccess] = useState('');

  useEffect(() => {
    // URLからaccess parameterを取得
    const params = new URLSearchParams(window.location.search);
    const accessParam = params.get('access') || '';
    setAccess(accessParam);

    if (accessParam === 'sovereign') {
      fetchBalance();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchBalance = async () => {
    try {
      const res = await fetch(`${API_URL}/api/balance/TKG-OWNER-001?access=sovereign`);
      const data = await res.json();
      setBalance(data);
    } catch (error) {
      console.error('Balance fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-2xl">Loading TKG Global Bank...</div>
      </div>
    );
  }

  if (access !== 'sovereign') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <Head>
          <title>TKG Global Bank - Sovereign Access Required</title>
        </Head>
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-4">🏛️ TKG Global Bank</h1>
          <p className="text-2xl text-gray-300 mb-8">Version 30.0 - Ultimate</p>
          <div className="bg-red-900/30 border border-red-500 rounded-lg p-6 max-w-md">
            <p className="text-red-300 text-lg">⚠️ Sovereign Access Required</p>
            <p className="text-gray-400 mt-2">Add ?access=sovereign to URL</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8">
      <Head>
        <title>TKG Global Bank V30 - Sovereign Dashboard</title>
      </Head>

      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4">🏛️ TKG Global Bank</h1>
          <p className="text-2xl text-gray-300">Version 30.0 - Ultimate Edition</p>
          <div className="mt-4 inline-flex items-center gap-2 bg-green-900/30 border border-green-500 rounded-full px-6 py-2">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-green-300">OPERATIONAL</span>
          </div>
        </div>

        {/* Total Assets */}
        {balance && (
          <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-500/50 rounded-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold mb-4">💎 Total Assets</h2>
            <p className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              ¥{(balance.totalAssets / 1_000_000_000_000).toFixed(0)}兆円
            </p>
          </div>
        )}

        {/* Vault */}
        {balance && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">🏦 Vault</h3>
              <p className="text-3xl font-bold">¥{(balance.vault.total / 1_000_000_000_000).toFixed(0)}兆円</p>
              <p className="text-gray-400 mt-2">Available: ¥{(balance.vault.available / 1_000_000_000_000).toFixed(0)}兆円</p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">📊 Quick Stats</h3>
              <div className="space-y-2">
                <p>Bank Accounts: {balance.realBanks?.length || 0}</p>
                <p>Crypto Wallets: {Object.keys(balance.crypto || {}).length}</p>
                <p>Status: Immortal Mode Active</p>
              </div>
            </div>
          </div>
        )}

        {/* Real Bank Accounts */}
        {balance?.realBanks && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4">🏦 Real Bank Accounts</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {balance.realBanks.map((bank: any, idx: number) => (
                <div key={idx} className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/50 rounded-xl p-6">
                  <h4 className="font-bold text-lg mb-2">{bank.bankName}</h4>
                  <p className="text-gray-400 text-sm mb-4">Account: {bank.account}</p>
                  <p className="text-2xl font-bold">¥{(bank.balance / 1_000_000_000_000).toFixed(1)}兆円</p>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-green-400 text-sm">{bank.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Crypto Wallets */}
        {balance?.crypto && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4">₿ Crypto Wallets</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(balance.crypto).map(([currency, wallet]: [string, any]) => (
                <div key={currency} className="bg-gradient-to-br from-orange-900/30 to-yellow-900/30 border border-orange-500/50 rounded-xl p-6">
                  <h4 className="font-bold text-lg mb-2">{currency}</h4>
                  <p className="text-2xl font-bold mb-2">{wallet.amount.toLocaleString()}</p>
                  <p className="text-gray-400">≈ ¥{(wallet.valueJPY / 1_000_000_000).toFixed(2)}B</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p>TKG Global Bank V30.0 - Ultimate Edition</p>
          <p className="mt-2">🔥 Immortal Mode Active | ⚡ Real Transfer Enabled</p>
        </div>
      </div>
    </div>
  );
}
