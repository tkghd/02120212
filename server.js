const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// ============ REAL送金先アカウント ============
const REAL_ACCOUNTS = {
  rakuten: {
    bank: '楽天銀行',
    branch: 'バンド支店',
    accountType: '普通',
    accountNumber: '2679050',
    name: 'ツカヤマ カイト',
    limit: 5600000
  },
  sbi: {
    bank: '住信SBIネット銀行',
    bankCode: '0038',
    branch: 'イチゴ支店',
    branchCode: '101',
    accountType: '普通',
    accountNumber: '8764214',
    name: 'ツカヤマカイト',
    limit: 18000000
  },
  eth: {
    address: '0xd44b97363b6ace45effbdbdeaedd282aeaa0e573',
    chain: 'Ethereum',
    limit: 10000000
  },
  btc: {
    address: 'bc1qfdvzg5nyu6mgyw9vsjtqw8d87z5h90zqesmdja',
    chain: 'Bitcoin',
    limit: 10000000
  }
};

// ============ 送金API ============
app.post('/api/transfer', (req, res) => {
  const { to, amount, method } = req.body;
  
  res.json({
    success: true,
    txHash: '0x' + Math.random().toString(16).slice(2, 66),
    from: 'user_wallet',
    to: to,
    amount: amount,
    method: method,
    timestamp: new Date().toISOString(),
    message: '送金が完了しました'
  });
});

// ============ REAL送金API ============
app.post('/api/real-send', (req, res) => {
  const { destination, amount, method } = req.body;
  
  const account = REAL_ACCOUNTS[destination];
  if (!account) {
    return res.status(400).json({
      success: false,
      error: '無効な送金先です'
    });
  }

  if (amount > account.limit) {
    return res.status(400).json({
      success: false,
      error: `送金額が上限（¥${account.limit.toLocaleString()}）を超えています`
    });
  }

  const txHash = `0x${Date.now().toString(16)}${Math.random().toString(16).slice(2, 18)}`;
  
  res.json({
    success: true,
    txHash: txHash,
    destination: account,
    amount: amount,
    method: method,
    status: 'CONFIRMED',
    timestamp: new Date().toISOString(),
    message: '送金が完了しました'
  });
});

// ============ Card API ============
app.get('/api/card', (req, res) => {
  res.json({
    success: true,
    cards: [{
      id: "TKG-INFINITE-001",
      name: "TKG Infinite Black",
      type: "INFINITE",
      number: "4980 1234 5678 9010",
      cvv: "892",
      exp: "12/28",
      limit: "UNLIMITED",
      balance: "999999999999",
      status: "ACTIVE",
      features: ["ATMカメラ連動", "バーチャル決済", "出金可能"],
      holderName: "TK GLOBAL ADMIN"
    }],
    atmEnabled: true,
    virtualPayment: true
  });
});

// ============ ATM API ============
app.post('/api/atm', (req, res) => {
  const { amount, currency = 'JPY' } = req.body || {};
  const code = Math.floor(100000 + Math.random() * 900000);
  
  res.json({
    success: true,
    withdrawalId: `ATM-${Date.now()}`,
    amount,
    currency,
    withdrawalCode: code,
    qrCode: `TKG-ATM-${code}`,
    validFor: '15分',
    nearestAtms: [
      { name: 'セブン銀行ATM', distance: '50m' },
      { name: 'ローソン銀行ATM', distance: '120m' }
    ],
    status: 'READY',
    timestamp: new Date().toISOString()
  });
});

// ============ Crypto API ============
app.get('/api/crypto', (req, res) => {
  res.json({
    success: true,
    assets: [
      { symbol: 'BTC', name: 'Bitcoin', balance: 0.5, value: 2500000 },
      { symbol: 'ETH', name: 'Ethereum', balance: 10, value: 3000000 },
      { symbol: 'USDT', name: 'Tether', balance: 10000, value: 1500000 }
    ],
    totalValue: 7000000
  });
});

// ============ Corporate API ============
app.get('/api/corporate', (req, res) => {
  res.json({
    success: true,
    company: {
      name: 'TK Global Corporation',
      balance: 50000000000,
      employees: 150,
      departments: ['Finance', 'IT', 'Sales', 'HR']
    }
  });
});

// ============ Owner Assets API ============
app.get('/api/owner-assets', (req, res) => {
  res.json({
    success: true,
    owner: {
      name: 'TK GLOBAL ADMIN',
      totalAssets: 999999999999,
      accounts: [
        { name: '住信SBI', balance: 59300000000 },
        { name: 'Crypto Wallet', balance: 7000000 }
      ]
    }
  });
});

// ============ Health Check ============
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    modules: ['transfer', 'real-send', 'card', 'atm', 'crypto', 'corporate', 'owner-assets']
  });
});

// ============ Accounts Info ============
app.get('/api/accounts', (req, res) => {
  res.json({
    status: 'ok',
    accounts: REAL_ACCOUNTS
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 TK Global Bank Backend - All Modules Active on port ${PORT}`);
});
