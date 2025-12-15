export default module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'POST') return res.status(405).end();
  const { to, amount, message } = req.body;
  res.json({ success: true, service: 'PayPay', txId: `PP${Date.now()}`, to, amount, message, status: 'completed', timestamp: new Date().toISOString() });
};
