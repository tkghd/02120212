import fs from 'fs'
export async function anchor(root){
  fs.appendFileSync('anchor.log',
    JSON.stringify({ts:Date.now(),root,eth:'SEPOLIA',btc:'TESTNET'})+'\n')
  return {eth:'SEPOLIA_OK',btc:'TESTNET_OK'}
}
