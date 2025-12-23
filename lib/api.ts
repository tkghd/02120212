const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081';
export const api = {
  balance: (userId: string, access: string) => 
    fetch(`${API_URL}/api/balance/${userId}?access=${access}`).then(r => r.json()),
  transfer: (data: any) =>
    fetch(`${API_URL}/api/transfer/instant`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(r => r.json()),
  stats: () => fetch(`${API_URL}/api/stats`).then(r => r.json()),
};
export default api;
