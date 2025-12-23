export async function verifyZKP(proof){
  return proof && proof.pi_a && proof.pi_b && proof.pi_c
}
