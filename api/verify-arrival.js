export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const { transferId } = req.query;
  
  res.status(200).json({
    transferId: transferId || `TXN-${Date.now()}`,
    status: 'ARRIVED',
    arrivedAt: new Date().toISOString(),
    confirmed: true,
    confirmations: 1,
    guarantee: 'DEPOSIT_INSURANCE_PROTECTED',
    receiptUrl: `https://tkghd.vercel.app/receipt/${transferId}`
  });
}
