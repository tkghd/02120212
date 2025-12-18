import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAPI } from '../src/hooks/useAPI';

interface TransferViewEnhancedProps {
  wallet: any;
  ownerAccounts: any[];
}

export const TransferViewEnhanced: React.FC<TransferViewEnhancedProps> = ({ wallet, ownerAccounts }) => {
  const { loading, error, secureTransfer } = useAPI();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleRealTransfer = async () => {
    if (!recipient || !amount) return;

    const result = await secureTransfer(recipient, parseFloat(amount));
    
    if (result?.success) {
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        setRecipient('');
        setAmount('');
      }, 3000);
    } else {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="space-y-4">
      {/* API Status Indicator */}
      <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 p-4 rounded-xl border border-cyan-500/20">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-sm text-cyan-400 font-mono">REAL-TIME API CONNECTED</span>
        </div>
      </div>

      {/* Real Transfer Form */}
      <div className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Send className="text-cyan-400" size={20} />
          リアルタイム送金
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-2">受取人</label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="ウォレットアドレス"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">送金額</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              disabled={loading}
            />
          </div>

          <button
            onClick={handleRealTransfer}
            disabled={loading || !recipient || !amount}
            className={`w-full py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2 ${
              status === 'success'
                ? 'bg-green-500'
                : status === 'error'
                ? 'bg-red-500'
                : 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:shadow-lg hover:shadow-cyan-500/50'
            } text-white disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {loading && '⚡ 送金中...'}
            {status === 'success' && <><CheckCircle2 size={20} /> 送金完了！</>}
            {status === 'error' && <><AlertCircle size={20} /> エラー</>}
            {status === 'idle' && !loading && '🚀 即時送金実行'}
          </button>

          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
