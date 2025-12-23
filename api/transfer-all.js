export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { type, to, amount, currency = 'JPY' } = req.body || {};

  const transferTypes = {
    domestic: { name: '国内銀行送金', fee: amount * 0.001, time: '即時' },
    international: { name: '国際送金', fee: amount * 0.03, time: '1-3営業日' },
    crypto: { name: '暗号通貨送金', fee: amount * 0.005, time: '5-15分' },
    paypay: { name: 'PayPay送金', fee: 0, time: '即時' }
  };

  const transfer = transferTypes[type] || transferTypes.domestic;

  res.json({
    success: true,
    transactionId: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type: transfer.name,
    to,
    amount,
    currency,
    status: 'completed',
    timestamp: new Date().toISOString(),
    fee: transfer.fee,
    estimatedTime: transfer.time
  });
}
