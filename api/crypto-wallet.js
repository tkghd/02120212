export default async function handler(req, res) {
  const walletData = {
    status: "PRODUCTION_LOCKED",
    mode: "Local Mode",
    address: "0x71C7f8B34c76fA2c5f9E8aA9e9d1B6c9A2F",
    totalValuation: 845291004.52,
    change24h: 12.5,
    currency: "USD",
    tabs: ["Tokens", "NFTs", "DeFi"],
    actions: ["Send", "Receive", "Swap", "Buy"],
    tokens: [
      { symbol: "TKG", name: "TK Global Coin", balance: "∞", value: 999999999, status: "ACTIVE" },
      { symbol: "LUSTRA", name: "Lustra Gem", balance: 999999, value: 850000000, status: "ACTIVE" },
      { symbol: "RUBISS", name: "Rubiss Core", balance: 500000, value: 720000000, status: "ACTIVE" },
      { symbol: "ETH", name: "Ethereum", balance: 1250.5, value: 5200000, status: "ACTIVE" },
      { symbol: "BTC", name: "Bitcoin", balance: 45.2, value: 4100000, status: "ACTIVE" },
      { symbol: "USDT", name: "Tether", balance: 10000000, value: 10000000, status: "ACTIVE" }
    ],
    nfts: [
      { collection: "TKG Genesis", count: 888, floor: 2.5 },
      { collection: "Luxury Art", count: 156, floor: 15.8 }
    ],
    defi: {
      staked: 12500000,
      earned: 850000,
      pools: 12
    },
    timestamp: new Date().toISOString()
  };
  
  res.status(200).json(walletData);
}
