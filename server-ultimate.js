const express = require('express');
const http = require('http');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 8080;

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json({ limit: '200mb' }));
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

const ULTIMATE_DB = {
  owner: {
    id: 'TKG-OWNER-001',
    name: 'TKG Bank Supreme Owner',
    email: 'owner@tkghd.global',
    vault: 2_000_000_000_000_000,
    realBanks: [
      { bank: '住信SBIネット銀行', code: '0038', account: '9273342', balance: 80_600_000_000_000 },
      { bank: 'みんなの銀行', code: '0043', account: '2439188', balance: 41_300_000_000_000 },
      { bank: '三井住友銀行', code: '0009', account: '9469248', balance: 95_800_000_000_000 },
      { bank: '楽天銀行', code: '0036', account: '7654321', balance: 30_000_000_000_000 },
      { bank: 'PayPay銀行', code: '0033', account: '1122334', balance: 20_000_000_000_000 },
      { bank: 'ゆうちょ銀行', code: '9900', account: '12345678', balance: 50_000_000_000_000 }
    ],
    crypto: {
      BTC: 125_000.5432, ETH: 850_000.234, USDT: 50_000_000,
      USDC: 45_000_000, BNB: 25_000, SOL: 100_000, XRP: 500_000_000, ADA: 200_000_000
    }
  },
  transactions: new Map(),
  blockchainLog: [],
  stats: { totalTransfers: 0, totalAmount: 0, totalFees: 0, byType: {} }
};

function addToBlockchain(tx) {
  const block = {
    index: ULTIMATE_DB.blockchainLog.length,
    timestamp: Date.now(),
    transaction: tx,
    hash: crypto.createHash('sha256').update(JSON.stringify(tx)).digest('hex')
  };
  ULTIMATE_DB.blockchainLog.push(block);
  return block;
}

app.get('/', (req, res) => res.json({
  status: '💎 IMMORTAL_MODE_OPERATIONAL',
  service: 'TKG Ultimate Transfer System',
  version: '5.0.0',
  motto: '国家レベル金融OS',
  features: { instant: true, bank: true, crypto: true, international: true, atm: true, blockchain: true }
}));

app.get('/api/health', (req, res) => res.json({
  healthy: true, uptime: process.uptime(), memory: process.memoryUsage()
}));

app.get('/api/balance/:userId', (req, res) => res.json({
  userId: ULTIMATE_DB.owner.id,
  totalVault: ULTIMATE_DB.owner.vault,
  realBanks: ULTIMATE_DB.owner.realBanks,
  crypto: ULTIMATE_DB.owner.crypto
}));

app.post('/api/transfer/instant', (req, res) => {
  const { fromUserId, toIdentifier, amount, note } = req.body;
  const tx = {
    id: `TX-${Date.now()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`,
    type: 'instant', fromUserId, toIdentifier, amount: parseFloat(amount), note,
    status: 'completed', createdAt: new Date().toISOString()
  };
  ULTIMATE_DB.transactions.set(tx.id, tx);
  addToBlockchain(tx);
  ULTIMATE_DB.stats.totalTransfers++;
  res.json(tx);
});

app.post('/api/transfer/bank', (req, res) => {
  const { fromAccountId, toBankCode, toAccountNumber, toAccountName, amount } = req.body;
  const tx = {
    id: `BANK-${Date.now()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`,
    type: 'bank', toBankCode, toAccountNumber, toAccountName, amount: parseFloat(amount),
    status: 'completed', createdAt: new Date().toISOString()
  };
  ULTIMATE_DB.transactions.set(tx.id, tx);
  addToBlockchain(tx);
  res.json(tx);
});

app.post('/api/transfer/crypto', (req, res) => {
  const { fromUserId, toAddress, amount, currency } = req.body;
  const tx = {
    id: `CRYPTO-${Date.now()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`,
    type: 'crypto', toAddress, amount: parseFloat(amount), currency,
    txHash: `0x${crypto.randomBytes(32).toString('hex')}`,
    status: 'completed', createdAt: new Date().toISOString()
  };
  ULTIMATE_DB.transactions.set(tx.id, tx);
  addToBlockchain(tx);
  res.json(tx);
});

app.get('/api/transfers/:userId', (req, res) => {
  const txs = Array.from(ULTIMATE_DB.transactions.values()).slice(-100);
  res.json({ transactions: txs, count: txs.length });
});

app.get('/api/blockchain', (req, res) => res.json({
  blocks: ULTIMATE_DB.blockchainLog.slice(-10),
  totalBlocks: ULTIMATE_DB.blockchainLog.length
}));

app.get('/api/stats', (req, res) => res.json(ULTIMATE_DB.stats));

app.get('/api/endpoints', (req, res) => res.json({
  total: 10,
  endpoints: ['/', '/api/health', '/api/balance/:userId', '/api/transfer/instant',
    '/api/transfer/bank', '/api/transfer/crypto', '/api/transfers/:userId',
    '/api/blockchain', '/api/stats', '/api/endpoints']
}));

app.use((req, res) => res.status(404).json({ error: 'Not found', path: req.path }));

server.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔═══════════════════════════════════════════════════════════════╗
║         🏛️  TKG ULTIMATE SYSTEM v5.0 - IMMORTAL MODE        ║
║         💎 Port: ${PORT} | Status: OPERATIONAL 💎           ║
╚═══════════════════════════════════════════════════════════════╝
  `);
});
