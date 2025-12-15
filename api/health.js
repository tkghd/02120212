export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json({ 
    status: 'online', 
    services: ['PayPay', 'Cotra', 'Bank', 'Card', 'ATM', 'Camera', 'AI'], 
    timestamp: new Date().toISOString() 
  });
}
