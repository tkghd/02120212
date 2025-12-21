import express from 'express';
const router = express.Router();
router.post('/domestic', async (req,res)=>{
  res.json({success:true,type:'DOMESTIC',bank:req.body.bank,amount:req.body.amount,timestamp:new Date().toISOString()});
});
export default router;
