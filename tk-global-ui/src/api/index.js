const API = 'https://hopeful-liberation-production-9d00.up.railway.app';

export const fetchStatus = async () => {
  const r = await fetch(`${API}/api/status`);
  return await r.json();
};

export const fetchVault = async () => {
  const r = await fetch(`${API}/api/vault/personal`);
  return await r.json();
};

export const fetchCorporate = async () => {
  const r = await fetch(`${API}/api/corporate/international`);
  return await r.json();
};

export const executeImpact = async (country, amount, recipient) => {
  const r = await fetch(`${API}/api/v1/impact/execute`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ country, amount, recipient })
  });
  return await r.json();
};
