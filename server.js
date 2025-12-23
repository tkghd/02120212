const express = require('express');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({ origin: '*' }));
app.use(express.json());

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
  transactions: new Map()
};

// Routes
app.get('/', (req, res) => res.json({ 
  status: 'OPERATIONAL', 
  version: '6.0',
  service: 'TKG Global Bank'
}));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.get('/api/balance/:userId', (req, res) => res.json(DB.owner));

app.post('/api/transfer/instant', (req, res) => {
  const tx = {
    id: `TX-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`,
    ...req.body,
    status: 'completed',
    timestamp: new Date().toISOString()
  };
  DB.transactions.set(tx.id, tx);
  console.log(`✅ ${tx.id}`);
  res.json(tx);
});

app.post('/api/transfer/bank', (req, res) => {
  const tx = {
    id: `BANK-${Date.now()}`,
    ...req.body,
    status: 'completed',
    timestamp: new Date().toISOString()
  };
  DB.transactions.set(tx.id, tx);
  res.json(tx);
});

app.post('/api/transfer/crypto', (req, res) => {
  const tx = {
    id: `CRYPTO-${Date.now()}`,
    ...req.body,
    txHash: `0x${crypto.randomBytes(32).toString('hex')}`,
    status: 'completed',
    timestamp: new Date().toISOString()
  };
  DB.transactions.set(tx.id, tx);
  res.json(tx);
});

app.get('/api/transfers/:userId', (req, res) => {
  const txs = Array.from(DB.transactions.values()).slice(-50);
  res.json({ transactions: txs, count: txs.length });
});

app.get('/api/stats', (req, res) => res.json({ 
  total: DB.transactions.size,
  uptime: process.uptime()
}));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔════════════════════════════════════════╗
║  🏛️ TKG GLOBAL BANK - PORT ${PORT}    ║
║  ✅ STATUS: OPERATIONAL               ║
╚════════════════════════════════════════╝
  `);
});
