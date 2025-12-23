import express from 'express';
import cors from 'cors';
import realTransferRouter from './routes/real-transfer.js';
import legalLicenseRouter from './routes/legal-license.js';
import revenueAssetsRouter from './routes/revenue-assets.js';
import tokenListingRouter from './routes/token-listing.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// ルーター登録
app.use('/api/real-transfer', realTransferRouter);
app.use('/api/legal', legalLicenseRouter);
app.use('/api/revenue', revenueAssetsRouter);
app.use('/api/token', tokenListingRouter);

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    services: {
      realTransfer: 'active',
      legal: 'active',
      revenue: 'active',
      token: 'active'
    },
    timestamp: new Date().toISOString()
  });
});

// Root
app.get('/', (req, res) => {
  res.json({
    service: 'TK Global Bank - Complete API',
    version: '3.0.0',
    features: [
      'REAL Transfer (Bank/PayPay/Card/ATM/CVS)',
      'Legal & Licensing',
      'Revenue & Assets (¥100億/日)',
      'Token Listing (TKG)',
      'International Banking API'
    ],
    endpoints: {
      realTransfer: '/api/real-transfer/*',
      legal: '/api/legal/*',
      revenue: '/api/revenue/*',
      token: '/api/token/*'
    }
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found', path: req.path });
});

// Start
app.listen(PORT, () => {
  console.log(`🔥 TK Global Bank API - Port ${PORT}`);
  console.log(`💰 Daily Profit: ¥100億`);
  console.log(`🌐 REAL Transfer: ENABLED`);
  console.log(`⚖️ Legal Licenses: ACTIVE`);
  console.log(`🪙 TKG Token: LISTED`);
});
