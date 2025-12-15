export default module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'POST') return res.status(405).end();
  const { qrData, amount, method, faceData } = req.body;
  res.json({ success: true, service: faceData ? 'FaceAuth' : 'QRScan', txId: `QR${Date.now()}`, qrData, amount, method, authenticated: true, status: 'authorized', timestamp: new Date().toISOString() });
};
