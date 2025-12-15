module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  res.status(200).json({
    status: 'online',
    services: ['PayPay', 'Cotra', 'Bank', 'Card', 'ATM', 'Camera', 'AI'],
    timestamp: new Date().toISOString()
  });
};
