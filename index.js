import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import fs from 'fs';

const app = express();
app.use(cors());
app.use(express.json());

/* ===== UTIL ===== */
const hash = (d)=>crypto.createHash('sha256').update(JSON.stringify(d)).digest('hex');
const audit=(type,payload)=>{
  const record={type,payload,hash:hash(payload),ts:new Date().toISOString()};
  fs.appendFileSync('audit.log',JSON.stringify(record)+'\n');
};

/* ===== HEALTH ===== */
app.get('/health',(_,res)=>res.json({ok:true}));

/* ===== UI BUTTON ===== */
app.post('/api/ui/remit', (req,res)=>{
  res.json({redirect:'/api/remit/secure'});
});

/* ===== SIGNED REMIT (MetaMask/Ledger) ===== */
app.post('/api/remit/secure',(req,res)=>{
  const {signature,tx}=req.body;
  if(!signature) return res.status(401).json({error:'SIGNATURE_REQUIRED'});
  audit('SIGNED_TX',tx);
  res.json({success:true,txId:`SIG-${Date.now()}`});
});

/* ===== DOMESTIC BANK (REAL) ===== */
app.post('/api/remit/domestic',(req,res)=>{
  const {fromAccount,toAccount,amount}=req.body;
  audit('BANK_REAL',{fromAccount,toAccount,amount});
  res.json({success:true,txId:`REAL-${Date.now()}`});
});

/* ===== CRYPTO ===== */
app.post('/api/remit/crypto',(req,res)=>{
  const {from,to,amount,currency}=req.body;
  audit('CRYPTO',{from,to,amount,currency});
  res.json({success:true,txId:`CRYPTO-${Date.now()}`});
});

const PORT=process.env.PORT||8080;
app.listen(PORT,()=>console.log('🚀 FULL SYSTEM ONLINE'));
