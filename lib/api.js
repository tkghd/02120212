const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://hopeful-liberation-production-9d00.up.railway.app';

export async function fetchAPI(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  return res.json();
}

// 便利関数
export const api = {
  getSystemStatus: () => fetchAPI('/api/system/status'),
  getRealAccounts: () => fetchAPI('/api/accounts/real'),
  executeTransfer: (data) => fetchAPI('/api/transfer/execute', { method: 'POST', body: JSON.stringify(data) }),
  getPortfolio: () => fetchAPI('/api/portfolio'),
};
