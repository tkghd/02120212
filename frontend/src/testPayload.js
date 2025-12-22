import crypto from 'crypto';

const BASE_URL = "https://hopeful-liberation-production-9d00.up.railway.app/api";
const token = process.env.JWT_SECRET;

const payload = {
  customerCode: "CUST001",
  transferDate: new Date().toISOString().split('T')[0].replace(/-/g,''),
  senderBankCode: "0038",
  senderBranchCode: "106",
  senderAccountType: "1",
  senderAccountNumber: "1234567",
  receiverBankCode: "0036",
  receiverBranchCode: "251",
  receiverAccountType: "1",
  receiverAccountNumber: "7654321",
  receiverName: "ヤマダ タロウ",
  amount: "0000100000",
  note: "UI送金テスト",
  idempotencyKey: crypto.randomUUID()
};

(async () => {
  try {
    const res = await fetch(`${BASE_URL}/transfer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    const text = await res.text();
    try {
      const json = JSON.parse(text);
      console.log("✅ 送金結果:", json);
    } catch {
      console.error("❌ Unexpected response (not JSON):", text.slice(0,200));
    }

  } catch(err) {
    console.error("❌ 送金エラー:", err);
  }
})();
