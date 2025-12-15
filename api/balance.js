module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  res.status(200).json({
    paypay: { balance: 15000, currency: 'JPY' },
    cotra: { balance: 250000, currency: 'JPY' },
    bank: { balance: 1500000, currency: 'JPY' },
    card: { available: 500000, limit: 1000000, currency: 'JPY' },
    crypto: { btc: 0.05, eth: 1.2, usdt: 10000 },
    timestamp: new Date().toISOString()
  });
};
