import { ethers } from 'ethers';
import { backendInfra } from './backend-infrastructure';

// ⚡ GODMODE API - チート級マイクロサービス
export class GodModeAPI {
  private apiKeys = {
    coingecko: 'CG-demo-api-key',
    etherscan: 'demo',
    polygonscan: 'demo',
    alchemy: 'demo',
    infura: 'demo',
    moralis: 'demo'
  };

  // 💎 リアルタイム価格取得 (全チェーン)
  async getPrices() {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=matic-network,ethereum,bitcoin,tether,usd-coin,binancecoin,arbitrum&vs_currencies=usd,jpy&include_24hr_change=true');
      const data = await response.json();
      
      return {
        MATIC: { usd: data['matic-network'].usd, jpy: data['matic-network'].jpy, change24h: data['matic-network'].usd_24h_change },
        ETH: { usd: data['ethereum'].usd, jpy: data['ethereum'].jpy, change24h: data['ethereum'].usd_24h_change },
        BTC: { usd: data['bitcoin'].usd, jpy: data['bitcoin'].jpy, change24h: data['bitcoin'].usd_24h_change },
        USDT: { usd: data['tether'].usd, jpy: data['tether'].jpy, change24h: data['tether'].usd_24h_change },
        USDC: { usd: data['usd-coin'].usd, jpy: data['usd-coin'].jpy, change24h: data['usd-coin'].usd_24h_change },
        BNB: { usd: data['binancecoin'].usd, jpy: data['binancecoin'].jpy, change24h: data['binancecoin'].usd_24h_change },
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return { error: 'Price fetch failed' };
    }
  }

