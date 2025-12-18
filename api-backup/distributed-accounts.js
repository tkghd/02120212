export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { page = 1, limit = 10 } = req.query;
  
  const accounts = Array.from({ length: parseInt(limit) }, (_, i) => ({
    id: (page - 1) * limit + i + 1,
    bank: ['住信SBI', 'みんな銀行', '三井住友'][i % 3],
    balance: Math.floor(Math.random() * 90000000000000) + 10000000000000,
    currency: 'JPY',
    status: 'ACTIVE'
  }));
  
  res.status(200).json({
    page: parseInt(page),
    limit: parseInt(limit),
    total: 350,
    accounts,
    timestamp: new Date().toISOString()
  });
}
