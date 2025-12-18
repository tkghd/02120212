export const API_BASE_URL = 'https://tkghd-api.vercel.app';

export const API_ENDPOINTS = {
  health: '/api/health',
  transfer: '/api/secure-transfer',
  signed: '/api/signed',
  ai: '/api/ai',
  webhook: '/api/webhook',
  ultimate: '/api/ultimate'
} as const;
