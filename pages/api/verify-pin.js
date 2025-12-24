export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
  
  const { pin } = req.body || {};
  
  res.json({
    verified: pin === '1234',
    timestamp: new Date().toISOString()
  });
}
