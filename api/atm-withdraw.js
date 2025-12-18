export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
  
  const { amount, currency = 'JPY' } = req.body || {};
  const code = Math.floor(100000 + Math.random() * 900000);
  
  res.status(200).json({
    success: true,
    withdrawalId: `ATM-${Date.now()}`,
    amount,
    currency,
    withdrawalCode: code,
    qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=TKG-ATM-${code}`,
    validFor: '15分',
    nearestAtms: [
      { name: 'セブン銀行ATM', distance: '50m' },
      { name: 'ローソン銀行ATM', distance: '120m' }
    ],
    status: 'READY',
    timestamp: new Date().toISOString()
  });
}
