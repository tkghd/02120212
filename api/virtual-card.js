export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { cardType = 'VISA', amount, purpose } = req.body || {};

  const cardNumber = `4532 ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`;
  const cvv = Math.floor(100 + Math.random() * 900);
  
  const virtualCard = {
    success: true,
    cardId: `VCARD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    cardType,
    cardNumber,
    cvv,
    expiry: '12/28',
    holderName: 'TK GLOBAL OWNER',
    limit: amount || 10000000,
    currency: 'JPY',
    status: 'ACTIVE',
    features: {
      contactless: true,
      online: true,
      international: true,
      cashback: 2.5
    },
    restrictions: {
      maxTransaction: 5000000,
      dailyLimit: 50000000,
      countries: ['GLOBAL']
    },
    virtualCardImage: `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250"><rect width="400" height="250" fill="url(#grad)"/><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:rgb(6,182,212);stop-opacity:1"/><stop offset="100%" style="stop-color:rgb(99,102,241);stop-opacity:1"/></linearGradient></defs><text x="20" y="180" fill="white" font-size="24" font-family="monospace">${cardNumber}</text></svg>`,
    timestamp: new Date().toISOString()
  };

  res.status(200).json(virtualCard);
}
