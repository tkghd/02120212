export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  const { amount, fromBank, toBank, recipient, accountNumber } = req.body || {};
  
  res.status(200).json({
    success: true,
    transferId: `TXN-${Date.now()}`,
    timestamp: new Date().toISOString(),
    from: {
      bank: fromBank || 'SBI Net Bank',
      balance: 5000000,
      balanceAfter: 5000000 - (amount || 0)
    },
    to: {
      bank: toBank || 'Rakuten Bank',
      accountNumber: accountNumber || '1234567',
      recipient: recipient || 'Test User'
    },
    transaction: {
      amount: amount || 0,
      currency: 'JPY',
      fee: Math.round((amount || 0) * 0.001),
      type: 'BANK_TRANSFER',
      status: 'COMPLETED',
      confirmationCode: `CONF-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      executionTime: '1.2s',
      method: 'REAL_TIME_GROSS_SETTLEMENT'
    },
    provider: {
      name: 'Zengin System',
      network: 'Japan Banking Network',
      guarantee: 'FULL_DEPOSIT_INSURANCE'
    },
    guarantee: {
      status: 'GUARANTEED',
      expectedArrival: new Date(Date.now() + 60000).toISOString(),
      insurance: 'Up to ¥10,000,000 per account'
    }
  });
}
