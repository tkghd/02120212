import crypto from "crypto";

function verifySignature(req, secret) {
  const signature = req.headers["x-signature"];
  if (!signature) return false;

  const body = JSON.stringify(req.body || {});
  const expected = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expected)
    );
  } catch {
    return false;
  }
}

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const SECRET = process.env.API_SIGN_SECRET;
  if (!SECRET) {
    return res.status(500).json({ error: "Server not configured" });
  }

  if (!verifySignature(req, SECRET)) {
    return res.status(401).json({ error: "Invalid signature" });
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
