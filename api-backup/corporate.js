// 法人資産統合API
export default async function handler(req, res) {
  res.status(200).json({
    success: true,
    corporations: [
      { name: "TK Holdings HK", balance: "450000000", status: "ACTIVE" },
      { name: "TK Global SG", balance: "120000000", status: "ACTIVE" }
    ]
  });
}
