import crypto from "crypto";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const SECRET = process.env.API_SIGN_SECRET;
  if (!SECRET) {
    return res.status(500).json({ error: "Server not configured" });
  }

  const signature = req.headers["x-signature"];
  if (!signature) {
    return res.status(401).json({ error: "Missing signature" });
  }

  // ボディを文字列化
  const body = JSON.stringify(req.body || {});
  
  // 期待される署名を生成
  const expected = crypto
    .createHmac("sha256", SECRET)
    .update(body)
    .digest("hex");

  // デバッグ情報（本番では削除）
  const debug = {
    receivedSignature: signature,
    expectedSignature: expected,
    body: body,
    bodyKeys: Object.keys(req.body || {}),
    match: signature === expected
  };

  if (signature !== expected) {
    return res.status(401).json({ 
      error: "Invalid signature",
      debug: process.env.NODE_ENV === 'development' ? debug : undefined
    });
  }

  const { to, amount } = req.body || {};
  if (!to || !amount) {
    return res.status(400).json({ error: "Missing params" });
  }

  return res.status(200).json({
    success: true,
    to,
    amount,
    signed: true
  });
}
