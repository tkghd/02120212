export default async function(req,res){
  res.json(global.TX_STATUS||{});
}
