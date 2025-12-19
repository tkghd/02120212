import { useState } from 'react';

const API_BASE = 'https://tkghd-api.vercel.app';

export function useTransferAPI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const transfer = async (type: string, data: any) => {
    setLoading(true);
    setError(null);
    try {
      const endpoints: Record<string, string> = {
        bank: '/api/real-transfer',
        domestic: '/api/transfer-all',
        atm: '/api/atm-withdraw',
        card: '/api/virtual-card',
        crypto: '/api/crypto-wallet'
      };

      const response = await fetch(`${API_BASE}${endpoints[type] || '/api/transfer-all'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const json = await response.json();
      setResult(json);
      return json;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Transfer failed');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { transfer, loading, error, result };
}
