import crypto from'crypto';import fs from'fs';
export const log=e=>fs.appendFileSync('audit.log',JSON.stringify({ts:Date.now(),e})+'\n');
export const root=_=>{
 if(!fs.existsSync('audit.log'))return null;
 let h=fs.readFileSync('audit.log','utf8').trim().split('\n')
 .map(l=>crypto.createHash('sha256').update(l).digest('hex'));
 while(h.length>1){
  let t=[];for(let i=0;i<h.length;i+=2)
  t.push(crypto.createHash('sha256').update(h[i]+(h[i+1]||h[i])).digest('hex'));
  h=t
 }
 return h[0]
}
