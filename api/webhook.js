import crypto from "crypto";
export default function handler(req,res){
 if(req.method!=="POST")return res.status(405).end();
 const secret=process.env.WEBHOOK_SECRET;
 const sig=req.headers["x-webhook-signature"];
 const raw=JSON.stringify(req.body||{});
 const h=crypto.createHmac("sha256",secret).update(raw).digest("hex");
 if(sig!==h)return res.status(401).json({error:"invalid webhook"});
 res.status(200).json({received:true,event:req.body?.event});
}
