import { productionGateway } from './production-gateway';

export const backendAPI = {
  // 🦊 MetaMask REAL送金
  async metamaskTransfer(data: any) { 
    return productionGateway.sendCrypto(data); 
  },
  
  // 💰 REAL残高取得
  async getRealBalances(walletAddress?: string) { 
    return productionGateway.getRealBalances(walletAddress); 
  },
  
  // 📊 REAL履歴取得
  async getTransactionHistory(address: string, network?: 'polygon' | 'ethereum') {
    return productionGateway.getTransactionHistory(address, network);
  },
  
  // 🔄 トランザクション監視
  watchTransaction(txHash: string, network: 'polygon' | 'ethereum', callback: (status: any) => void) {
    productionGateway.watchTransaction(txHash, network, callback);
  },

  // その他の既存メソッド（モック）
  async health() { return { status: 'online', production: true, realCrypto: true, services: ['MetaMask', 'Polygon', 'Ethereum'], timestamp: new Date().toISOString() }; },
  async bankTransfer(data: any) { return { success: true, service: 'Bank', txId: `BANK${Date.now()}`, ...data, status: 'processing', note: 'Real bank API integration pending', timestamp: new Date().toISOString() }; },
  async paypayTransfer(data: any) { return { success: true, service: 'PayPay', txId: `PP${Date.now()}`, ...data, status: 'completed', note: 'Real PayPay API integration pending', timestamp: new Date().toISOString() }; },
  async cotraTransfer(data: any) { return { success: true, service: 'Cotra', txId: `CT${Date.now()}`, ...data, status: 'completed', timestamp: new Date().toISOString() }; },
  async cardPayment(data: any) { return { success: true, service: 'Card', txId: `CD${Date.now()}`, cardLast4: data.cardNumber?.slice(-4), ...data, status: 'authorized', timestamp: new Date().toISOString() }; },
  async atmWithdraw(data: any) { return { success: true, service: 'ATM', txId: `ATM${Date.now()}`, ...data, authCode: Math.random().toString(36).substr(2, 8).toUpperCase(), status: 'approved', timestamp: new Date().toISOString() }; },
  async cameraScan(data: any) { return { success: true, service: 'QRScan', txId: `QR${Date.now()}`, ...data, status: 'authorized', timestamp: new Date().toISOString() }; },
  async faceAuth(data: any) { return { success: true, service: 'FaceAuth', txId: `FA${Date.now()}`, authenticated: true, confidence: 0.98, ...data, status: 'authorized', timestamp: new Date().toISOString() }; },
  async getAllBalances(walletAddress?: string) { return this.getRealBalances(walletAddress); }
};
