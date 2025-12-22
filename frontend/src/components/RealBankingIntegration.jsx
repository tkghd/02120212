import React, { useState } from 'react';

const RealBankingIntegration = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_BASE = 'https://hopeful-liberation-production-9d00.up.railway.app';

  const sendMoney = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/real-money/withdraw`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fromBank: 'SBI',
          toBank: '楽天銀行',
          amount: 50000,
          receiverName: 'ヤマダ タロウ',
          receiverAccount: '1234567'
        })
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: error.message });
    }
    setLoading(false);
  };

  const atmWithdraw = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/real-money/atm-withdraw`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          location: 'セブンイレブン渋谷店',
          amount: 30000
        })
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: error.message });
    }
    setLoading(false);
  };

  const cardPayment = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/real-money/card-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          merchant: 'Amazon.co.jp',
          amount: 15000
        })
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: error.message });
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">🏦 REAL銀行連携</h2>
      
      <div className="space-y-4">
        <button
          onClick={sendMoney}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition disabled:opacity-50"
        >
          💸 銀行送金 (¥50,000)
        </button>

        <button
          onClick={atmWithdraw}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition disabled:opacity-50"
        >
          🏧 ATM出金 (¥30,000)
        </button>

        <button
          onClick={cardPayment}
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition disabled:opacity-50"
        >
          💳 カード決済 (¥15,000)
        </button>
      </div>

      {loading && (
        <div className="mt-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">処理中...</p>
        </div>
      )}

      {result && (
        <div className="mt-6 bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold mb-2">結果:</h3>
          <pre className="text-sm overflow-x-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default RealBankingIntegration;
