// バックエンドエンドポイント統合設定
export const BACKENDS = {
  vercel: 'https://tkghd-api-azure.vercel.app',
  railway: 'https://hopeful-liberation-production-9d00.up.railway.app',
  local_zengin: 'http://localhost:8082'
} as const;

export const API_ROUTES = {
  // Vercel API（メイン - 高速・安定）
  health: `${BACKENDS.vercel}/api/health`,
  transferAll: `${BACKENDS.vercel}/api/transfer-all`,
  realTransfer: `${BACKENDS.vercel}/api/real-transfer`,
  atmWithdraw: `${BACKENDS.vercel}/api/atm-withdraw`,
  virtualCard: `${BACKENDS.vercel}/api/virtual-card`,
  cryptoWallet: `${BACKENDS.vercel}/api/crypto-wallet`,
  ownerVault: `${BACKENDS.vercel}/api/owner-vault`,
  pinVerify: `${BACKENDS.vercel}/api/verify-pin`,
  zkpProof: `${BACKENDS.vercel}/api/zkp-proof`,
  
  // Railway API（全銀統合）
  zenginBanks: `${BACKENDS.railway}/api/zengin/banks`,
  zenginStatus: `${BACKENDS.railway}/api/zengin/status`,
  zenginTransfer: `${BACKENDS.railway}/api/zengin/transfer`
} as const;

// バックエンド選択ロジック
export function getBackendFor(apiType: string): string {
  const railwayAPIs = ['zengin', 'bank-network'];
  return railwayAPIs.some(type => apiType.includes(type)) 
    ? BACKENDS.railway 
    : BACKENDS.vercel;
}
