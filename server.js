import express from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
const app=express();app.use(express.json());
const SECRET=process.env.JWT_SECRET||"dev-secret";

const balances={ owner:2220000000000 };

const walletVerify=(addr,sig,msg)=>{
  return crypto.createHash("sha256").update(addr+msg).digest("hex")===sig;
};

app.post("/api/auth",(req,res)=>{
  const {address,signature}=req.body;
  const msg="LOGIN";
  if(!walletVerify(address,signature,msg))return res.sendStatus(401);
  const token=jwt.sign({address,role:"owner"},SECRET,{expiresIn:"15m"});
  const refresh=jwt.sign({address},SECRET,{expiresIn:"7d"});
  res.json({token,refresh});
});

app.post("/api/refresh",(req,res)=>{
  try{
    const d=jwt.verify(req.body.refresh,SECRET);
    res.json({token:jwt.sign({address:d.address,role:"owner"},SECRET,{expiresIn:"15m"})});
  }catch{res.sendStatus(401)}
});

const auth=(req,res,next)=>{
  try{req.user=jwt.verify(req.headers.authorization?.split(" ")[1],SECRET);next()}
  catch{res.sendStatus(401)}
};

app.get("/api/balance",auth,(req,res)=>res.json({balance:balances.owner}));
app.post("/api/transfer",auth,(req,res)=>{
  balances.owner-=req.body.amount;
  res.json({ok:true,remain:balances.owner});
});

app.listen(process.env.PORT||8080,()=>console.log("BANK API LIVE"));
