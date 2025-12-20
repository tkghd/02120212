export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  
  const { amount, currency = 'JPY', atmType = 'auto', cameraVerified = false } = req.body || {};
  const code = Math.floor(100000 + Math.random() * 900000);
  
  // ATM別の手数料と利便性
  const atmNetworks = {
    seven: {
      name: 'セブン銀行ATM',
      fee: 0,
      distance: '50m',
      hours: '24時間',
      camera: true,
      features: ['顔認証', 'QRコード', 'スマホATM']
    },
    lawson: {
      name: 'ローソン銀行ATM',
      fee: 0,
      distance: '120m',
      hours: '24時間',
      camera: true,
      features: ['QRコード', 'タッチ決済', 'マルチ通貨']
    },
    familymart: {
      name: 'ファミリーマートATM',
      fee: 110,
      distance: '200m',
      hours: '6:00-23:00',
      camera: false,
      features: ['QRコード']
    }
  };
  
  res.status(200).json({
    success: true,
    withdrawalId: `ATM-${Date.now()}`,
    amount,
    currency,
    withdrawalCode: code,
    qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=TKG-ATM-${code}`,
    validFor: '15分',
    cameraVerified,
    nearestAtms: Object.values(atmNetworks),
    instructions: [
      '1. 最寄りのATMに向かう',
      '2. カメラで顔認証 または QRコード提示',
      '3. 出金コードを入力: ' + code,
      '4. 金額を確認して出金'
    ],
    securityFeatures: {
      faceRecognition: cameraVerified,
      qrCodeAuth: true,
      timeLimit: '15分',
      oneTimeCode: true
    },
    status: 'READY',
    timestamp: new Date().toISOString()
  });
}
