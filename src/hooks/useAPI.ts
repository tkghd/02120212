import { useState } from 'react';
import * as api from '../lib/apiClient';

export function useAPI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async <T,>(fn: () => Promise<T>): Promise<T | null> => {
    setLoading(true);
    setError(null);
    try {
      const result = await fn();
      return result;
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
    healthCheck: () => execute(api.healthCheck),
    secureTransfer: (to: string, amount: number) => 
      execute(() => api.secureTransfer(to, amount)),
    callAI: (prompt: string) => execute(() => api.callAI(prompt)),
  };
}
