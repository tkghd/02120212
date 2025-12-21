import express from 'express';
import { executeUltraTransfer, verifyArrival } from '../services/transfer.js';

const router = express.Router();

router.post('/ultra', async (req, res) => {
  try {
    const result = await executeUltraTransfer(req.body);
    res.json({ success: true, ...result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/verify/:transferId', async (req, res) => {
  try {
    const result = await verifyArrival(req.params.transferId);
    res.json({ success: true, ...result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
