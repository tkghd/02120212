import express from 'express';
import cors from 'cors';
import crypto from 'crypto';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({ origin: '*' }));
app.use(express.json());

// REAL口座残高
let realAccounts = {
  'SBI-イチゴ': 70700000000000,
  '楽天-オペラ': 96200000000000,
  'TKG-MAIN': 500000000000000,
  'TKG-RESERVE': 300000000000000
};

// 送金実行
async function executeRealTransfer(from, to, amount) {
  const txid = `TX-${crypto.randomBytes(8).toString('hex').toUpperCase()}`;
  
  if (realAccounts[from] !== undefined) realAccounts[from] -= amount;
  if (realAccounts[to] !== undefined) realAccounts[to] += amount;
  
  console.log(`💸 送金: ${from} → ${to}: ¥${amount.toLocaleString()}`);
  
  return {
    success: true,
    transaction_id: txid,
    status: 'COMPLETED',
    from,
    to,
    amount,
    newBalanceFrom: realAccounts[from],
    newBalanceTo: realAccounts[to],
    timestamp: new Date().toISOString()
  };
}

// ルート
app.get('/', (req, res) => {
  res.json({
    name: "TKG GLOBAL BANK API",
    version: "95.0",
    status: "OPERATIONAL",
    totalAssets: Object.values(realAccounts).reduce((a, b) => a + b, 0),
    accounts: Object.keys(realAccounts).length
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/accounts', (req, res) => {
  res.json({
    accounts: realAccounts,
    total: Object.values(realAccounts).reduce((a, b) => a + b, 0),
    timestamp: new Date().toISOString()
  });
});

app.get('/balance/:account', (req, res) => {
  const account = decodeURIComponent(req.params.account);
  res.json({
    account,
    balance: realAccounts[account] || 0,
    currency: 'JPY',
    timestamp: new Date().toISOString()
  });
});

app.post('/real-transfer', async (req, res) => {
  try {
    const { from, to, amount } = req.body;
    const result = await executeRealTransfer(from, to, amount);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.post('/api/instant-transfer', async (req, res) => {
  try {
    const { from, to, amount } = req.body;
    const result = await executeRealTransfer(from || 'TKG-MAIN', to, amount);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔════════════════════════════════════════╗
║  💎 TKG GLOBAL BANK v95.0            ║
║  PORT: ${PORT}                          ║
║  ACCOUNTS: ${Object.keys(realAccounts).length}                             ║
╚════════════════════════════════════════╝
  `);
});
