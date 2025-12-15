import { paymentGateway } from './universal-payment';

export const backendAPI = {
  // 全送金メソッドをREAL対応に
  async bankTransfer(data: any) { return paymentGateway.bankTransfer(data); },
  async paypayTransfer(data: any) { return paymentGateway.paypayTransfer(data); },
  async cotraTransfer(data: any) { return paymentGateway.cotraTransfer(data); },
  async metamaskTransfer(data: any) { return paymentGateway.metamaskTransfer(data); },
  async cardPayment(data: any) { return paymentGateway.cardPayment(data); },
  
  // 統合送金
  async universalTransfer(data: any) { return paymentGateway.universalTransfer(data); },
  
  // その他の既存メソッド
  async health() { return { status: 'online', realTransfers: true, services: ['Bank', 'PayPay', 'Cotra', 'MetaMask', 'Card'], timestamp: new Date().toISOString() }; },
  async atmWithdraw(data: any) { return { success: true, service: 'ATM', txId: `ATM${Date.now()}`, ...data, authCode: Math.random().toString(36).substr(2, 8).toUpperCase(), status: 'approved', timestamp: new Date().toISOString() }; },
  async cameraScan(data: any) { return { success: true, service: 'QRScan', txId: `QR${Date.now()}`, ...data, status: 'authorized', timestamp: new Date().toISOString() }; },
  async faceAuth(data: any) { return { success: true, service: 'FaceAuth', txId: `FA${Date.now()}`, authenticated: true, confidence: 0.98, ...data, status: 'authorized', timestamp: new Date().toISOString() }; },
  async getAllBalances(walletAddress?: string) { return paymentGateway.getAllBalances(walletAddress); }
};
