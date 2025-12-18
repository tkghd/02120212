import crypto from "crypto";
export default function handler(req,res){
 if(req.method!=="POST")return res.status(405).end();
 const sig=req.headers["x-signature"];
 const secret=process.env.API_SIGN_SECRET;
 if(!sig||!secret)return res.status(401).json({error:"unauthorized"});
 const body=JSON.stringify(req.body||{});
 const h=crypto.createHmac("sha256",secret).update(body).digest("hex");
 if(sig!==h)return res.status(403).json({error:"bad signature"});
 res.status(200).json({signed:true});
}
