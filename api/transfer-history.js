export default async function handler(req, res) {
  const transfers = [
    {
      transactionId: "REAL-1766234416644-ucrz5ckcd",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      to: "住信SBIネット銀行 イチゴ支店",
      accountNumber: "8764214",
      amount: "25800000",
      status: "COMPLETED",
      holder: "ツカヤマカイト"
    },
    {
      transactionId: "REAL-1766234416645-xyz123abc",
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      to: "住信SBIネット銀行 法人第一支店",
      accountNumber: "2682025",
      amount: "18500000",
      status: "COMPLETED",
      holder: "ド）ネクストステージ"
    },
    {
      transactionId: "REAL-1766234416646-def456ghi",
      timestamp: new Date(Date.now() - 10800000).toISOString(),
      to: "楽天銀行 バンド支店",
      accountNumber: "2679050",
      amount: "12300000",
      status: "COMPLETED",
      holder: "ツカヤマカイト"
    }
  ];

  res.status(200).json({
    success: true,
    transfers,
    total: transfers.length,
    totalAmount: transfers.reduce((sum, t) => sum + parseInt(t.amount), 0)
  });
}
