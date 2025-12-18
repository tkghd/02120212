export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { qrData, cameraImage, action } = req.body || {};

  const scanResult = {
    success: true,
    scanned: true,
    qrType: 'PAYMENT_REQUEST',
    decodedData: {
      merchant: 'TK Global Store',
      amount: 15000,
      currency: 'JPY',
      reference: `PAY-${Date.now()}`,
      validUntil: new Date(Date.now() + 300000).toISOString()
    },
    faceRecognition: {
      verified: true,
      confidence: 99.8,
      userId: 'OWNER-1190212',
      biometricMatch: true
    },
    actions: ['Pay Now', 'Save', 'Deny'],
    securityLevel: 'MAXIMUM',
    timestamp: new Date().toISOString()
  };

  res.status(200).json(scanResult);
}
