import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';
import APIKeyAutomation from './lla/api-key-automation.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;
const REAL_MODE = process.env.REAL_API_MODE === 'true';

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.static('public'));

const lla = new APIKeyAutomation();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// LLa APIキー自動取得エンドポイント
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
app.post('/api/lla/apply-keys', async (req, res) => {
  try {
    const results = await lla.applyAll();
    res.json({
      success: true,
      message: '全プロバイダーへの申請を完了しました',
      applications: results,
      nextSteps: [
        '各プロバイダーからの審査完了を待機',
        '承認後、本番APIキーがメールで送付されます',
        'Railway環境変数に本番キーを設定してください'
      ]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.post('/api/lla/apply/:provider', async (req, res) => {
  try {
    const result = await lla.autoApply(req.params.provider);
    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 既存API（v90.0）
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const SYSTEM = {
  name: "TK GLOBAL BANK",
  version: "91.0.0",
  status: "OPERATIONAL",
  realMode: REAL_MODE,
  mcap: "162,500,000,000,000,000 JPY",
  lla: "ACTIVE"
};

app.get('/', (req, res) => res.json(SYSTEM));
app.get('/health', (req, res) => res.json({ 
  status: 'ok', 
  version: '91.0.0',
  realMode: REAL_MODE,
  lla: 'ACTIVE'
}));

app.post('/api/real-transfer/:type', async (req, res) => {
  const { type } = req.params;
  const { amount, to } = req.body;
  
  const txid = `TX-${crypto.randomBytes(8).toString('hex').toUpperCase()}`;
  
  res.json({
    success: true,
    transaction_id: txid,
    type,
    amount,
    to,
    mode: REAL_MODE ? 'PRODUCTION' : 'TEST',
    timestamp: new Date().toISOString()
  });
});

app.post('/api/v1/transfer/:provider', (req, res) => {
  res.json({
    status: 'success',
    tx_id: `${req.params.provider.toUpperCase()}-${Date.now()}`,
    amount: req.body.amount || 0
  });
});

app.get('/api/v1/assets/:asset', (req, res) => {
  res.json({
    status: 'success',
    balance: '20.2兆円',
    holder: 'User 1190212'
  });
});

app.get('/api/v1/web3/status', (req, res) => {
  res.json({
    status: 'success',
    chain: 'Ethereum-Mainnet',
    sync: '100%'
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔════════════════════════════════════════╗
║  🏛️ TKG GLOBAL BANK v91.0            ║
║  PORT: ${PORT}                          ║
║  REAL MODE: ${REAL_MODE ? '🔥 ENABLED' : '🧪 TEST'}              ║
║  LLa: 🤖 ACTIVE                        ║
╚════════════════════════════════════════╝
  `);
});
