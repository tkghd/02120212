import React from 'react';
import { useTransferAPI } from '../src/hooks/useTransferAPI';
import { Zap } from 'lucide-react';

interface TransferAPIIntegrationProps {
  onTransferComplete?: (result: any) => void;
}

export const TransferAPIIntegration: React.FC<TransferAPIIntegrationProps> = ({ 
  onTransferComplete 
}) => {
  const { transfer, loading, error, result } = useTransferAPI();
  const [showPanel, setShowPanel] = React.useState(false);

  return (
    <>
      {/* トグルボタン（既存UIの邪魔にならない） */}
      <button
        onClick={() => setShowPanel(!showPanel)}
        className="fixed bottom-24 right-6 z-50 w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
      >
        <Zap className="text-white" size={24} />
      </button>

      {/* API連動パネル（表示/非表示） */}
      {showPanel && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl p-6 max-w-md w-full border border-cyan-500/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">REAL送金 API</h3>
              <button
                onClick={() => setShowPanel(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <QuickTransferForm 
              onTransfer={transfer}
              loading={loading}
              error={error}
              result={result}
            />
          </div>
        </div>
      )}
    </>
  );
};

const QuickTransferForm: React.FC<{
  onTransfer: (type: string, data: any) => Promise<any>;
  loading: boolean;
  error: string | null;
  result: any;
}> = ({ onTransfer, loading, error, result }) => {
  const [amount, setAmount] = React.useState('');
  const [recipient, setRecipient] = React.useState('');

  const handleSubmit = async () => {
    await onTransfer('bank', {
      transferType: 'bank',
      from: 'Owner-Vault',
      to: recipient,
      amount: parseFloat(amount),
      currency: 'JPY'
    });
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="受取人"
        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="金額"
        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-bold disabled:opacity-50"
      >
        {loading ? '送金中...' : 'REAL送金実行'}
      </button>

      {error && (
        <div className="p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-300 text-sm">
          {error}
        </div>
      )}

      {result?.success && (
        <div className="p-3 bg-green-500/20 border border-green-500 rounded-lg text-green-300 text-sm">
          ✅ 送金完了: {result.transactionId}
        </div>
      )}
    </div>
  );
};
