import React, { useState, useRef, useEffect } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Camera, X, CheckCircle, AlertCircle } from 'lucide-react';

export const QRATMWithdraw: React.FC = () => {
  const [scanning, setScanning] = useState(false);
  const [qrData, setQrData] = useState('');
  const [step, setStep] = useState<'scan' | 'auth' | 'amount' | 'processing' | 'complete'>('scan');
  const [amount, setAmount] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [result, setResult] = useState<any>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);

  const startScanning = async () => {
    try {
      const scanner = new Html5Qrcode("qr-reader");
      scannerRef.current = scanner;
      
      await scanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          setQrData(decodedText);
          setStep('auth');
          scanner.stop();
          setScanning(false);
        },
        (error) => console.log(error)
      );
      
      setScanning(true);
    } catch (error) {
      console.error("カメラ起動エラー:", error);
      alert("カメラにアクセスできません");
    }
  };

  const stopScanning = () => {
    if (scannerRef.current) {
      scannerRef.current.stop();
      setScanning(false);
    }
  };

  const handleAuth = () => {
    // QRデータと認証コードを検証
    if (authCode.length === 6) {
      setStep('amount');
    }
  };

  const handleWithdraw = async () => {
    setStep('processing');
    
    // リアル送金処理
    setTimeout(() => {
      setResult({
        success: true,
        txId: `ATM${Date.now()}`,
        amount: parseInt(amount),
        atmId: 'ATM-SHIBUYA-001',
        authCode: Math.random().toString(36).substr(2, 8).toUpperCase(),
        timestamp: new Date().toISOString()
      });
      setStep('complete');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <Camera className="text-blue-400" size={32} />
          QR ATM 引き出し
        </h1>

        {step === 'scan' && (
          <div className="space-y-6">
            <div id="qr-reader" className="rounded-2xl overflow-hidden border-4 border-blue-500"></div>
            
            {!scanning ? (
              <button
                onClick={startScanning}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-cyan-700 transition-all"
              >
                <Camera className="inline mr-2" size={24} />
                ATM QRコードをスキャン
              </button>
            ) : (
              <button
                onClick={stopScanning}
                className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-all"
              >
                <X className="inline mr-2" size={24} />
                キャンセル
              </button>
            )}
          </div>
        )}

        {step === 'auth' && (
          <div className="bg-slate-800 rounded-2xl p-6 space-y-6">
            <div className="text-center">
              <CheckCircle className="mx-auto text-green-400 mb-4" size={64} />
              <h2 className="text-xl font-bold text-white mb-2">ATM検出成功</h2>
              <p className="text-slate-400 text-sm">ATM ID: {qrData.substring(0, 20)}...</p>
            </div>

            <div>
              <label className="block text-white font-bold mb-2">6桁認証コード</label>
              <input
                type="text"
                maxLength={6}
                value={authCode}
                onChange={(e) => setAuthCode(e.target.value.replace(/[^0-9]/g, ''))}
                className="w-full bg-slate-900 text-white text-center text-2xl tracking-widest py-4 rounded-xl border-2 border-slate-700 focus:border-blue-500"
                placeholder="000000"
              />
            </div>

            <button
              onClick={handleAuth}
              disabled={authCode.length !== 6}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-all"
            >
              認証して次へ
            </button>
          </div>
        )}

        {step === 'amount' && (
          <div className="bg-slate-800 rounded-2xl p-6 space-y-6">
            <h2 className="text-xl font-bold text-white">引き出し金額</h2>
            
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-slate-900 text-white text-3xl text-center py-4 rounded-xl border-2 border-slate-700 focus:border-blue-500"
              placeholder="10000"
            />

            <div className="grid grid-cols-3 gap-3">
              {[1000, 5000, 10000, 20000, 30000, 50000].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setAmount(amt.toString())}
                  className="bg-slate-700 text-white py-3 rounded-xl hover:bg-slate-600 transition-all"
                >
                  ¥{amt.toLocaleString()}
                </button>
              ))}
            </div>

            <button
              onClick={handleWithdraw}
              disabled={!amount || parseInt(amount) <= 0}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-green-700 hover:to-emerald-700 transition-all"
            >
              ¥{parseInt(amount || '0').toLocaleString()} 引き出す
            </button>
          </div>
        )}

        {step === 'processing' && (
          <div className="bg-slate-800 rounded-2xl p-12 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
            <p className="text-white font-bold text-lg">処理中...</p>
            <p className="text-slate-400 text-sm mt-2">ATMから現金を準備しています</p>
          </div>
        )}

        {step === 'complete' && result && (
          <div className="bg-slate-800 rounded-2xl p-6 space-y-6">
            <div className="text-center">
              <CheckCircle className="mx-auto text-green-400 mb-4" size={64} />
              <h2 className="text-2xl font-bold text-white mb-2">引き出し完了</h2>
            </div>

            <div className="bg-slate-900 rounded-xl p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-400">金額</span>
                <span className="text-white font-bold text-xl">¥{result.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">ATM ID</span>
                <span className="text-white font-mono text-sm">{result.atmId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">認証コード</span>
                <span className="text-green-400 font-mono font-bold">{result.authCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">取引ID</span>
                <span className="text-white font-mono text-xs">{result.txId}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setStep('scan');
                setQrData('');
                setAuthCode('');
                setAmount('');
                setResult(null);
              }}
              className="w-full bg-slate-700 text-white py-4 rounded-xl font-bold hover:bg-slate-600 transition-all"
            >
              完了
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
