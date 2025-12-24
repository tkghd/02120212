export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { type, to, amount, currency = 'JPY' } = req.body || {};

  res.json({
    success: true,
    transactionId: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type: type || 'domestic',
    to,
    amount,
    currency,
    status: 'completed',
    timestamp: new Date().toISOString(),
    fee: 0,
    estimatedTime: '即時'
  });
}
