module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'POST') {
    const { recipient, amount } = req.body || {};
    return res.json({
      success: true,
      recipient,
      amount,
      timestamp: new Date().toISOString()
    });
  }

  res.json({ status: 'ok', message: 'API Ready' });
};
