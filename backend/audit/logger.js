import fs from 'fs'
export function auditLog(e){
  fs.appendFileSync(
    'audit/ledger.log',
    JSON.stringify({...e,ts:Date.now()})+'\n'
  )
}
