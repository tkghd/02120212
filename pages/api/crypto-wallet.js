export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json({
    status: "PRODUCTION_LOCKED",
    address: "0x71C7f8B34c76fA2c5f9E8aA9e9d1B6c9A2F",
    totalValuation: 845291004.52,
    change24h: 12.5,
    tokens: [
      { symbol: "TKG", balance: "∞", value: 999999999 },
      { symbol: "ETH", balance: 1250.5, value: 5200000 },
      { symbol: "BTC", balance: 45.2, value: 4100000 }
    ],
    timestamp: new Date().toISOString()
  });
}
