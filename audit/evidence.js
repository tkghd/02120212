import fs from 'fs'
export function generateEvidence({root,anchor,period}){
  const doc = {
    system: "TK GLOBAL BANK",
    period,
    merkle_root: root,
    anchor,
    generated_at: new Date().toISOString()
  }
  fs.writeFileSync(
    `reports/audit_${Date.now()}.json`,
    JSON.stringify(doc,null,2)
  )
  return doc
}
