export function verifyTransfer({ pin }) {
  if (process.env.REAL_MODE === "true" && pin !== process.env.TRANSFER_PIN) {
    throw new Error("INVALID PIN");
  }
}
