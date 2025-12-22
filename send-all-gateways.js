import fetch from "node-fetch";
const JWT = process.env.JWT;
const urlMap = {
  Zengin: "https://hopeful-liberation-production-9d00.up.railway.app/api/zengin/send",
  PayPay: "https://hopeful-liberation-production-9d00.up.railway.app/api/real-money/send",
  SWIFT: "https://hopeful-liberation-production-9d00.up.railway.app/api/swift/send"
};
const payloads = [
  { target: "COMMAND_TEST", method: "Zengin", amount: 10000, currency: "JPY", label: "全銀" },
  { target: "COMMAND_TEST", method: "PayPay", amount: 5000, currency: "JPY", label: "リアルマネー" },
  { target: "COMMAND_TEST", method: "SWIFT", amount: 15000, currency: "USD", label: "HellMode" }
];
(async () => {
  console.log("🚀 TKG全ゲートウェイ送金テスト開始...");
  const results = await Promise.all(payloads.map(async p => {
    try {
      const res = await fetch(urlMap[p.method], {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${JWT}` },
        body: JSON.stringify(p)
      });
      const text = await res.text();
      let data; try { data = JSON.parse(text); } catch { data = text; }
      return { label: p.label, result: data };
    } catch (e) { return { label: p.label, error: e.message }; }
  }));
  console.table(results);
  console.log("✅ 送金テスト完了");
})();
