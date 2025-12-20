export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  
  const { cardType = 'VISA', amount = 50000000, purpose, cardCount = 1 } = req.body || {};
  
  // 複数枚発行（最大5枚）
  const maxCards = Math.min(cardCount, 5);
  const cards = [];
  
  for (let i = 0; i < maxCards; i++) {
    const cardNumber = `4532 ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`;
    
    cards.push({
      cardId: `VCARD-${Date.now()}-${i + 1}`,
      cardType,
      cardNumber,
      cvv: Math.floor(100 + Math.random() * 900),
      expiry: '12/28',
      holderName: 'TK GLOBAL OWNER',
      limit: amount || 50000000, // デフォルト5000万円
      purpose: purpose || 'バーチャル決済',
      status: 'ACTIVE',
      features: [
        'Apple Pay連動',
        'Google Pay対応',
        'タッチ決済可能',
        'オンライン決済',
        'セキュア3D認証'
      ],
      virtualPayment: true,
      timestamp: new Date().toISOString()
    });
  }
  
  res.status(200).json({
    success: true,
    totalCards: cards.length,
    totalLimit: cards.reduce((sum, card) => sum + card.limit, 0),
    cards,
    message: `${cards.length}枚のカードを発行しました`
  });
}
