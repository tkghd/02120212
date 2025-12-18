import React, { useState } from 'react';
import { Send, Globe, Bitcoin, Smartphone, CreditCard, Landmark } from 'lucide-react';

export const UnifiedTransfer: React.FC = () => {
  const [type, setType] = useState('domestic');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const transferTypes = [
    { id: 'domestic', label: '国内送金', icon: <Landmark size={20} /> },
    { id: 'international', label: '国際送金', icon: <Globe size={20} /> },
    { id: 'crypto', label: 'Web3/Crypto', icon: <Bitcoin size={20} /> },
    { id: 'paypay', label: 'PayPay', icon: <Smartphone size={20} /> },
    { id: 'card', label: 'カード', icon: <CreditCard size={20} /> },
  ];

  const handleTransfer = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://tkghd-api.vercel.app/api/transfer-all', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, to: recipient, amount: parseFloat(amount) }),
      });
      const data = await response.json();
      setResult(data);
      setTimeout(() => {
        setResult(null);
        setRecipient('');
        setAmount('');
      }, 5000);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">🌐 統合送金システム</h2>

      {/* 送金タイプ選択 */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {transferTypes.map((t) => (
          <button
            key={t.id}
            onClick={() => setType(t.id)}
            className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
              type === t.id
                ? 'bg-cyan-500/20 border-cyan-500'
                : 'bg-white/5 border-white/10 hover:border-white/20'
            }`}
          >
            {t.icon}
            <span className="text-sm font-medium">{t.label}</span>
          </button>
        ))}
      </div>

      {/* 送金フォーム */}
      <div className="bg-white/5 p-6 rounded-xl space-y-4">
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="受取人 / アドレス"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="金額"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
        />
        <button
          onClick={handleTransfer}
          disabled={loading}
          className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg font-bold text-white hover:shadow-lg disabled:opacity-50"
        >
          {loading ? '⚡ 送金中...' : '🚀 即時送金'}
        </button>
      </div>

      {/* 結果表示 */}
      {result && (
        <div className="bg-green-500/20 border border-green-500 p-4 rounded-xl">
          <p className="text-green-300 font-bold">✅ 送金完了！</p>
          <pre className="text-xs text-green-200 mt-2">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};
