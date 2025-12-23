/*
 契約済銀行API差替ポイント
 - mTLS
 - IP制限
 - 取引制限
*/
export async function bankTransferOfficial(data){
  return {
    bank: "OFFICIAL_API",
    status: "ACCEPTED",
    ref: "BANK_TX_ID_PLACEHOLDER"
  }
}
