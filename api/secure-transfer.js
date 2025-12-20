module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'POST') {
    const { recipient, amount } = req.body || {};
    return res.json({
      success: true,
      transactionId: `TX-${Date.now()}`,
      recipient,
      amount,
      timestamp: new Date().toISOString()
    });
  }

  res.json({ status: 'ok', message: 'Secure Transfer API' });
};
