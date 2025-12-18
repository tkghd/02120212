import React, { useState } from 'react';
import { Landmark, Zap, CreditCard, Smartphone } from 'lucide-react';

export const RealTransferPanel: React.FC = () => {
  const [transferType, setTransferType] = useState('bank');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const transferTypes = [
    { id: 'bank', label: 'リアル銀行送金', icon: <Landmark size={20} /> },
    { id: 'domestic', label: '国内送金', icon: <Zap size={20} /> },
    { id: 'card', label: 'カード決済', icon: <CreditCard size={20} /> },
    { id: 'paypay', label: 'PayPay', icon: <Smartphone size={20} /> }
  ];

  const handleTransfer = async () => {
    setLoading(true);
    setResult(null);

    try {
      const endpoint = transferType === 'bank' 
        ? 'https://tkghd-api.vercel.app/api/real-transfer'
        : 'https://tkghd-api.vercel.app/api/transfer-all';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transferType: transferType === 'bank' ? 'bank' : undefined,
          type: transferType !== 'bank' ? transferType : undefined,
          from: 'Owner-Vault',
          to: recipient,
          amount: parseFloat(amount),
          currency: 'JPY'
        })
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Transfer error:', error);
      setResult({ success: false, error: 'Transfer failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
          <Zap className="text-white" size={20} />
        </div>
        <h3 className="text-xl font-bold text-white">REAL送金システム</h3>
        <div className="ml-auto">
          <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full border border-green-500/30">
            LIVE
          </span>
        </div>
      </div>

      {/* 送金タイプ選択 */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {transferTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setTransferType(type.id)}
            className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
              transferType === type.id
                ? 'bg-cyan-500/20 border-cyan-500'
                : 'bg-white/5 border-white/10 hover:border-white/20'
            }`}
          >
            {type.icon}
            <span className="text-sm font-medium">{type.label}</span>
          </button>
        ))}
      </div>

      {/* 入力フォーム */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm text-slate-400 mb-2">受取人</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="口座番号 / ウォレットアドレス"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-2">送金額</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="金額を入力"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* 送金ボタン */}
      <button
        onClick={handleTransfer}
        disabled={loading || !recipient || !amount}
        className="w-full py-4 px-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-green-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>⚡ 送金処理中...</>
        ) : (
          <>
            <Zap size={22} />
            REAL送金実行
          </>
        )}
      </button>

      {/* 結果表示 */}
      {result && (
        <div className={`mt-6 p-4 rounded-xl border ${
          result.success 
            ? 'bg-green-500/20 border-green-500' 
            : 'bg-red-500/20 border-red-500'
        }`}>
          <p className={`font-bold ${result.success ? 'text-green-300' : 'text-red-300'}`}>
            {result.success ? '✅ 送金完了' : '❌ 送金失敗'}
          </p>
          {result.success && (
            <div className="mt-3 space-y-1 text-sm text-green-200">
              <p>送金ID: {result.transactionId}</p>
              <p>方式: {result.method}</p>
              <p>速度: {result.speed}</p>
              <p>手数料: ¥{result.fee?.toLocaleString()}</p>
              <p>ステータス: {result.realWorldStatus || result.status}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
