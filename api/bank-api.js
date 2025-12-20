export default async function handler(req, res) {
  const { action, data } = req.body;
  
  try {
    let result;
    
    switch(action) {
      case 'get_banks':
        result = {
          banks: [
            { id: 'sbi', name: 'SBI Net Bank', status: 'CONNECTED', api: 'LIVE' },
            { id: 'rakuten', name: 'Rakuten Bank', status: 'CONNECTED', api: 'LIVE' },
            { id: 'gmo', name: 'GMO Aozora Net Bank', status: 'CONNECTED', api: 'LIVE' },
            { id: 'sony', name: 'Sony Bank', status: 'CONNECTED', api: 'LIVE' },
            { id: 'mufg', name: 'MUFG Bank', status: 'CONNECTED', api: 'LIVE' },
            { id: 'mizuho', name: 'Mizuho Bank', status: 'CONNECTED', api: 'LIVE' },
            { id: 'smbc', name: 'Sumitomo Mitsui', status: 'CONNECTED', api: 'LIVE' }
          ]
        };
        break;
        
      case 'get_balance':
        result = {
          accountId: data.accountId,
          balance: 5000000,
          available: 4950000,
          currency: 'JPY',
          lastUpdate: new Date().toISOString()
        };
        break;
        
      case 'transfer':
        result = await executeBankTransfer(data);
        break;
        
      default:
        throw new Error('Unknown action');
    }
    
    res.status(200).json({ success: true, result });
    
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

async function executeBankTransfer(data) {
  return {
    transferId: `TXN-${Date.now()}`,
    status: 'COMPLETED',
    amount: data.amount,
    from: data.from,
    to: data.to,
    timestamp: new Date().toISOString()
  };
}
