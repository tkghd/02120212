export default module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'POST') return res.status(405).end();
  const { bankName, accountNumber, amount, recipientName } = req.body;
  res.json({ success: true, service: 'Bank', txId: `BK${Date.now()}`, bankName, accountNumber, amount, recipientName, status: 'pending', timestamp: new Date().toISOString() });
};
