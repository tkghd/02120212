export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  
  const { qrData, action = 'verify', location } = req.body || {};
  
  const actions = {
    verify: {
      type: 'ATM認証',
      result: 'SUCCESS',
      message: '顔認証が完了しました',
      nextStep: '出金コードを入力してください'
    },
    payment: {
      type: '決済認証',
      result: 'APPROVED',
      message: '決済が承認されました',
      amount: Math.floor(Math.random() * 100000)
    },
    login: {
      type: 'ログイン認証',
      result: 'SUCCESS',
      message: 'ログインしました',
      token: `TOKEN-${Date.now()}`
    }
  };
  
  res.status(200).json({
    success: true,
    scanId: `SCAN-${Date.now()}`,
    qrData,
    action: actions[action] || actions.verify,
    cameraVerified: true,
    faceRecognition: {
      detected: true,
      confidence: 0.98,
      liveness: true
    },
    location: location || 'セブン銀行ATM',
    timestamp: new Date().toISOString()
  });
}
