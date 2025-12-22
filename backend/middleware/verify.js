import crypto from "crypto";
export function verifySignature(req,res,next){
  const sig=req.headers["x-signature"];
  const body=JSON.stringify(req.body||{});
  const hash=crypto.createHmac("sha256",process.env.JWT_SECRET)
    .update(body).digest("hex");
  if(sig!==hash){
    return res.status(403).json({error:"INVALID_SIGNATURE"});
  }
  next();
}
