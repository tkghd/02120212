export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json({ status: 'PRODUCTION_LIVE', realtime: true, modules: 18, timestamp: new Date().toISOString() });
}
