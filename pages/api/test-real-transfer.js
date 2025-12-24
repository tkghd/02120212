export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token, bank, amount } = req.body;

  // テスト送金を実行
  const testResponse = await fetch('https://tk-global-bank-alpha.vercel.app/api/real-bank-transfer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      bank: bank || 'sbi',
      from: 'owner-account-001',
      to: 'test-account-999',
      amount: amount || 10000,
      currency: 'JPY',
      memo: 'Test transfer from TK Global Bank'
    })
  });

  const result = await testResponse.json();

  return res.status(200).json({
    test: true,
    api_status: testResponse.status,
    response: result,
    message: 'これはテスト送金です。実際の資金移動は発生していません。'
  });
}
