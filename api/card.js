module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'POST') return res.status(405).end();
  const { cardNumber, amount, merchant } = req.body;
  res.json({ success: true, service: 'Card', txId: `CD${Date.now()}`, cardLast4: cardNumber?.slice(-4), amount, merchant, status: 'authorized', timestamp: new Date().toISOString() });
};
