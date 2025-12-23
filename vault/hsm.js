/*
 実装例:
  - AWS KMS
  - GCP KMS
  - HashiCorp Vault
  - YubiHSM
*/
export async function signWithHSM(payload){
  // 🔐 実署名はHSM側で実行される
  return {
    algorithm: "HSM",
    signature: "HSM_SIGNATURE_PLACEHOLDER"
  }
}
