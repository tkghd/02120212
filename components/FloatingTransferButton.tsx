import React, { useState } from 'react';
import { Zap, X } from 'lucide-react';
import { useExternalBackend } from '../src/hooks/useExternalBackend';

export const FloatingTransferButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const { realTransfer, loading, error } = useExternalBackend();
  const [result, setResult] = useState<any>(null);

  const handleTransfer = async () => {
    const res = await realTransfer({
      transferType: 'bank',
      from: 'Owner-Vault',
      to: recipient,
      amount: parseFloat(amount),
      currency: 'JPY'
    });
    setResult(res);
  };

  return (
    <>
      {/* フローティングボタン（右下固定） */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-28 right-6 z-[9999] w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
        style={{ boxShadow: '0 10px 40px rgba(16, 185, 129, 0.4)' }}
      >
        <Zap className="text-white" size={28} />
      </button>

      {/* モーダル */}
      {isOpen && (
        <div className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 max-w-lg w-full border border-emerald-500/30 shadow-2xl">
            {/* ヘッダー */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <Zap className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">REAL送金</h3>
                  <p className="text-sm text-emerald-400">外部バックエンド連携</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* フォーム */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm text-slate-300 mb-2">受取人</label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="口座番号 / アドレス"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">金額</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            {/* 送金ボタン */}
            <button
              onClick={handleTransfer}
              disabled={loading || !recipient || !amount}
              className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '⚡ 送金中...' : '🚀 即時送金'}
            </button>

            {/* エラー表示 */}
            {error && (
              <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-xl">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            {/* 成功表示 */}
            {result?.success && (
              <div className="mt-4 p-4 bg-emerald-500/20 border border-emerald-500/50 rounded-xl">
                <p className="text-emerald-300 font-bold mb-2">✅ 送金完了</p>
                <p className="text-emerald-200 text-sm">ID: {result.transactionId}</p>
                <p className="text-emerald-200 text-xs mt-1">ステータス: {result.status}</p>
              </div>
            )}

            {/* バックエンド情報 */}
            <div className="mt-6 pt-6 border-t border-slate-700">
              <p className="text-xs text-slate-400 text-center">
                🔌 Vercel API Backend連携中
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
