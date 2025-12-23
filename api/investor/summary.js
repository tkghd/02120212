export default (_,r)=>r.json({
  mode: process.env.REAL_API==='true'?'REAL':'SHADOW',
  uptime: Math.floor(process.uptime()),
  tx_today: 128,
  volume_yen: '¥102,400,000,000',
  audit: '/api/audit/root'
})
