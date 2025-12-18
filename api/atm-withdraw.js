export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { amount, currency = 'JPY', atmLocation } = req.body || {};

  if (!amount) {
    return res.status(400).json({ error: 'Amount required' });
  }

  const withdrawalCode = Math.floor(100000 + Math.random() * 900000);
  
  const atmWithdrawal = {
    success: true,
    withdrawalId: `ATM-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    amount,
    currency,
    withdrawalCode,
    qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=TKG-ATM-${withdrawalCode}`,
    instructions: [
      '1. 最寄りのATMに行く',
      '2. QRコードをスキャンまたは6桁コード入力',
      '3. 暗証番号を入力',
      '4. 現金を受け取る'
    ],
    validFor: '15分',
    expiresAt: new Date(Date.now() + 900000).toISOString(),
    nearestAtms: [
      { name: 'セブン銀行ATM', distance: '50m', address: '渋谷1-1-1' },
      { name: 'ローソン銀行ATM', distance: '120m', address: '渋谷2-3-4' },
      { name: 'イオン銀行ATM', distance: '200m', address: '渋谷3-5-6' }
    ],
    fee: 110,
    status: 'READY',
    timestamp: new Date().toISOString()
  };

  res.status(200).json(atmWithdrawal);
}
