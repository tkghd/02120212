import {ethers} from 'ethers';
export async function send(){
 const provider=new ethers.BrowserProvider(window.ethereum);
 const signer=await provider.getSigner();
 const msg="REAL TRANSFER";
 const sig=await signer.signMessage(msg);
 await fetch('/api/sign/verify',{
   method:'POST',
   headers:{'Content-Type':'application/json'},
   body:JSON.stringify({message:msg,signature:sig,address:await signer.getAddress()})
 });
}
