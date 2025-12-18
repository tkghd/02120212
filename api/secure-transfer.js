export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'POST') {
    const { recipient, amount } = req.body || {};
    return res.status(200).json({
      success: true,
      recipient,
      amount,
      timestamp: new Date().toISOString()
    });
  }
  
  res.status(200).json({ status: 'ok' });
}
