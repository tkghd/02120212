const API = 'https://hopeful-liberation-production-9d00.up.railway.app';

export const api = {
  fetchStatus: async () => {
    const r = await fetch(`${API}/api/status`);
    return await r.json();
  },
  
  fetchVault: async () => {
    const r = await fetch(`${API}/api/vault/personal`);
    return await r.json();
  },
  
  fetchCorporate: async () => {
    const r = await fetch(`${API}/api/corporate/international`);
    return await r.json();
  },
  
  fetchJapan: async () => {
    const r = await fetch(`${API}/api/corporate/japan`);
    return await r.json();
  },
  
  executeImpact: async (data) => {
    const r = await fetch(`${API}/api/v1/impact/execute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await r.json();
  },
  
  zenginTransfer: async (data) => {
    const r = await fetch(`${API}/api/zengin/transfer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await r.json();
  }
};
