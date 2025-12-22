// 外部バックエンド接続設定
export const BACKENDS = {
  vercel: 'https://tkghd-api.vercel.app',
  local_zengin: 'http://localhost:8082',
  railway: 'https://hopeful-liberation-production-9d00.up.railway.app'
} as const;

export const API_ROUTES = {
  // Vercel API
  health: `${BACKENDS.vercel}/api/health`,
  transferAll: `${BACKENDS.vercel}/api/transfer-all`,
  realTransfer: `${BACKENDS.vercel}/api/real-transfer`,
  atmWithdraw: `${BACKENDS.vercel}/api/atm-withdraw`,
  virtualCard: `${BACKENDS.vercel}/api/virtual-card`,
  cryptoWallet: `${BACKENDS.vercel}/api/crypto-wallet`,
  ownerVault: `${BACKENDS.vercel}/api/owner-vault`,
  
  // 全銀ゲートウェイ
  zenginStatus: `${BACKENDS.local_zengin}/api/zengin/status`,
  zenginTransfer: `${BACKENDS.local_zengin}/api/zengin/transfer`
} as const;
