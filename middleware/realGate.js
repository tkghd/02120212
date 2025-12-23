export default function realGate(req,res,next){
  req.REAL_MODE = process.env.REAL_API === 'true'
  next()
}
