export type TransferMethod = "Zengin" | "PayPay" | "SWIFT";

export interface InstantTransferPayload {
  target: string;
  method: TransferMethod;
  amount: number;
  currency: string;
  label?: string;
}

const API_BASE =
  process.env.NEXT_PUBLIC_RAILWAY_API_BASE ||
  "https://<your-railway-url>";

export async function sendInstantTransfer(payload: InstantTransferPayload) {
  const res = await fetch(`${API_BASE}/api/transfer/instant`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error || `Transfer failed: ${res.status}`);
  return data;
}

export async function sendZengin(payload: any) {
  return fetch(`${API_BASE}/api/zengin/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then((r) => r.json());
}

export async function sendRealMoney(payload: any) {
  return fetch(`${API_BASE}/api/real-money/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then((r) => r.json());
}

export async function sendSwift(payload: any) {
  return fetch(`${API_BASE}/api/swift/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then((r) => r.json());
}

export async function checkHealth() {
  return fetch(`${API_BASE}/health`).then((r) => r.json());
}

export async function getGodmodeStatus() {
  return fetch(`${API_BASE}/api/godmode/status`).then((r) => r.json());
}
