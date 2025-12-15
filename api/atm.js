export default module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'POST') return res.status(405).end();
  const { amount, atmId, location } = req.body;
  res.json({ success: true, service: 'ATM', txId: `ATM${Date.now()}`, amount, atmId, location, authCode: Math.random().toString(36).substr(2, 8).toUpperCase(), status: 'approved', timestamp: new Date().toISOString() });
};
