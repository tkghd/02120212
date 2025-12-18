// Test endpoint for transfer functionality
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'ok',
      message: 'Transfer Test API is running',
      timestamp: new Date().toISOString()
    });
  }

  if (req.method === 'POST') {
    const { recipient, amount } = req.body;
    
    return res.status(200).json({
      success: true,
      testMode: true,
      recipient,
      amount,
      timestamp: new Date().toISOString(),
      message: 'This is a test response'
    });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
