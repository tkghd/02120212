export default function handler(req, res) {
  res.status(200).json({
    status: 'OK',
    frontend: 'Vercel',
    backend: 'Railway',
    timestamp: new Date().toISOString()
  });
}
