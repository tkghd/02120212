import express from 'express';import cors from 'cors';
import {ethers} from 'ethers';import axios from 'axios';
import fs from 'fs';import keccak256 from 'keccak256';
import {MerkleTree} from 'merkletreejs';

const app=express();app.use(cors());app.use(express.json());
let leaves=[];

/* ===== AUDIT MERKLE ===== */
const audit=(type,payload)=>{
 const leaf=keccak256(JSON.stringify({type,payload,ts:Date.now()}));
 leaves.push(leaf);
 const tree=new MerkleTree(leaves,keccak256,{sortPairs:true});
 fs.writeFileSync('audit.merkle',tree.getRoot().toString('hex'));
};

/* ===== SIGN VERIFY (Ledger / MetaMask) ===== */
app.post('/api/sign/verify',async(req,res)=>{
 const {message,signature,address}=req.body;
 const signer=ethers.verifyMessage(message,signature);
 if(signer.toLowerCase()!==address.toLowerCase())
   return res.status(401).json({error:'INVALID_SIGNATURE'});
 audit('SIGN_OK',{address});
 res.json({ok:true});
});

/* ===== REAL BANK SBI / RAKUTEN ===== */
app.post('/api/remit/domestic',async(req,res)=>{
 const {bank,from,to,amount}=req.body;
 const api = bank==='SBI'
  ? process.env.SBI_API_ENDPOINT
  : process.env.RAKUTEN_API_ENDPOINT;
 await axios.post(api,{from,to,amount});
 audit('REAL_BANK',{bank,from,to,amount});
 res.json({success:true});
});

/* ===== KARMA TOKEN ISSUE ===== */
app.post('/api/karma/mint',(req,res)=>{
 audit('KARMA_MINT',req.body);
 res.json({karma:`KARMA-${Date.now()}`});
});

/* ===== HEALTH ===== */
app.get('/health',(_,res)=>res.json({ok:true}));

app.listen(process.env.PORT||8080);
