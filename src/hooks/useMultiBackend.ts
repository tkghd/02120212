import { useState } from 'react';
import { API_ROUTES, getBackendFor } from '../config/backends';

export function useMultiBackend() {
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

      if (!response.ok) throw new Error(`API Error: ${response.status}`);
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
    // Vercel APIs
    health: () => callAPI(API_ROUTES.health),
    realTransfer: (data: any) => callAPI(API_ROUTES.realTransfer, {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    ownerVault: () => callAPI(API_ROUTES.ownerVault),
    cryptoWallet: () => callAPI(API_ROUTES.cryptoWallet),
    
    // Railway APIs
    zenginBanks: () => callAPI(API_ROUTES.zenginBanks),
    zenginStatus: () => callAPI(API_ROUTES.zenginStatus),
    zenginTransfer: (data: any) => callAPI(API_ROUTES.zenginTransfer, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  };
}
