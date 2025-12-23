const express = require('express');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({ origin: '*' }));
app.use(express.json());

// Database
const DB = {
  owner: {
    id: 'TKG-OWNER-001',
    vault: 2_000_000_000_000_000,
    banks: [
      { bank: '住信SBI', account: '9273342', balance: 80_600_000_000_000 },
      { bank: 'みんな銀行', account: '2439188', balance: 41_300_000_000_000 },
      { bank: '三井住友', account: '9469248', balance: 95_800_000_000_000 }
    ],
    crypto: { BTC: 125000, ETH: 850000 }
  },
  transactions: new Map(),
  stats: { total: 0, amount: 0 }
};

// Routes
app.get('/', (req, res) => res.json({
  status: 'OPERATIONAL',
  service: 'TKG Global Bank',
  version: '5.0',
  port: PORT
}));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.get('/health', (req, res) => res.json({ status: 'ok', uptime: process.uptime() }));

app.get('/api/balance/:userId', (req, res) => res.json({
  userId: DB.owner.id,
  vault: DB.owner.vault,
  banks: DB.owner.banks,
  crypto: DB.owner.crypto
}));

app.post('/api/transfer/instant', (req, res) => {
  const { fromUserId, toIdentifier, amount, note } = req.body;
  const tx = {
    id: `TX-${Date.now()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`,
    type: 'instant',
    fromUserId,
    toIdentifier,
    amount: parseFloat(amount),
    note,
    status: 'completed',
    createdAt: new Date().toISOString()
  };
  DB.transactions.set(tx.id, tx);
  DB.stats.total++;
  DB.stats.amount += parseFloat(amount);
  console.log(`✅ Transfer: ${tx.id} | ¥${amount}`);
  res.json(tx);
});

app.post('/api/transfer/bank', (req, res) => {
  const { toBankCode, toAccountNumber, amount } = req.body;
  const tx = {
    id: `BANK-${Date.now()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`,
    type: 'bank',
    toBankCode,
    toAccountNumber,
    amount: parseFloat(amount),
    status: 'completed',
    createdAt: new Date().toISOString()
  };
  DB.transactions.set(tx.id, tx);
  res.json(tx);
});

app.post('/api/transfer/crypto', (req, res) => {
  const { toAddress, amount, currency } = req.body;
  const tx = {
    id: `CRYPTO-${Date.now()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`,
    type: 'crypto',
    toAddress,
    amount: parseFloat(amount),
    currency,
    txHash: `0x${crypto.randomBytes(32).toString('hex')}`,
    status: 'completed',
    createdAt: new Date().toISOString()
  };
  DB.transactions.set(tx.id, tx);
  res.json(tx);
});

app.post('/api/transfer/international', (req, res) => {
  const { amount, fromCurrency, toCurrency } = req.body;
  const tx = {
    id: `INTL-${Date.now()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`,
    type: 'international',
    amount: parseFloat(amount),
    fromCurrency,
    toCurrency,
    status: 'completed',
    createdAt: new Date().toISOString()
  };
  DB.transactions.set(tx.id, tx);
  res.json(tx);
});

app.post('/api/atm/withdraw', (req, res) => {
  const { amount, atmId } = req.body;
  const tx = {
    id: `ATM-${Date.now()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`,
    type: 'atm',
    amount: parseFloat(amount),
    atmId,
    status: 'completed',
    createdAt: new Date().toISOString()
  };
  DB.transactions.set(tx.id, tx);
  res.json(tx);
});

app.post('/api/qr/generate', (req, res) => {
  const { userId, amount } = req.body;
  const qr = Buffer.from(JSON.stringify({ userId, amount })).toString('base64');
  res.json({ qrCode: qr, valid: true });
});

app.get('/api/transfers/:userId', (req, res) => {
  const txs = Array.from(DB.transactions.values()).slice(-50);
  res.json({ transactions: txs, count: txs.length });
});

app.get('/api/exchange-rate/:from/:to', (req, res) => {
  const rates = { 'JPY_USD': 0.0067, 'JPY_EUR': 0.0061 };
  res.json({ from: req.params.from, to: req.params.to, rate: rates[`${req.params.from}_${req.params.to}`] || 1 });
});

app.get('/api/legal/:country', (req, res) => {
  const legal = {
    japan: { company: 'TKG Holdings KK', license: 'JFSA-001' },
    usa: { company: 'TKG Financial LLC', license: 'FinCEN-MSB' }
  };
  res.json(legal[req.params.country] || { error: 'Not found' });
});

app.get('/api/external/status', (req, res) => {
  res.json({ binance: 'connected', wise: 'connected' });
});

app.get('/api/stats', (req, res) => res.json(DB.stats));

app.use((req, res) => res.status(404).json({ error: 'Not found', path: req.path }));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔════════════════════════════════════════╗
║  🏛️ TKG GLOBAL BANK - PORT ${PORT}   ║
║  💎 STATUS: OPERATIONAL              ║
╚════════════════════════════════════════╝
  `);
});
