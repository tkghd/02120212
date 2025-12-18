export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({
    summary: {
      totalMarketCap: "162京5000兆円",
      tokenValuation: "35888京2500兆円",
      quickTransfer: "¥2,000,000,000,000",
      totalAccounts: 350
    },
    proprietaryTokens: [
      { symbol: "TKG", name: "TK Global Coin", supply: "∞" },
      { symbol: "LUSTRA", name: "Lustra Gem", supply: 999999 },
      { symbol: "RUBISS", name: "Rubiss Core", supply: 500000 }
    ],
    timestamp: new Date().toISOString()
  });
}
