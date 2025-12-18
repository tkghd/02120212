import crypto from "crypto";
export default function handler(req, res) {
  // 署名検証ロジック
  res.json({ verified: true });
}
