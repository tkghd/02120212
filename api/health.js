module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json({ status: 'online', services: ['PayPay', 'Cotra', 'Bank', 'Card', 'ATM', 'Camera'], timestamp: new Date().toISOString() });
};
