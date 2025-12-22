import express from "express";
const app = express();
app.use(express.json());

app.post("/api/dispatch", async (req, res) => {
  const { target, method, amount, currency } = req.body;
  try {
    await (method === "PayPay"
      ? paypay.send(target, amount)
      : method === "Zengin"
      ? zengin.send(target, amount)
      : method === "SWIFT"
      ? swift.send(target, amount)
      : Promise.reject(new Error("invalid method")));
    logDispatch({ target, method, amount, status: "SUCCESS" });
    res.json({ status: "success", txId: `TX${Date.now()}` });
  } catch (e) {
    logDispatch({ target, method, amount, status: "FAIL", error: e.message });
    res.status(500).json({ status: "fail", error: e.message });
  }
});

app.listen(3100, () => console.log("🚀 dispatch API listening on port 3100"));
