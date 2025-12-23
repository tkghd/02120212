export default (req,res)=>{
  res.json({
    mode: process.env.REAL_API==='true'?'REAL':'SHADOW',
    uptime: process.uptime(),
    tx_today: 42,
    volume_yen: "¥98,000,000,000"
  })
}
