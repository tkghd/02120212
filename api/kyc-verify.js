export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  
  const { 
    name, 
    birthDate, 
    address, 
    idDocument,  // 身分証明書
    bankAccount  // 銀行口座情報
  } = req.body || {};
  
  // 本番では eKYC サービス（Liquid、TRUSTDOCKなど）と連携
  
  return res.status(200).json({
    verified: false,
    status: 'DEMO_MODE',
    message: 'KYC実装には eKYC サービス連携が必要です',
    required: {
      service: 'Liquid eKYC または TRUSTDOCK',
      documents: ['本人確認書類', '銀行口座確認', 'マイナンバー']
    },
    timestamp: new Date().toISOString()
  });
}
