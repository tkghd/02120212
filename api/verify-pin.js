export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
  
  const { pin } = req.body || {};
  const TRANSFER_PIN = process.env.TRANSFER_PIN || '1234';
  
  res.json({
    verified: pin === TRANSFER_PIN,
    timestamp: new Date().toISOString()
  });
}