  // 🔥 スーパーチャージ送金 (最速・最安)
  async superChargedTransfer(params: {
    from: string;
    to: string;
    amount: string;
    token: string;
    network: string;
    maxGas?: string;
  }) {
    try {
      if (!window.ethereum) throw new Error('MetaMask required');
      
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      // ガス価格最適化
      const feeData = await provider.getFeeData();
      const gasPrice = params.maxGas ? ethers.parseUnits(params.maxGas, 'gwei') : feeData.gasPrice;
      
      // 高速レーン使用
      const priorityFee = feeData.maxPriorityFeePerGas ? 
        feeData.maxPriorityFeePerGas * BigInt(150) / BigInt(100) : // 1.5倍
        ethers.parseUnits('2', 'gwei');
      
      let tx;
      if (params.token === 'native') {
        tx = await signer.sendTransaction({
          to: params.to,
          value: ethers.parseEther(params.amount),
          maxFeePerGas: gasPrice,
          maxPriorityFeePerGas: priorityFee
        });
      } else {
        // ERC20トークン高速送金
        const tokenAddr = this.getTokenAddress(params.token, params.network);
        const contract = new ethers.Contract(
          tokenAddr,
          ['function transfer(address,uint256) returns(bool)'],
          signer
        );
        tx = await contract.transfer(
          params.to, 
          ethers.parseUnits(params.amount, 18),
          { maxFeePerGas: gasPrice, maxPriorityFeePerGas: priorityFee }
        );
      }
      
      return {
        success: true,
        txHash: tx.hash,
        mode: 'SUPERCHARGED',
        estimatedTime: '10-30 seconds',
        explorer: `https://${params.network}scan.com/tx/${tx.hash}`
      };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // 💰 瞬間残高スナップショット (全ウォレット)
  async instantBalanceSnapshot(addresses: string[]) {
    const snapshot: any = {};
    
    await Promise.all(addresses.map(async (address) => {
      const balances = await backendInfra.getMultiChainBalance(address);
      snapshot[address] = balances;
    }));
    
    return snapshot;
  }

  // 📊 トークンポートフォリオ分析
  async analyzePortfolio(address: string) {
    try {
      // Moralis/Alchemy API統合
      const balances = await backendInfra.getMultiChainBalance(address);
      const prices = await this.getPrices();
      
      const portfolio: any = { address, total: { usd: 0, jpy: 0 }, tokens: [] };
      
      for (const [network, data] of Object.entries(balances)) {
        if (typeof data === 'object' && 'native' in data) {
          const amount = parseFloat(data.native);
          const symbol = network === 'polygon' ? 'MATIC' : 'ETH';
          const price: any = prices[symbol] || { usd: 0, jpy: 0 };
          
          const valueUsd = amount * price.usd;
          const valueJpy = amount * price.jpy;
          
          portfolio.tokens.push({
            network,
            symbol,
            amount,
            valueUsd,
            valueJpy,
            change24h: price.change24h
          });
          
          portfolio.total.usd += valueUsd;
          portfolio.total.jpy += valueJpy;
        }
      }
      
      return portfolio;
    } catch (error: any) {
      return { error: error.message };
    }
  }

  // 🎯 スマートルーティング (最安ルート自動選択)
  async findBestRoute(params: {
    from: string;
    to: string;
    amount: string;
    token: string;
  }) {
    const routes = [
      { network: 'polygon', estimatedGas: 0.001, fee: 0.1, time: '30s' },
      { network: 'arbitrum', estimatedGas: 0.0001, fee: 0.05, time: '45s' },
      { network: 'bsc', estimatedGas: 0.0005, fee: 0.08, time: '20s' }
    ];
    
    // ガス価格取得して最適化
    const gasPromises = routes.map(async (route) => {
      const gas = await backendInfra.getOptimalGasPrice(route.network as any);
      return { ...route, gasPrice: gas };
    });
    
    const routesWithGas = await Promise.all(gasPromises);
    
    // 最安ルート選択
    const bestRoute = routesWithGas.sort((a, b) => a.fee - b.fee)[0];
    
    return {
      recommended: bestRoute.network,
      routes: routesWithGas,
      savings: `${((routes[0].fee - bestRoute.fee) / routes[0].fee * 100).toFixed(1)}%`
    };
  }

  // 🔮 AI予測価格
  async predictPrice(token: string, timeframe: '1h' | '24h' | '7d' = '24h') {
    try {
      // CoinGecko履歴データ取得
      const days = timeframe === '1h' ? 1 : timeframe === '24h' ? 1 : 7;
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${token}/market_chart?vs_currency=usd&days=${days}`);
      const data = await response.json();
      
      const prices = data.prices.map((p: any) => p[1]);
      const current = prices[prices.length - 1];
      const avg = prices.reduce((a: number, b: number) => a + b, 0) / prices.length;
      const trend = current > avg ? 'bullish' : 'bearish';
      
      // 簡易AI予測
      const prediction = current + (current - avg) * 0.5;
      
      return {
        token,
        current,
        predicted: prediction,
        trend,
        confidence: Math.abs((prediction - current) / current * 100).toFixed(1) + '%',
        timeframe
      };
    } catch (error) {
      return { error: 'Prediction failed' };
    }
  }

  // 🚨 フラッシュアラート (価格変動通知)
  watchPrice(token: string, threshold: number, callback: (data: any) => void) {
    let lastPrice = 0;
    
    const check = async () => {
      const prices = await this.getPrices();
      const current = prices[token as keyof typeof prices];
      
      if (typeof current === 'object' && 'usd' in current) {
        if (lastPrice > 0 && Math.abs(current.usd - lastPrice) / lastPrice > threshold / 100) {
          callback({
            token,
            from: lastPrice,
            to: current.usd,
            change: ((current.usd - lastPrice) / lastPrice * 100).toFixed(2) + '%',
            alert: 'THRESHOLD_EXCEEDED'
          });
        }
        lastPrice = current.usd;
      }
    };
    
    setInterval(check, 10000); // 10秒ごと
    check();
  }

  // 🏦 マルチ取引所価格比較
  async compareExchanges(token: string) {
    // 複数の取引所APIから価格取得
    const exchanges = [
      { name: 'Binance', api: `https://api.binance.com/api/v3/ticker/price?symbol=${token}USDT` },
      { name: 'Coinbase', api: `https://api.coinbase.com/v2/prices/${token}-USD/spot` },
      { name: 'Kraken', api: `https://api.kraken.com/0/public/Ticker?pair=${token}USD` }
    ];
    
    const prices = await Promise.all(
      exchanges.map(async (ex) => {
        try {
          const res = await fetch(ex.api);
          const data = await res.json();
          return { exchange: ex.name, price: parseFloat(data.price || data.data?.amount || '0'), available: true };
        } catch {
          return { exchange: ex.name, price: 0, available: false };
        }
      })
    );
    
    const validPrices = prices.filter(p => p.available && p.price > 0);
    const best = validPrices.sort((a, b) => a.price - b.price)[0];
    const worst = validPrices.sort((a, b) => b.price - a.price)[0];
    
    return {
      token,
      best,
      worst,
      arbitrage: worst && best ? ((worst.price - best.price) / best.price * 100).toFixed(2) + '%' : '0%',
      all: prices
    };
  }

  // ヘルパー
  private getTokenAddress(token: string, network: string): string {
    const tokens: any = {
      polygon: {
        USDT: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
        USDC: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359'
      },
      ethereum: {
        USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
      }
    };
    return tokens[network]?.[token] || '';
  }
}

export const godAPI = new GodModeAPI();
