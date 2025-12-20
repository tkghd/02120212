export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  
  const { 
    cardId, 
    amount, 
    merchant, 
    paymentType = 'online',
    currency = 'JPY' 
  } = req.body || {};
  
  const paymentTypes = {
    online: 'オンライン決済',
    contactless: 'タッチ決済',
    applePay: 'Apple Pay',
    googlePay: 'Google Pay',
    qr: 'QR決済'
  };
  
  res.status(200).json({
    success: true,
    paymentId: `PAY-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    cardId,
    amount,
    currency,
    merchant: merchant || '加盟店',
    paymentType: paymentTypes[paymentType] || paymentType,
    status: 'APPROVED',
    authCode: Math.floor(100000 + Math.random() * 900000),
    securityCheck: {
      secure3D: true,
      fraudDetection: 'PASS',
      riskScore: 'LOW'
    },
    timestamp: new Date().toISOString(),
    estimatedSettlement: '即時',
    receipt: {
      merchant: merchant || '加盟店',
      amount: `¥${amount.toLocaleString()}`,
      date: new Date().toLocaleString('ja-JP'),
      status: '承認済み'
    }
  });
}
