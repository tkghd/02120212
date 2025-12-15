export default module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'POST') return res.status(405).end();
  const { to, amount, currency } = req.body;
  res.json({ success: true, service: 'Cotra', txId: `CT${Date.now()}`, to, amount, currency, status: 'completed', timestamp: new Date().toISOString() });
};
