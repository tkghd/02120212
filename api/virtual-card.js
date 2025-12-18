export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
  
  const { cardType = 'VISA', amount } = req.body || {};
  const cardNum = `4532 ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`;
  
  res.status(200).json({
    success: true,
    cardId: `VCARD-${Date.now()}`,
    cardType,
    cardNumber: cardNum,
    cvv: Math.floor(100 + Math.random() * 900),
    expiry: '12/28',
    holderName: 'TK GLOBAL OWNER',
    limit: amount || 10000000,
    status: 'ACTIVE',
    timestamp: new Date().toISOString()
  });
}
