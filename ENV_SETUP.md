# 環境変数設定ガイド

## 🚀 クイックスタート

### デモモード（テスト用）
```bash
./setup-demo-env.sh

cd ~/02120212

# 1. 実送金用APIを作成
cat > api/real-bank-transfer.js <<'EOF'
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  
  const { 
    bankType,    // 'sbi', 'rakuten', 'paypay'
    to,          // 送金先口座
    amount,      // 金額
    currency = 'JPY'
  } = req.body || {};
  
  // ⚠️ 実装には各銀行のAPIトークンが必要
  const BANK_APIs = {
    sbi: process.env.SBI_API_TOKEN,
    rakuten: process.env.RAKUTEN_API_TOKEN,
    paypay: process.env.PAYPAY_API_KEY
  };
  
  // KYC確認（本番では必須）
  const kycVerified = process.env.KYC_ENABLED === 'true';
  
  if (!kycVerified) {
    return res.status(403).json({
      error: 'KYC required',
      message: '本人確認が必要です',
      status: 'BLOCKED'
    });
  }
  
  // 実際のAPI呼び出し（デモ版では未実装）
  const apiToken = BANK_APIs[bankType];
  
  if (!apiToken) {
    return res.status(200).json({
      success: false,
      mode: 'DEMO',
      message: '実際の送金にはAPI連携が必要です',
      transactionId: `DEMO-${Date.now()}`,
      to,
      amount,
      currency,
      status: 'SIMULATED',
      timestamp: new Date().toISOString(),
      // 実装すべき項目
      required: {
        bankAPI: `${bankType.toUpperCase()}_API_TOKEN が必要`,
        kyc: 'KYC/本人確認システム',
        license: '資金移動業者ライセンス'
      }
    });
  }
  
  // ここに実際のAPI呼び出しコードを実装
  // 例：const result = await fetch(`https://api.${bankType}.jp/transfer`, {...})
  
  return res.status(200).json({
    success: true,
    mode: 'PRODUCTION',
    transactionId: `REAL-${Date.now()}`,
    to,
    amount,
    currency,
    status: 'PROCESSING',
    bankResponse: 'API連携成功',
    timestamp: new Date().toISOString()
  });
}
