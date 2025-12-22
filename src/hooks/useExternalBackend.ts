import { useState } from 'react';
import { API_ROUTES } from '../config/backends';

export function useExternalBackend() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callAPI = async (endpoint: string, options?: RequestInit) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(endpoint, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    // REAL送金
    realTransfer: (data: any) => callAPI(API_ROUTES.realTransfer, {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    // 全銀送金
    zenginTransfer: (data: any) => callAPI(API_ROUTES.zenginTransfer, {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    // ATM出金
    atmWithdraw: (data: any) => callAPI(API_ROUTES.atmWithdraw, {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    // バーチャルカード
    issueCard: (data: any) => callAPI(API_ROUTES.virtualCard, {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    // ヘルスチェック
    healthCheck: () => callAPI(API_ROUTES.health)
  };
}
