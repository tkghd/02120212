import axios from 'axios';

// REAL契約用設定
const BANK_APIS = {
  sbi: {
    url: process.env.SBI_API_URL || 'https://api.sbibank.co.jp',
    key: process.env.SBI_API_KEY,
    status: process.env.SBI_API_KEY ? 'REAL' : 'MOCK'
  },
  rakuten: {
    url: process.env.RAKUTEN_API_URL || 'https://api.rakuten-bank.co.jp',
    key: process.env.RAKUTEN_API_KEY,
    status: process.env.RAKUTEN_API_KEY ? 'REAL' : 'MOCK'
  },
  gmo: {
    url: process.env.GMO_API_URL || 'https://api.gmo-aozora.com',
    key: process.env.GMO_API_KEY,
    status: process.env.GMO_API_KEY ? 'REAL' : 'MOCK'
  }
};

export async function getBanks() {
  return Object.entries(BANK_APIS).map(([id, config]) => ({
    id,
    name: id.toUpperCase() + ' Bank',
    status: config.status === 'REAL' ? 'CONNECTED' : 'MOCK_MODE',
    api: config.status
  }));
}

export async function getBalance(bankId, accountId) {
  const bank = BANK_APIS[bankId];
  
  if (bank.status === 'REAL') {
    // REAL API呼び出し
    const response = await axios.get(`${bank.url}/accounts/${accountId}/balance`, {
      headers: { 'Authorization': `Bearer ${bank.key}` }
    });
    return response.data;
  } else {
    // モックデータ
    return {
      accountId,
      balance: 5000000,
      available: 4950000,
      currency: 'JPY',
      mode: 'MOCK'
    };
  }
}

export async function executeTransfer(data) {
  const { fromBank, amount, toAccount } = data;
  const bank = BANK_APIS[fromBank];
  
  if (bank.status === 'REAL') {
    // REAL送金実行
    const response = await axios.post(`${bank.url}/transfers`, {
      amount,
      to: toAccount,
      currency: 'JPY'
    }, {
      headers: { 'Authorization': `Bearer ${bank.key}` }
    });
    
    return {
      ...response.data,
      mode: 'REAL',
      guarantee: 'DEPOSIT_INSURANCE'
    };
  } else {
    // モック送金
    return {
      transferId: `MOCK-${Date.now()}`,
      status: 'COMPLETED',
      amount,
      mode: 'MOCK',
      warning: 'REAL契約が必要です'
    };
  }
}

export async function getTransactionHistory(accountId, limit = 10) {
  return {
    accountId,
    transactions: [],
    mode: 'MOCK'
  };
}
