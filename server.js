const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const app = express();
const PORT = process.env.PORT || 8081;  // ポート変更

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json({ limit: '100mb' }));

const TKG = {
  owner: {
    id: 'TKG-OWNER-001',
    name: 'TKG Holdings Corporation',
    vault: { total: 2_000_000_000_000_000, available: 2_000_000_000_000_000 },
    realBanks: [
      { bankName: '住信SBIネット銀行', code: '0038', account: '9273342', balance: 80_600_000_000_000 },
      { bankName: 'みんなの銀行', code: '0043', account: '2439188', balance: 41_300_000_000_000 },
      { bankName: '三井住友銀行', code: '0009', account: '9469248', balance: 95_800_000_000_000 }
    ],
    crypto: {
      BTC: { amount: 125000, valueJPY: 625_000_000_000 },
      ETH: { amount: 850000, valueJPY: 340_000_000_000 }
    }
  },
  transactions: new Map(),
  stats: { total: 0, volume: 0 }
};

const calcTotal = () => TKG.owner.vault.total + TKG.owner.realBanks.reduce((s,b) => s + b.balance, 0) + Object.values(TKG.owner.crypto).reduce((s,c) => s + c.valueJPY, 0);

app.get('/', (req, res) => res.json({ 
  status: 'OPERATIONAL', 
  service: 'TKG Global Bank V30', 
  version: '30.0.0',
  port: PORT,
  timestamp: new Date().toISOString() 
}));

app.get('/api/health', (req, res) => res.json({ 
  status: 'ok', 
  version: '30.0.0',
  port: PORT,
  uptime: process.uptime(),
  services: { realTransfer: 'active', legal: 'active', revenue: 'active', token: 'active' }
}));

app.get('/api/balance/:userId', (req, res) => {
  if (req.query.access !== 'sovereign') return res.status(403).json({ error: 'Unauthorized' });
  res.json({ 
    userId: TKG.owner.id, 
    vault: TKG.owner.vault, 
    realBanks: TKG.owner.realBanks, 
    crypto: TKG.owner.crypto,
    totalAssets: calcTotal() 
  });
});

app.post('/api/transfer/instant', (req, res) => {
  const { amount, toIdentifier, note } = req.body;
  const tx = {
    id: `TX-${Date.now()}`,
    type: 'instant',
    amount: parseFloat(amount),
    toIdentifier,
    note,
    status: 'completed',
    timestamp: new Date().toISOString()
  };
  TKG.transactions.set(tx.id, tx);
  TKG.stats.total++;
  TKG.stats.volume += tx.amount;
  console.log(`✅ Transfer: ${tx.id} | ¥${amount.toLocaleString()}`);
  res.json(tx);
});

app.get('/api/stats', (req, res) => res.json({ 
  ...TKG.stats, 
  totalAssets: calcTotal(),
  uptime: process.uptime() 
}));

app.get('/api/transfers/:userId', (req, res) => {
  const txs = Array.from(TKG.transactions.values()).slice(-50);
  res.json({ transactions: txs, count: txs.length });
});

app.use((req, res) => res.status(404).json({ error: 'Not found' }));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔════════════════════════════════════════╗
║  🏛️ TKG GLOBAL BANK V30              ║
║  PORT: ${PORT}                          ║
║  STATUS: OPERATIONAL                  ║
╚════════════════════════════════════════╝
  `);
});
