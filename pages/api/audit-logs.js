export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  // 簡易実装（本番ではDB使用）
  res.json({
    total: 0,
    logs: [],
    readonly: true,
    note: 'Audit logs are immutable',
    timestamp: new Date().toISOString()
  });
}
