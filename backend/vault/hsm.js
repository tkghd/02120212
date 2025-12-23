export async function signWithHSM(payload){
  return {
    algorithm: "HSM_SIMULATED",
    signature: "signed_" + Date.now()
  }
}
