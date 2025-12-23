import express from 'express';
const router = express.Router();

router.get('/owner-assets', (req, res) => {
  res.json({
    totalAssets: 100000000000000,
    currency: 'JPY',
    breakdown: {
      cash: 50000000000000,
      securities: 30000000000000,
      realEstate: 15000000000000,
      crypto: 5000000000000
    },
    dailyProfit: 10000000000,
    timestamp: new Date().toISOString()
  });
});

router.get('/corporate-assets', (req, res) => {
  res.json({
    totalAssets: 50000000000000,
    currency: 'JPY',
    entities: [
      { name: 'TK Global Bank', value: 30000000000000 },
      { name: 'TK Investment Fund', value: 20000000000000 }
    ],
    dailyRevenue: 10000000000,
    timestamp: new Date().toISOString()
  });
});

router.get('/daily-profit', (req, res) => {
  res.json({
    date: new Date().toISOString().split('T')[0],
    profit: 10000000000,
    currency: 'JPY',
    sources: {
      trading: 5000000000,
      lending: 3000000000,
      fees: 2000000000
    },
    timestamp: new Date().toISOString()
  });
});

export default router;
