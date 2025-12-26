import crypto from 'node:crypto';

export default function handler(req, res) {
  const IS_ACTUAL = true;
  const D = {
    mcap: "162,500,000,000,000,000 JPY",
    balance: 2000000000000,
    user: "1190212",
    status: "ACTUAL_IMPACT_READY",
    gateways: { sbi:true, wise:true, gmo:true }
  };

  if (req.method === 'GET') return res.json(D);
  if (req.method === 'POST') {
    const { amount } = req.body;
    const txId = `ACT-IMP-${crypto.randomBytes(6).toString("hex").toUpperCase()}`;
    return res.json({
      success:true,
      txId,
      proof: crypto.createHash("sha256").update(txId + amount).digest("hex"),
      impact: "SETTLEMENT_COMMENCED"
    });
  }
  return res.status(405).end();
}
