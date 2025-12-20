// 送金統合API (国内・国際)
export default async function handler(req, res) {
  const { type } = req.query;
  res.status(200).json({
    success: true,
    type: type || 'domestic',
    status: 'READY'
  });
}
