const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

console.log("🚀 TKG GLOBAL BANK V30 - Sovereign Backend Online");

app.get("/health", (req, res) => {
  res.json({ status: "V30 ONLINE", timestamp: Date.now() });
});

app.listen(3000, () => {
  console.log("🔥 V30 Ultimate Server running on port 3000");
});
