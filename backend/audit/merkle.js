import crypto from 'crypto'
let logs=[]
export function log(e){logs.push(JSON.stringify(e))}
export function root(){
 let h=logs.map(x=>crypto.createHash('sha256').update(x).digest('hex'))
 while(h.length>1){
  let t=[]
  for(let i=0;i<h.length;i+=2)
   t.push(crypto.createHash('sha256').update(h[i]+(h[i+1]||h[i])).digest('hex'))
  h=t
 }
 return h[0]||null
}
