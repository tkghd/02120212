import express from 'express';
import GlobalIncorporation from '../modules/corporate/auto-incorporation.js';
import GlobalLicensing from '../modules/corporate/auto-licensing.js';

const router = express.Router();
const incorporation = new GlobalIncorporation();
const licensing = new GlobalLicensing();

// 法人自動設立
router.post('/incorporate', async (req, res) => {
  try {
    const { jurisdiction, companyData } = req.body;
    
    let result;
    switch(jurisdiction) {
      case 'Delaware':
        result = await incorporation.createDelawareCorp(companyData);
        break;
      case 'Singapore':
        result = await incorporation.createSingaporePte(companyData);
        break;
      case 'HongKong':
        result = await incorporation.createHongKongLimited(companyData);
        break;
      case 'Cayman':
        result = await incorporation.createCaymanCompany(companyData);
        break;
      default:
        throw new Error('Unsupported jurisdiction');
    }
    
    res.json({ success: true, ...result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 複数法人自動設立
router.post('/incorporate/multi', async (req, res) => {
  try {
    const { plan } = req.body; // ['US', 'Asia', 'HK', 'Offshore']
    const result = await incorporation.autoCreateMultiJurisdiction(plan);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ライセンス申請
router.post('/license/apply', async (req, res) => {
  try {
    const { jurisdiction, licenseType } = req.body;
    const result = await licensing.autoApplyLicense(jurisdiction, licenseType);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ライセンス一覧
router.get('/licenses/available', (req, res) => {
  res.json({
    success: true,
    licenses: licensing.licenses
  });
});

export default router;
