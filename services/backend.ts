const API_URL = typeof window !== 'undefined' && window.location.hostname === 'localhost' ? 'http://localhost:3000' : '';
export const backendAPI = {
  async health() { const r = await fetch(`${API_URL}/api/health`); return r.json(); },
  async paypayTransfer(data: any) { const r = await fetch(`${API_URL}/api/paypay/transfer`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }); return r.json(); },
  async cotraTransfer(data: any) { const r = await fetch(`${API_URL}/api/cotra/transfer`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }); return r.json(); },
  async bankTransfer(data: any) { const r = await fetch(`${API_URL}/api/bank/transfer`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }); return r.json(); },
  async cardPayment(data: any) { const r = await fetch(`${API_URL}/api/card/payment`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }); return r.json(); },
  async atmWithdraw(data: any) { const r = await fetch(`${API_URL}/api/atm/withdraw`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }); return r.json(); },
  async cameraScan(data: any) { const r = await fetch(`${API_URL}/api/camera/scan`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }); return r.json(); },
  async faceAuth(data: any) { const r = await fetch(`${API_URL}/api/camera/face-auth`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }); return r.json(); },
  async getAllBalances() { const r = await fetch(`${API_URL}/api/balance/all`); return r.json(); }
};
