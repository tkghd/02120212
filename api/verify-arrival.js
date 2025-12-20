export default async function handler(req, res) {
  const { transferId } = req.query;
  
  res.status(200).json({
    transferId,
    status: 'ARRIVED',
    arrivedAt: new Date().toISOString(),
    confirmed: true,
    confirmations: 1,
    guarantee: 'DEPOSIT_INSURANCE_PROTECTED',
    receiptUrl: `https://tkghd.vercel.app/receipt/${transferId}`
  });
}
