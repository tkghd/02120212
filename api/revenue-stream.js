export default async function handler(req, res) {
  const revenuePerSecond = {
    japan: {
      "chat1.tkghd.global": 99.9,
      "chat2.tkghd.global": 99.9,
      "casino1.tkghd.global": 999,
      "ads.tkghd.global": 88.8,
      "nft.tkghd.global": 55.5,
      "video1.tkghd.global": 77.7,
      "art.tkghd.global": 44.4
    },
    global: {
      "global-chat.tkghd.global": 9.9,
      "global-casino.tkghd.global": 99,
      "tube1.tkghd.global": 5.5,
      "tube2.tkghd.global": 5.5,
      "vr.tkghd.global": 8.8,
      "vault.tkghd.global": 999
    }
  };

  const totalPerSecond = Object.values(revenuePerSecond.japan).reduce((a, b) => a + b, 0) +
                         Object.values(revenuePerSecond.global).reduce((a, b) => a + b, 0);

  res.status(200).json({
    revenuePerSecond,
    totalPerSecond,
    dailyProjection: totalPerSecond * 86400,
    monthlyProjection: totalPerSecond * 86400 * 30,
    timestamp: new Date().toISOString()
  });
}
