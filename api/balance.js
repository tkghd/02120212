module.exports = function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  return res.status(200).json({
    paypay: { balance: 15000, currency: 'JPY' },
    cotra: { balance: 250000, currency: 'JPY' },
    bank: { balance: 1500000, currency: 'JPY' },
    card: { available: 500000, limit: 1000000, currency: 'JPY' },
    crypto: { btc: 0.05, eth: 1.2, usdt: 10000 },
    timestamp: new Date().toISOString()
  });
};
