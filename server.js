import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));
app.use(express.json());

// ヘルスチェック
app.get('/', (req, res) => {
  res.json({ 
    status: 'OPERATIONAL',
    version: '7.0.0',
    message: 'TK Global Bank - Ultimate System',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', uptime: process.uptime() });
});

// オーナー資産
app.get('/api/owner/vault/full', (req, res) => {
  res.json({
    success: true,
    totalAssets: '¥162京5,000兆円',
    accounts: 350,
    tokens: 20
  });
});

// 既存API
app.get('/api/balance', (req, res) => {
  res.json({ success: true, balance: 1500000 });
});

app.post('/api/withdraw', (req, res) => {
  const { amount } = req.body;
  res.json({ success: true, balance: 1500000 - amount, message: `${amount}円引き出し完了` });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
