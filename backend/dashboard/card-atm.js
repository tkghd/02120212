import express from 'express';
const router = express.Router();
router.get('/', (req,res)=>res.json({status:'ok',module:'Card Atm'}));
export default router;
