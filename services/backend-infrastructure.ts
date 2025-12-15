import { ethers } from 'ethers';

// 🔥 強化されたバックエンドインフラ
export class BackendInfrastructure {
  private cache: Map<string, any> = new Map();
  private wsConnections: Map<string, WebSocket> = new Map();
  
  // 🌐 マルチチェーンRPC (フォールバック対応)
  private rpcs = {
    polygon: [
      'https://polygon-rpc.com',
      'https://rpc-mainnet.maticvigil.com',
      'https://polygon-bor.publicnode.com'
    ],
    ethereum: [
      'https://eth.llamarpc.com',
      'https://rpc.ankr.com/eth',
      'https://ethereum.publicnode.com'
    ],
    arbitrum: [
      'https://arb1.arbitrum.io/rpc',
      'https://arbitrum-one.publicnode.com'
    ],
    bsc: [
      'https://bsc-dataseed.binance.org',
      'https://bsc-dataseed1.defibit.io'
    ]
  };

  // 📡 WebSocket リアルタイム通信
  async connectWebSocket(url: string) {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(url);
      ws.onopen = () => {
        console.log('WebSocket connected:', url);
        resolve(ws);
      };
      ws.onerror = (error) => reject(error);
      this.wsConnections.set(url, ws);
    });
  }

  // 💾 キャッシュシステム
  setCache(key: string, value: any, ttl: number = 60000) {
    this.cache.set(key, { value, expires: Date.now() + ttl });
  }

  getCache(key: string) {
    const cached = this.cache.get(key);
    if (cached && cached.expires > Date.now()) {
      return cached.value;
    }
    this.cache.delete(key);
    return null;
  }

  // 🔄 フォールバックRPCプロバイダー
  async getProvider(network: keyof typeof this.rpcs) {
    const rpcList = this.rpcs[network];
    
    for (const rpc of rpcList) {
      try {
        const provider = new ethers.JsonRpcProvider(rpc);
        await provider.getBlockNumber(); // 接続確認
        return provider;
      } catch (e) {
        console.warn(`RPC failed: ${rpc}`);
        continue;
      }
    }
    
    throw new Error(`All RPCs failed for ${network}`);
  }

  // 📊 ガス価格最適化
  async getOptimalGasPrice(network: 'polygon' | 'ethereum' | 'arbitrum' | 'bsc') {
    const cacheKey = `gas_${network}`;
    const cached = this.getCache(cacheKey);
    if (cached) return cached;

    try {
      const provider = await this.getProvider(network);
      const feeData = await provider.getFeeData();
      
      const optimal = {
        maxFeePerGas: feeData.maxFeePerGas?.toString(),
        maxPriorityFeePerGas: feeData.maxPriorityFeePerGas?.toString(),
        gasPrice: feeData.gasPrice?.toString(),
        network
      };
      
      this.setCache(cacheKey, optimal, 10000);
      return optimal;
    } catch (error) {
      return { error: 'Gas price fetch failed' };
    }
  }

  // 🔐 トランザクション検証
  async verifyTransaction(txHash: string, network: string) {
    try {
      const provider = await this.getProvider(network as any);
      const receipt = await provider.getTransactionReceipt(txHash);
      
      if (!receipt) {
        return { verified: false, status: 'pending' };
      }
      
      return {
        verified: true,
        status: receipt.status === 1 ? 'success' : 'failed',
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed.toString(),
        from: receipt.from,
        to: receipt.to,
        confirmations: await provider.getBlockNumber() - receipt.blockNumber
      };
    } catch (error: any) {
      return { verified: false, error: error.message };
    }
  }

  // 💰 マルチチェーン残高取得
  async getMultiChainBalance(address: string) {
    const balances: any = {};
    
    const networks: Array<keyof typeof this.rpcs> = ['polygon', 'ethereum', 'arbitrum', 'bsc'];
    
    await Promise.all(networks.map(async (network) => {
      try {
        const provider = await this.getProvider(network);
        const balance = await provider.getBalance(address);
        
        balances[network] = {
          native: ethers.formatEther(balance),
          address,
          explorer: this.getExplorerUrl(address, network)
        };
      } catch (e) {
        balances[network] = { error: 'Failed to fetch' };
      }
    }));
    
    return balances;
  }

  // 🔗 エクスプローラーURL生成
  getExplorerUrl(addressOrTx: string, network: string): string {
    const explorers: any = {
      polygon: 'https://polygonscan.com',
      ethereum: 'https://etherscan.io',
      arbitrum: 'https://arbiscan.io',
      bsc: 'https://bscscan.com'
    };
    
    const isAddress = addressOrTx.length === 42;
    const type = isAddress ? 'address' : 'tx';
    
    return `${explorers[network]}/${type}/${addressOrTx}`;
  }

  // 📈 トランザクション履歴 (高速取得)
  async getTransactionHistory(address: string, network: string, limit: number = 20) {
    const cacheKey = `history_${address}_${network}`;
    const cached = this.getCache(cacheKey);
    if (cached) return cached;

    try {
      const provider = await this.getProvider(network as any);
      const latestBlock = await provider.getBlockNumber();
      const history = [];
      
      // 最新100ブロックを並列取得
      const blockPromises = [];
      for (let i = 0; i < 100; i++) {
        blockPromises.push(provider.getBlock(latestBlock - i, true));
      }
      
      const blocks = await Promise.all(blockPromises);
      
      for (const block of blocks) {
        if (!block || !block.transactions) continue;
        
        for (const tx of block.transactions) {
          if (typeof tx === 'string') continue;
          
          if (tx.from.toLowerCase() === address.toLowerCase() || 
              tx.to?.toLowerCase() === address.toLowerCase()) {
            history.push({
              hash: tx.hash,
              from: tx.from,
              to: tx.to,
              value: ethers.formatEther(tx.value),
              blockNumber: tx.blockNumber,
              timestamp: block.timestamp,
              type: tx.from.toLowerCase() === address.toLowerCase() ? 'sent' : 'received'
            });
            
            if (history.length >= limit) break;
          }
        }
        
        if (history.length >= limit) break;
      }
      
      this.setCache(cacheKey, history, 30000);
      return history;
    } catch (error: any) {
      return { error: error.message };
    }
  }

  // 🔔 リアルタイム通知システム
  subscribeToAddress(address: string, callback: (event: any) => void) {
    // WebSocket経由でリアルタイム監視
    const wsUrl = 'wss://polygon-rpc.com';
    
    this.connectWebSocket(wsUrl).then((ws: any) => {
      ws.send(JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'eth_subscribe',
        params: ['logs', { address }]
      }));
      
      ws.onmessage = (event: any) => {
        const data = JSON.parse(event.data);
        callback(data);
      };
    }).catch(console.error);
  }

  // 🛡️ セキュリティ検証
  async validateAddress(address: string): Promise<boolean> {
    try {
      return ethers.isAddress(address);
    } catch {
      return false;
    }
  }

  async estimateGas(tx: any, network: string) {
    try {
      const provider = await this.getProvider(network as any);
      const estimate = await provider.estimateGas(tx);
      return { success: true, gasLimit: estimate.toString() };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
}

export const backendInfra = new BackendInfrastructure();
