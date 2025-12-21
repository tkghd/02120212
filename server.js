import express from 'express'; import cors from 'cors'; import {ethers} from 'ethers'; import axios from 'axios';
import fs from 'fs'; import keccak256 from 'keccak256'; import {MerkleTree} from 'merkletreejs';
const app=express(); app.use(cors()); app.use(express.json());
let leaves=[];
const audit=(type,payload)=>{const leaf=keccak256(JSON.stringify({type,payload,ts:Date.now()})); leaves.push(leaf); const tree=new MerkleTree(leaves,keccak256,{sortPairs:true}); fs.writeFileSync('audit.merkle',tree.getRoot().toString('hex'));}
app.post('/api/sign/verify',async(req,res)=>{const {message,signature,address,domain,types,values}=req.body;let signer;if(domain){signer=ethers.verifyTypedData(domain,types,values,signature);}else{signer=ethers.verifyMessage(message,signature);}if(signer.toLowerCase()!==address.toLowerCase())return res.status(401).json({error:'INVALID_SIGNATURE'});audit('SIGN_OK',{address});res.json({ok:true});});
app.post('/api/remit/domestic',async(req,res)=>{const {bank,from,to,amount}=req.body;const payload={from,to,amount};const api=bank==='SBI'?process.env.SBI_API_ENDPOINT:process.env.RAKUTEN_API_ENDPOINT; await axios.post(api,payload);audit('REAL_BANK',{bank,from,to,amount});res.json({success:true});});
app.post('/api/remit/crypto',async(req,res)=>{const {fromAddress,toAddress,amount,currency}=req.body;const api=currency==='BTC'?process.env.BTC_API:process.env.ETH_API; await axios.post(api,{fromAddress,toAddress,amount});audit('CRYPTO',{fromAddress,toAddress,amount,currency});res.json({success:true});});
app.post('/api/karma/mint',(req,res)=>{audit('KARMA_MINT',req.body);const tokenId=Date.now();res.json({tokenId,erc20:`KARMA-ERC20-${tokenId}`,erc721:`KARMA-ERC721-${tokenId}`});});
app.get('/health',(_,res)=>res.json({ok:true}));
app.listen(process.env.PORT||8080);
