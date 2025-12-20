export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  // 本番ではデータベースから取得
  const history = [
    {
      id: 'TX-001',
      type: 'DEMO',
      amount: 10000,
      status: 'SIMULATED',
      date: new Date().toISOString()
    }
  ];
  
  res.status(200).json({
    mode: 'DEMO',
    history,
    message: '実際の履歴にはデータベース連携が必要です'
  });
}
