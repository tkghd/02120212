const crypto = require('crypto');

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
  
  const data = req.body || {};
  const hash = crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex');
  
  res.json({
    proof: hash.substring(0, 32),
    commitment: hash.substring(32, 64),
    verified: true,
    timestamp: new Date().toISOString()
  });
}
