import fetch from "node-fetch";

const BASE = process.env.API_BASE || "http://localhost:3000";

const endpoints = [
  "/api/system/health",
  "/api/portfolio",
  "/api/accounts/real"
];

(async () => {
  for (const ep of endpoints) {
    const res = await fetch(BASE + ep);
    console.log(ep, res.status);
  }
})();
