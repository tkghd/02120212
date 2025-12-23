import express from 'express';
import cors from 'cors';
import completeSystemRouter from './routes/complete-system.js';
import unifiedApiRouter from './routes/unified-api.js';
import zenginRouter from './routes/zengin.js';
import realMoneyRouter from './routes/real-money.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));
app.use(express.json());

// 全ルート統合
app.use('/api', completeSystemRouter);
app.use('/api', unifiedApiRouter);
app.use('/api/zengin', zenginRouter);
app.use('/api/real-money', realMoneyRouter);

app.get('/', (req, res) => {
  res.json({
    name: 'TK Global Bank - Complete Financial Platform',
    version: '3.0.0',
    status: 'ALL SYSTEMS ONLINE',
    modules: {
      financial: ['license', 'account', 'global', 'corporate', 'revenue'],
      payment: ['zengin', 'realMoney', 'wallet', 'atm', 'cards'],
      advanced: ['nft', 'crypto', 'ai', 'analytics'],
      compliance: ['kyc', 'aml', 'audit', 'legal']
    },
    ai: {
      model: 'claude-sonnet-4',
      capabilities: ['chat', 'analysis', 'automation']
    },
    endpoints: {
      license: '/api/license/*',
      account: '/api/account/*',
      global: '/api/global/*',
      corporate: '/api/corporate/*',
      revenue: '/api/revenue/*',
      system: '/api/system/*',
      ai: '/api/ai/*',
      apiKeys: '/api/api-keys/*'
    }
  });
});

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║     🌐 TK Global Bank API - PRODUCTION                   ║
║     Port: ${PORT}                                           ║
║     Status: ALL SYSTEMS ONLINE                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
});
