export const backendAPI = {
  async health() { return { status: 'online', services: ['PayPay', 'Cotra', 'Bank', 'Card', 'ATM', 'Camera'], timestamp: new Date().toISOString() }; },
  async paypayTransfer(data: any) { return { success: true, service: 'PayPay', txId: `PP${Date.now()}`, ...data, status: 'completed', timestamp: new Date().toISOString() }; },
  async cotraTransfer(data: any) { return { success: true, service: 'Cotra', txId: `CT${Date.now()}`, ...data, status: 'completed', timestamp: new Date().toISOString() }; },
  async bankTransfer(data: any) { return { success: true, service: 'Bank', txId: `BK${Date.now()}`, ...data, status: 'pending', timestamp: new Date().toISOString() }; },
  async cardPayment(data: any) { return { success: true, service: 'Card', txId: `CD${Date.now()}`, cardLast4: data.cardNumber?.slice(-4), ...data, status: 'authorized', timestamp: new Date().toISOString() }; },
  async atmWithdraw(data: any) { return { success: true, service: 'ATM', txId: `ATM${Date.now()}`, ...data, authCode: Math.random().toString(36).substr(2, 8).toUpperCase(), status: 'approved', timestamp: new Date().toISOString() }; },
  async cameraScan(data: any) { return { success: true, service: 'QRScan', txId: `QR${Date.now()}`, ...data, status: 'authorized', timestamp: new Date().toISOString() }; },
  async faceAuth(data: any) { return { success: true, service: 'FaceAuth', txId: `FA${Date.now()}`, authenticated: true, confidence: 0.98, ...data, status: 'authorized', timestamp: new Date().toISOString() }; },
  async getAllBalances() { return { paypay: { balance: 15000, currency: 'JPY' }, cotra: { balance: 250000, currency: 'JPY' }, bank: { balance: 1500000, currency: 'JPY' }, card: { available: 500000, limit: 1000000, currency: 'JPY' }, crypto: { btc: 0.05, eth: 1.2, usdt: 10000 }, timestamp: new Date().toISOString() }; }
};
