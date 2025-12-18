export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({
    ui: { connected: true, latency: '12ms' },
    api: {
      bankTransfer: 'LIVE',
      atmWithdraw: 'READY',
      virtualCard: 'ACTIVE'
    },
    realWorld: {
      atmNetwork: 'ONLINE',
      cardProcessor: 'ACTIVE',
      bankingSystem: 'SYNCED'
    },
    timestamp: new Date().toISOString()
  });
}
