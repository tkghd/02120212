// api/luxury-cards.js - TKG Luxury Cards API
export default async function handler(req, res) {
  const cards = [
    {
      id: "TKG-INFINITE-001",
      name: "TKG Infinite Black",
      type: "INFINITE",
      number: "4980 1234 5678 9010",
      cvv: "892",
      exp: "12/28",
      limit: "UNLIMITED",
      balance: "999999999999",
      status: "ACTIVE",
      features: ["ATMカメラ連動", "バーチャル決済", "出金可能", "世界中のATM対応"],
      color: "from-black via-gray-900 to-black",
      holderName: "TK GLOBAL ADMIN"
    },
    {
      id: "TKG-PLATINUM-002",
      name: "TKG Platinum Elite",
      type: "PLATINUM",
      number: "5412 7890 1234 5678",
      cvv: "743",
      exp: "09/29",
      limit: "50000000000",
      balance: "45000000000",
      status: "ACTIVE",
      features: ["プライオリティパス", "コンシェルジュ24/7", "空港ラウンジ"],
      color: "from-slate-400 via-slate-500 to-slate-600",
      holderName: "TK EXECUTIVE"
    },
    {
      id: "TKG-DIAMOND-003",
      name: "TKG Diamond Reserve",
      type: "DIAMOND",
      number: "4532 1098 7654 3210",
      cvv: "521",
      exp: "03/30",
      limit: "100000000000",
      balance: "89000000000",
      status: "ACTIVE",
      features: ["ダイヤモンド特典", "VIPイベント招待", "専属アドバイザー"],
      color: "from-cyan-400 via-blue-500 to-purple-600",
      holderName: "TK DIAMOND MEMBER"
    },
    {
      id: "TKG-GOLD-004",
      name: "TKG Gold Premium",
      type: "GOLD",
      number: "4716 5432 1098 7654",
      cvv: "634",
      exp: "06/29",
      limit: "10000000000",
      balance: "8500000000",
      status: "ACTIVE",
      features: ["ゴールド特典", "キャッシュバック3%", "旅行保険"],
      color: "from-amber-400 via-yellow-500 to-orange-600",
      holderName: "TK GOLD MEMBER"
    },
    {
      id: "TKG-CRYPTO-005",
      name: "TKG Crypto Master",
      type: "CRYPTO",
      number: "3714 9876 5432 1098",
      cvv: "987",
      exp: "11/30",
      limit: "UNLIMITED",
      balance: "∞",
      status: "ACTIVE",
      features: ["暗号通貨決済", "NFT購入", "DeFi統合", "Web3対応"],
      color: "from-purple-500 via-pink-500 to-red-500",
      holderName: "TK CRYPTO LORD"
    },
    {
      id: "TKG-BUSINESS-006",
      name: "TKG Business Elite",
      type: "BUSINESS",
      number: "5105 1234 5678 9012",
      cvv: "456",
      exp: "08/29",
      limit: "30000000000",
      balance: "25000000000",
      status: "ACTIVE",
      features: ["法人決済", "経費精算", "会計ソフト連携"],
      color: "from-blue-600 via-indigo-700 to-purple-800",
      holderName: "TK BUSINESS"
    },
    {
      id: "TKG-TRAVEL-007",
      name: "TKG World Traveler",
      type: "TRAVEL",
      number: "4532 8765 4321 0987",
      cvv: "234",
      exp: "05/30",
      limit: "5000000000",
      balance: "4200000000",
      status: "ACTIVE",
      features: ["海外決済手数料0円", "空港送迎", "ホテルアップグレード"],
      color: "from-teal-400 via-cyan-500 to-blue-600",
      holderName: "TK TRAVELER"
    },
    {
      id: "TKG-METAL-008",
      name: "TKG Metal Titanium",
      type: "METAL",
      number: "4916 5555 4444 3333",
      cvv: "888",
      exp: "12/31",
      limit: "20000000000",
      balance: "18000000000",
      status: "ACTIVE",
      features: ["チタン製カード", "究極のステータス", "限定デザイン"],
      color: "from-gray-500 via-gray-600 to-gray-700",
      holderName: "TK TITANIUM"
    },
    {
      id: "TKG-REWARDS-009",
      name: "TKG Rewards Plus",
      type: "REWARDS",
      number: "5412 3333 2222 1111",
      cvv: "123",
      exp: "07/29",
      limit: "3000000000",
      balance: "2500000000",
      status: "ACTIVE",
      features: ["ポイント10倍", "マイル還元", "提携店特典"],
      color: "from-green-400 via-emerald-500 to-teal-600",
      holderName: "TK REWARDS"
    },
    {
      id: "TKG-PRESTIGE-010",
      name: "TKG Prestige Signature",
      type: "PRESTIGE",
      number: "4024 0071 1234 5678",
      cvv: "999",
      exp: "10/31",
      limit: "UNLIMITED",
      balance: "999999999999",
      status: "ACTIVE",
      features: ["最高級ステータス", "全特典包括", "専属コンシェルジュ"],
      color: "from-rose-500 via-pink-600 to-purple-700",
      holderName: "TK PRESTIGE"
    }
  ];

  if (req.method === 'POST') {
    // カード決済処理
    const { cardId, amount, merchant } = req.body;
    return res.status(200).json({
      success: true,
      transactionId: `TXN-${Date.now()}`,
      cardId,
      amount,
      merchant,
      timestamp: new Date().toISOString()
    });
  }

  res.status(200).json({
    success: true,
    cards,
    totalCards: cards.length,
    atmEnabled: true,
    virtualPayment: true
  });
}
