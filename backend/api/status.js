export default function handler(req,res){
  res.status(200).json({
    user:"1190212",
    status:"ACTUAL_IMPACT_READY",
    gateways:{sbi:true,wise:true,gmo:true}
  });
}
