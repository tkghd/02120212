import { ethers } from 'ethers';

// 🔐 本番環境設定
const PRODUCTION_CONFIG = {
  // Polygon Mainnet (実際の送金)
  POLYGON_RPC: 'https://polygon-rpc.com',
  POLYGON_CHAIN_ID: 137,
  
  // Ethereum Mainnet
  ETHEREUM_RPC: 'https://eth.llamarpc.com',
  ETHEREUM_CHAIN_ID: 1,
  
  // API Endpoints
  BANK_API: 'https://api.banking-service.com/v1',
  PAYPAY_API: 'https://api.paypay.ne.jp/v2',
  STRIPE_API: 'https://api.stripe.com/v1'
};

// 🌐 本番決済ゲートウェイ
export class ProductionPaymentGateway {
  private polygonProvider: ethers.JsonRpcProvider;
  private ethereumProvider: ethers.JsonRpcProvider;

  constructor() {
    this.polygonProvider = new ethers.JsonRpcProvider(PRODUCTION_CONFIG.POLYGON_RPC);
    this.ethereumProvider = new ethers.JsonRpcProvider(PRODUCTION_CONFIG.ETHEREUM_RPC);
  }

  // 🦊 MetaMask リアル送金 (Polygon/Ethereum)
  async sendCrypto(params: {
    to: string;
    amount: string;
    token?: 'MATIC' | 'ETH' | 'USDT' | 'USDC';
    network?: 'polygon' | 'ethereum';
  }) {
    try {
      if (!window.ethereum) {
        throw new Error('MetaMaskをインストールしてください');
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      
      // アカウント接続
      const accounts = await provider.send("eth_requestAccounts", []);
      if (accounts.length === 0) {
        throw new Error('ウォレットが接続されていません');
      }

      const signer = await provider.getSigner();
      const network = params.network || 'polygon';
      
      // ネットワーク切り替え
      const chainId = network === 'polygon' ? '0x89' : '0x1';
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId }],
        });
      } catch (switchError: any) {
        if (switchError.code === 4902) {
          // Polygonネットワーク追加
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0x89',
              chainName: 'Polygon Mainnet',
              nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
              rpcUrls: [PRODUCTION_CONFIG.POLYGON_RPC],
              blockExplorerUrls: ['https://polygonscan.com/']
            }]
          });
        } else {
          throw switchError;
        }
      }

      let tx;
      const token = params.token || 'MATIC';

      // トークン別送金処理
      if (token === 'USDT' || token === 'USDC') {
        const tokenAddresses: any = {
          polygon: {
            USDT: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
            USDC: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359'
          },
          ethereum: {
            USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
            USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
          }
        };

        const tokenAddress = tokenAddresses[network][token];
        const decimals = token === 'USDT' && network === 'ethereum' ? 6 : 18;
        
        const tokenContract = new ethers.Contract(
          tokenAddress,
          [
            'function transfer(address to, uint256 amount) returns (bool)',
            'function balanceOf(address account) view returns (uint256)'
          ],
          signer
        );

        // 残高確認
        const balance = await tokenContract.balanceOf(accounts[0]);
        const requiredAmount = ethers.parseUnits(params.amount, decimals);
        
        if (balance < requiredAmount) {
          throw new Error(`残高不足: ${ethers.formatUnits(balance, decimals)} ${token}`);
        }

        // トークン送金実行
        tx = await tokenContract.transfer(params.to, requiredAmount);
      } else {
        // MATIC/ETH送金
        const balance = await provider.getBalance(accounts[0]);
        const requiredAmount = ethers.parseEther(params.amount);
        
        if (balance < requiredAmount) {
          throw new Error(`残高不足: ${ethers.formatEther(balance)} ${token}`);
        }

        tx = await signer.sendTransaction({
          to: params.to,
          value: requiredAmount
        });
      }

      // トランザクション確認待機
      const receipt = await tx.wait();

      // リアルタイム結果返却
      return {
        success: true,
        network,
        token,
        txHash: receipt.hash,
        blockNumber: receipt.blockNumber,
        from: accounts[0],
        to: params.to,
        amount: params.amount,
        gasUsed: receipt.gasUsed.toString(),
        effectiveGasPrice: receipt.gasPrice?.toString(),
        explorerUrl: network === 'polygon' 
          ? `https://polygonscan.com/tx/${receipt.hash}`
          : `https://etherscan.io/tx/${receipt.hash}`,
        timestamp: new Date().toISOString(),
        confirmed: true
      };

    } catch (error: any) {
      console.error('Crypto transfer error:', error);
      return { 
        success: false, 
        error: error.message || 'トランザクション失敗',
        details: error
      };
    }
  }

  // 💰 リアル残高取得
  async getRealBalances(walletAddress?: string) {
    const balances: any = {
      timestamp: new Date().toISOString(),
      real: true
    };

    try {
      // MetaMask接続チェック
      if (window.ethereum && walletAddress) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        
        // Polygon残高
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x89' }],
          });
          
          const maticBalance = await provider.getBalance(walletAddress);
          
          balances.polygon = {
            address: walletAddress,
            matic: ethers.formatEther(maticBalance),
            network: 'Polygon Mainnet',
            explorer: `https://polygonscan.com/address/${walletAddress}`
          };

          // USDT残高
          const usdtContract = new ethers.Contract(
            '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
            ['function balanceOf(address) view returns (uint256)'],
            provider
          );
          const usdtBalance = await usdtContract.balanceOf(walletAddress);
          balances.polygon.usdt = ethers.formatUnits(usdtBalance, 6);

          // USDC残高
          const usdcContract = new ethers.Contract(
            '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
            ['function balanceOf(address) view returns (uint256)'],
            provider
          );
          const usdcBalance = await usdcContract.balanceOf(walletAddress);
          balances.polygon.usdc = ethers.formatEther(usdcBalance);

        } catch (e) {
          console.warn('Polygon balance fetch failed:', e);
        }

        // Ethereum残高
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x1' }],
          });
          
          const ethBalance = await provider.getBalance(walletAddress);
          balances.ethereum = {
            address: walletAddress,
            eth: ethers.formatEther(ethBalance),
            network: 'Ethereum Mainnet',
            explorer: `https://etherscan.io/address/${walletAddress}`
          };
        } catch (e) {
          console.warn('Ethereum balance fetch failed:', e);
        }
      }

      // その他の残高（モック）
      balances.bank = { balance: 1500000, currency: 'JPY', real: false };
      balances.paypay = { balance: 15000, currency: 'JPY', real: false };
      balances.cotra = { balance: 250000, currency: 'JPY', real: false };

      return balances;
    } catch (error: any) {
      return { error: error.message, timestamp: new Date().toISOString() };
    }
  }

  // 📊 トランザクション履歴取得
  async getTransactionHistory(walletAddress: string, network: 'polygon' | 'ethereum' = 'polygon') {
    try {
      const provider = network === 'polygon' ? this.polygonProvider : this.ethereumProvider;
      const latestBlock = await provider.getBlockNumber();
      const history = [];

      // 最新50ブロック分を検索
      for (let i = 0; i < 50; i++) {
        const blockNumber = latestBlock - i;
        if (blockNumber < 0) break;

        const block = await provider.getBlock(blockNumber, true);
        if (!block || !block.transactions) continue;

        for (const tx of block.transactions) {
          if (typeof tx === 'string') continue;
          
          if (tx.from.toLowerCase() === walletAddress.toLowerCase() || 
              tx.to?.toLowerCase() === walletAddress.toLowerCase()) {
            history.push({
              hash: tx.hash,
              from: tx.from,
              to: tx.to,
              value: ethers.formatEther(tx.value),
              blockNumber: tx.blockNumber,
              timestamp: block.timestamp,
              type: tx.from.toLowerCase() === walletAddress.toLowerCase() ? 'sent' : 'received',
              explorerUrl: network === 'polygon'
                ? `https://polygonscan.com/tx/${tx.hash}`
                : `https://etherscan.io/tx/${tx.hash}`
            });
          }
        }

        if (history.length >= 10) break;
      }

      return { success: true, transactions: history, network };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // 🔄 リアルタイムトランザクション監視
  watchTransaction(txHash: string, network: 'polygon' | 'ethereum', callback: (status: any) => void) {
    const provider = network === 'polygon' ? this.polygonProvider : this.ethereumProvider;
    
    const checkStatus = async () => {
      try {
        const receipt = await provider.getTransactionReceipt(txHash);
        if (receipt) {
          callback({
            confirmed: true,
            blockNumber: receipt.blockNumber,
            status: receipt.status === 1 ? 'success' : 'failed',
            gasUsed: receipt.gasUsed.toString()
          });
          return true;
        }
        return false;
      } catch (e) {
        return false;
      }
    };

    // 5秒ごとにチェック
    const interval = setInterval(async () => {
      const confirmed = await checkStatus();
      if (confirmed) {
        clearInterval(interval);
      }
    }, 5000);

    // 初回即座にチェック
    checkStatus();
  }
}

// グローバルインスタンス
export const productionGateway = new ProductionPaymentGateway();
