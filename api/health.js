module.exports = function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  return res.status(200).json({
    status: 'online',
    services: ['PayPay', 'Cotra', 'Bank', 'Card', 'ATM', 'Camera', 'AI'],
    timestamp: new Date().toISOString()
  });
};
