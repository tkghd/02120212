const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// メモリストア
const store = {
  users: new Map([
    ['TKG-OWNER-001', { id: 'TKG-OWNER-001', name: 'TKG Owner', balance: 2000000000000000 }],
    ['user2', { id: 'user2', name: 'User 2', balance: 100000 }]
  ]),
  transactions: new Map()
};

// ヘルスチェック
app.get('/', (req, res) => {
  res.json({ status: 'OK', message: 'TKG Transfer API Running', timestamp: new Date() });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', uptime: process.uptime() });
});

// 残高照会
app.get('/api/balance/:userId', (req, res) => {
  const user = store.users.get(req.params.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ balance: user.balance, currency: 'JPY', userId: user.id });
});

// 即時送金
app.post('/api/transfer/instant', (req, res) => {
  const { fromUserId, toIdentifier, amount, note } = req.body;
  
  const fromUser = store.users.get(fromUserId);
  if (!fromUser) return res.status(404).json({ error: 'Sender not found' });
  if (fromUser.balance < amount) return res.status(400).json({ error: 'Insufficient balance' });
  
  const txId = `TX${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  
  const transaction = {
    id: txId,
    fromUserId,
    toIdentifier,
    amount,
    note,
    status: 'completed',
    fee: 0,
    createdAt: new Date().toISOString(),
    completedAt: new Date().toISOString()
  };
  
  // 残高更新
  fromUser.balance -= amount;
  store.transactions.set(txId, transaction);
  
  console.log(`✅ Transfer completed: ${txId} - ¥${amount}`);
  
  res.json(transaction);
});

// 銀行振込
app.post('/api/transfer/bank', (req, res) => {
  const { fromAccountId, toBankCode, toAccountNumber, toAccountName, amount } = req.body;
  
  const txId = `BNK${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  
  const transaction = {
    id: txId,
    type: 'bank_transfer',
    fromAccountId,
    toBankCode,
    toAccountNumber,
    toAccountName,
    amount,
    status: 'completed',
    fee: amount > 30000 ? 0 : 165,
    createdAt: new Date().toISOString()
  };
  
  store.transactions.set(txId, transaction);
  res.json(transaction);
});

// QRコード生成
app.post('/api/qr/generate', (req, res) => {
  const { userId, amount } = req.body;
  const qrData = {
    userId,
    amount,
    timestamp: Date.now(),
    expiresAt: Date.now() + 5 * 60 * 1000
  };
  
  const qrCode = Buffer.from(JSON.stringify(qrData)).toString('base64');
  res.json({ qrCode, expiresAt: qrData.expiresAt });
});

// QR送金
app.post('/api/transfer/qr', (req, res) => {
  const { fromUserId, qrCode, amount } = req.body;
  
  const qrData = JSON.parse(Buffer.from(qrCode, 'base64').toString());
  
  const txId = `QR${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  
  const transaction = {
    id: txId,
    type: 'qr_transfer',
    fromUserId,
    toUserId: qrData.userId,
    amount,
    status: 'completed',
    fee: 0,
    createdAt: new Date().toISOString()
  };
  
  store.transactions.set(txId, transaction);
  res.json(transaction);
});

// 国際送金
app.post('/api/transfer/international', (req, res) => {
  const { fromUserId, country, amount, fromCurrency, toCurrency } = req.body;
  
  const rates = { 'JPY_USD': 0.0067, 'JPY_EUR': 0.0061, 'JPY_GBP': 0.0053 };
  const rate = rates[`${fromCurrency}_${toCurrency}`] || 1;
  
  const txId = `INT${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  
  const transaction = {
    id: txId,
    type: 'international',
    fromUserId,
    country,
    amount,
    fromCurrency,
    toCurrency,
    exchangeRate: rate,
    convertedAmount: amount * rate,
    fee: amount * 0.02,
    status: 'processing',
    createdAt: new Date().toISOString(),
    estimatedArrival: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString()
  };
  
  store.transactions.set(txId, transaction);
  res.json(transaction);
});

// グループ送金
app.post('/api/transfer/group', (req, res) => {
  const { organizerId, participants, totalAmount, description } = req.body;
  
  const groupId = `GRP${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  
  const group = {
    id: groupId,
    organizerId,
    participants,
    totalAmount,
    amountPerPerson: totalAmount / participants.length,
    description,
    status: 'collecting',
    createdAt: new Date().toISOString()
  };
  
  store.transactions.set(groupId, group);
  res.json(group);
});

// 為替レート
app.get('/api/exchange-rate/:from/:to', (req, res) => {
  const rates = {
    'JPY_USD': 0.0067,
    'JPY_EUR': 0.0061,
    'JPY_GBP': 0.0053,
    'USD_JPY': 149.5,
    'EUR_JPY': 163.2
  };
  
  const rate = rates[`${req.params.from}_${req.params.to}`] || 1;
  
  res.json({
    from: req.params.from,
    to: req.params.to,
    rate,
    timestamp: new Date().toISOString()
  });
});

// 送金履歴
app.get('/api/transfers/:userId', (req, res) => {
  const transactions = Array.from(store.transactions.values())
    .filter(tx => tx.fromUserId === req.params.userId || tx.toUserId === req.params.userId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  res.json({ transactions });
});

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   🚀 TKG TRANSFER API RUNNING         ║
║   Port: ${PORT}                       ║
║   Status: READY FOR TRANSFERS         ║
╚════════════════════════════════════════╝
  `);
});
