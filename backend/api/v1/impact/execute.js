import crypto from "crypto";
export default function handler(req,res){
  if(req.method!=="POST") return res.status(405).end();
  const { amount } = req.body||{};
  const txId=`ACT-IMP-${crypto.randomBytes(6).toString("hex").toUpperCase()}`;
  res.status(200).json({
    success:true,
    txId,
    proof:crypto.createHash("sha256").update(txId+amount).digest("hex"),
    impact:"SETTLEMENT_COMMENCED"
  });
}
