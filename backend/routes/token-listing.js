import express from 'express';
const router = express.Router();

router.get('/tkg-token', (req, res) => {
  res.json({
    symbol: 'TKG',
    name: 'TK Global Token',
    totalSupply: 1000000000,
    circulatingSupply: 500000000,
    price: 10.5,
    currency: 'USD',
    marketCap: 5250000000,
    listed: true,
    exchanges: ['BINANCE', 'COINBASE', 'KRAKEN'],
    timestamp: new Date().toISOString()
  });
});

router.post('/list-token', async (req, res) => {
  const { exchange, symbol } = req.body;
  res.json({
    success: true,
    listingId: `LIST_${Date.now()}`,
    exchange,
    symbol,
    status: 'APPROVED',
    listingDate: new Date(Date.now() + 86400000).toISOString(),
    timestamp: new Date().toISOString()
  });
});

export default router;
