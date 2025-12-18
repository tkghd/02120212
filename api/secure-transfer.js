export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { to, amount } = req.body || {};

  if (!to || !amount) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  const SECRET = process.env.TRANSFER_SECRET;

  if (!SECRET) {
    return res.status(500).json({ error: "Server not configured" });
  }

  // ダミー処理（ここに送金ロジック）
  return res.status(200).json({
    success: true,
    to,
    amount
  });
}
