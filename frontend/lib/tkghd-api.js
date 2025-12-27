const API_BASE = 'https://tkghd-api-azure.vercel.app';

class TKGHDApi {
  constructor() {
    this.baseUrl = API_BASE;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    try {
      const response = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        ...options,
      });
      const data = await response.json();
      return { success: response.ok, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async initialize() {
    return this.request('/api/health');
  }

  async quickSend(amount, currency, recipient) {
    return this.request('/api/remittance/send', {
      method: 'POST',
      body: JSON.stringify({ amount, currency, recipient, method: 'bank' }),
    });
  }

  async connectMetaMask() {
    if (!window.ethereum) return { success: false, error: 'MetaMask not installed' };
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      return this.request('/api/web3/connect', {
        method: 'POST',
        body: JSON.stringify({ walletAddress: accounts[0], chainId: 1 }),
      });
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getDashboardData() {
    const [health, licenses, portfolio, revenue] = await Promise.all([
      this.request('/api/health'),
      this.request('/api/corporate/licenses'),
      this.request('/api/assets/portfolio'),
      this.request('/api/revenue/analytics'),
    ]);
    return { health: health.data, licenses: licenses.data, portfolio: portfolio.data, revenue: revenue.data };
  }
}

const tkghdApi = new TKGHDApi();
if (typeof window !== 'undefined') {
  tkghdApi.initialize();
  window.tkghdApi = tkghdApi;
}
export default tkghdApi;
