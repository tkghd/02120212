import React, { useState } from 'react';
import { Send, Zap } from 'lucide-react';

export const RealTransferButton: React.FC<{ 
  to: string; 
  amount: number;
  onSuccess?: () => void;
}> = ({ to, amount, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleRealTransfer = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://tkghd-api.vercel.app/api/real-transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transferType: 'bank',
          from: 'Owner-Vault',
          to,
          amount,
          currency: 'JPY'
        })
      });
      
      const data = await response.json();
      setResult(data);
      
      if (data.success && onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Transfer failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleRealTransfer}
        disabled={loading}
        className="w-full py-3 px-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-green-500/50 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>⚡ 送金中...</>
        ) : (
          <>
            <Zap size={20} />
            REAL送金実行
          </>
        )}
      </button>

      {result && result.success && (
        <div className="mt-4 p-4 bg-green-500/20 border border-green-500 rounded-lg">
          <p className="text-green-300 font-bold">✅ 送金完了！</p>
          <p className="text-sm text-green-200 mt-2">
            送金ID: {result.transactionId}
          </p>
          <p className="text-xs text-green-200">
            ステータス: {result.realWorldStatus}
          </p>
        </div>
      )}
    </div>
  );
};
