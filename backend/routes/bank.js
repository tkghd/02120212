import express from 'express';
import { 
  getBanks, 
  getBalance, 
  executeTransfer,
  getTransactionHistory 
} from '../services/bank.js';

const router = express.Router();

// 銀行一覧取得
router.get('/list', async (req, res) => {
  try {
    const banks = await getBanks();
    res.json({ success: true, banks });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 残高取得
router.post('/balance', async (req, res) => {
  try {
    const { bankId, accountId } = req.body;
    const balance = await getBalance(bankId, accountId);
    res.json({ success: true, balance });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 送金実行
router.post('/transfer', async (req, res) => {
  try {
    const result = await executeTransfer(req.body);
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 取引履歴
router.get('/history', async (req, res) => {
  try {
    const { accountId, limit } = req.query;
    const history = await getTransactionHistory(accountId, limit);
    res.json({ success: true, history });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
