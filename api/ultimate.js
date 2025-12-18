export default async function handler(req, res) {
  const { method, query, body, headers } = req;

  return res.status(200).json({
    method,
    query,
    body,
    userAgent: headers["user-agent"],
    timestamp: Date.now()
  });
}
