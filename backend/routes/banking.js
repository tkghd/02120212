import express from 'express';
import WealthIntegration from '../modules/wealth-integration.js';
import TokenLaunchSystem from '../modules/token-launch.js';

const router = express.Router();
const wealth = new WealthIntegration();
const tokenLaunch = new TokenLaunchSystem();

// 統合資産取得
router.get('/assets/consolidated', async (req, res) => {
  try {
    const assets = await wealth.getConsolidatedAssets();
    res.json({ success: true, assets });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 日次利確実行
router.post('/profit/daily', async (req, res) => {
  try {
    const result = await wealth.executeDailyProfitStrategy();
    res.json({ success: true, ...result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// トークン上場
router.post('/token/launch', async (req, res) => {
  try {
    const result = await tokenLaunch.listOnDEX();
    res.json({ success: true, ...result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// トークンエコノミクス
router.get('/token/economics', (req, res) => {
  const tokenomics = tokenLaunch.getTokenomics();
  res.json({ success: true, tokenomics });
});

export default router;
