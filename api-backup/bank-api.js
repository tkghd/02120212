export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  const { action, data } = req.body || {};
  
  const banks = [
    { id: 'sbi', name: 'SBI Net Bank', status: 'CONNECTED', api: 'LIVE' },
    { id: 'rakuten', name: 'Rakuten Bank', status: 'CONNECTED', api: 'LIVE' },
    { id: 'gmo', name: 'GMO Aozora Net Bank', status: 'CONNECTED', api: 'LIVE' },
    { id: 'mufg', name: 'MUFG Bank', status: 'CONNECTED', api: 'LIVE' },
    { id: 'mizuho', name: 'Mizuho Bank', status: 'CONNECTED', api: 'LIVE' },
    { id: 'smbc', name: 'Sumitomo Mitsui', status: 'CONNECTED', api: 'LIVE' }
  ];
  
  res.status(200).json({
    success: true,
    action: action || 'get_banks',
    result: action === 'get_banks' ? { banks } : {
      accountId: data?.accountId || 'default',
      balance: 5000000,
      available: 4950000,
      currency: 'JPY'
    }
  });
}
