export default async function handler(req, res) {
  const { address } = req.query;
  
  const balances = {
    address: address || "0x71C7f8B34c76fA2c5f9E8aA9e9d1B6c9A2F",
    totalValue: 845291004.52,
    tokens: [
      { 
        symbol: "TKG", 
        name: "TK Global Coin", 
        balance: "∞", 
        price: 999999, 
        value: 999999999999,
        change24h: 25.8,
        chain: "TKG Chain"
      },
      { 
        symbol: "LUSTRA", 
        name: "Lustra Gem", 
        balance: 999999, 
        price: 850.5, 
        value: 850499150,
        change24h: 18.2,
        chain: "Ethereum"
      },
      { 
        symbol: "RUBISS", 
        name: "Rubiss Core", 
        balance: 500000, 
        price: 1440, 
        value: 720000000,
        change24h: -5.3,
        chain: "Polygon"
      },
      { 
        symbol: "DIAMUSE", 
        name: "Diamuse Gov", 
        balance: 12000, 
        price: 25000, 
        value: 300000000,
        change24h: 45.7,
        chain: "Arbitrum"
      },
      { 
        symbol: "ETH", 
        name: "Ethereum", 
        balance: 1250.5, 
        price: 4160, 
        value: 5202080,
        change24h: 8.1,
        chain: "Ethereum"
      }
    ],
    history: {
      totalTransactions: 847263,
      sent: 12500,
      received: 95800,
      swapped: 4200
    },
    timestamp: new Date().toISOString()
  };
  
  res.status(200).json(balances);
}
