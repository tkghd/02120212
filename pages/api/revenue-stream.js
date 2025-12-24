export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const now = new Date();
  const todayRevenue = Math.floor(Math.random() * 50000000) + 100000000;

  res.json({
    realTime: {
      perSecond: '¥' + (todayRevenue / 86400).toFixed(2),
      perMinute: '¥' + (todayRevenue / 1440).toFixed(2),
      perHour: '¥' + (todayRevenue / 24).toFixed(2),
      today: '¥' + todayRevenue.toLocaleString()
    },
    monthly: {
      japan: '¥145,280,000',
      international: '$8,950,000',
      total: '¥' + (145280000 + 8950000 * 150).toLocaleString()
    },
    annual: {
      projected: '¥18兆2400億円',
      growth: '+247%',
      profitMargin: 0.67
    },
    sources: {
      banking: 0.42,
      transfer: 0.28,
      crypto: 0.15,
      investment: 0.10,
      licensing: 0.05
    },
    timestamp: new Date().toISOString()
  });
}
