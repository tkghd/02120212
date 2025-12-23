import { REAL_API, BANK_PROVIDER } from '../env/runtime.js'

export async function sendBankTransfer(payload){
  if(!REAL_API){
    return { mode:'SHADOW', accepted:true, ref:'SIM-'+Date.now() }
  }

  switch(BANK_PROVIDER){
    case 'SBI':
    case 'MUFG':
    case 'MIZUHO':
      // 🔒 公式SDK / API契約差替ポイント
      return { mode:'REAL', status:'SENT', bank:BANK_PROVIDER }
    default:
      throw new Error('UNKNOWN_BANK_PROVIDER')
  }
}
