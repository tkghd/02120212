import express from 'express';
import cors from 'cors';
import unifiedApiRouter from './routes/unified-api.js';
import zenginRouter from './routes/zengin.js';
import realMoneyRouter from './routes/real-money.js';

const app = express();
const PORT = process.env.PORT || 3000;

// ミドルウェア
app.use(cors());
app.use(express.json());

// ルート
app.use('/api', unifiedApiRouter);
app.use('/api/zengin', zenginRouter);
app.use('/api/real-money', realMoneyRouter);

// ヘルスチェック
app.get('/', (req, res) => {
  res.json({
    name: 'TK Global Bank API',
    version: '2.0.0',
    status: 'ONLINE',
    endpoints: {
      zengin: '/api/zengin/*',
      realMoney: '/api/real-money/*',
      wallet: '/api/wallet/*',
      atm: '/api/atm/*',
      realTransfer: '/api/real-transfer/*',
      nft: '/api/nft/*',
      crypto: '/api/crypto/*',
      ai: '/api/ai/*',
      license: '/api/license/*',
      system: '/api/system/status'
    },
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 TK Global Bank API running on port ${PORT}`);
  console.log(`✅ All modules integrated and ready`);
});
