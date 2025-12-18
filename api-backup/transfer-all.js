export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { type, to, amount, currency } = req.body || {};

  // 送金タイプ: domestic, international, crypto, paypay, card, atm
  const transferTypes = {
    domestic: '国内銀行送金',
    international: '国際送金',
    crypto: 'Web3/暗号通貨',
    paypay: 'PayPay送金',
    card: 'カード決済',
    atm: 'ATM出金'
  };

  if (!type || !to || !amount) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // リアルタイム送金シミュレーション
  const response = {
    success: true,
    transactionId: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type: transferTypes[type] || type,
    to,
    amount,
    currency: currency || 'JPY',
    status: 'completed',
    timestamp: new Date().toISOString(),
    fee: calculateFee(type, amount),
    estimatedTime: getEstimatedTime(type)
  };

  return res.status(200).json(response);
}

function calculateFee(type, amount) {
  const fees = {
    domestic: amount * 0.001, // 0.1%
    international: amount * 0.03, // 3%
    crypto: amount * 0.005, // 0.5%
    paypay: 0, // 無料
    card: amount * 0.02, // 2%
    atm: 110 // 固定
  };
  return fees[type] || 0;
}

function getEstimatedTime(type) {
  const times = {
    domestic: '即時',
    international: '1-3営業日',
    crypto: '5-15分',
    paypay: '即時',
    card: '即時',
    atm: '即時'
  };
  return times[type] || '処理中';
}
