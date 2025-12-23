import fs from 'fs'
import crypto from 'crypto'
export function audit(event){
  const line=JSON.stringify({ts:Date.now(),event})
  const hash=crypto.createHash('sha256').update(line).digest('hex')
  fs.appendFileSync('audit.log',line+'|'+hash+'\n')
}
