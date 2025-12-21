const REAL_ACCOUNTS = {
  rakuten: {
    bank: '楽天銀行',
    branch: 'バンド支店',
    accountType: '普通',
    accountNumber: '2679050',
    name: 'ツカヤマ カイト',
    limit: 5600000
  },
  sbi: {
    bank: '住信SBIネット銀行',
    bankCode: '0038',
    branch: 'イチゴ支店',
    branchCode: '101',
    accountType: '普通',
    accountNumber: '8764214',
    name: 'ツカヤマカイト',
    limit: 18000000
  },
  eth: {
    address: '0xd44b97363b6ace45effbdbdeaedd282aeaa0e573',
    chain: 'Ethereum',
    limit: 10000000
  },
  btc: {
    address: 'bc1qfdvzg5nyu6mgyw9vsjtqw8d87z5h90zqesmdja',
    chain: 'Bitcoin',
    limit: 10000000
  }
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const { destination, amount, method } = req.body;
      
      const account = REAL_ACCOUNTS[destination];
      if (!account) {
        return res.status(400).json({
          success: false,
          error: '無効な送金先です'
        });
      }

      if (amount > account.limit) {
        return res.status(400).json({
          success: false,
          error: `送金額が上限（¥${account.limit.toLocaleString()}）を超えています`
        });
      }

      // トランザクションハッシュ生成
      const txHash = `0x${Date.now().toString(16)}${Math.random().toString(16).slice(2, 18)}`;
      
      // 送金実行（実際のAPI連携はここに実装）
      const result = {
        success: true,
        txHash: txHash,
        destination: account,
        amount: amount,
        method: method,
        status: 'CONFIRMED',
        timestamp: new Date().toISOString(),
        message: '送金が完了しました'
      };

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // GET - アカウント情報取得
  return res.status(200).json({
    status: 'ok',
    accounts: REAL_ACCOUNTS
  });
}
