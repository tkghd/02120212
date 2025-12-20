export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const realBankAccounts = {
    sbi: {
      bank: '住信SBIネット銀行',
      code: '0038',
      accounts: [
        {
          branch: 'イチゴ支店',
          branchCode: '101',
          accountType: '普通',
          accountNumber: '8764214',
          holder: 'ツカヤマカイト',
          balance: 20000000,
          status: 'ACTIVE'
        },
        {
          branch: '法人第一支店',
          branchCode: '106',
          accountType: '普通',
          accountNumber: '2682025',
          holder: 'ド）ネクストステージ',
          balance: 35800000,
          status: 'ACTIVE'
        }
      ]
    },
    rakuten: {
      bank: '楽天銀行',
      code: '0036',
      accounts: [
        {
          branch: 'バンド支店',
          branchCode: '203',
          accountType: '普通',
          accountNumber: '2679050',
          holder: 'ツカヤマカイト',
          balance: 5000000,
          status: 'ACTIVE'
        }
      ]
    },
    paypay: {
      service: 'PayPay',
      accounts: [
        {
          phoneNumber: '08079883779',
          holder: 'ツカヤマカイト',
          balance: 500000,
          status: 'ACTIVE'
        }
      ]
    },
    cotra: {
      service: 'Cotra',
      accounts: [
        {
          phoneNumber: '08079882442',
          holder: 'ツカヤマカイト',
          balance: 100000,
          status: 'ACTIVE'
        }
      ]
    },
    crypto: {
      bitcoin: {
        address: 'bc1qctcquz8au72gxvg70tx9x548zq843xfyggdcmj',
        balance: 3,
        valueJPY: 45000000,
        network: 'Bitcoin Mainnet',
        status: 'ACTIVE'
        }
    }
  };
  
  const totalBalance = {
    sbi: 55800000,
    rakuten: 5000000,
    paypay: 500000,
    cotra: 100000,
    bitcoin: 45000000,
    total: 106400000
  };
  
  res.status(200).json({
    success: true,
    realAccounts: realBankAccounts,
    totalBalance,
    timestamp: new Date().toISOString()
  });
}
