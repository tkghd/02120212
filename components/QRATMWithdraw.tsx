import React, { useState, useRef, useEffect } from 'react';
import { Camera, X, CheckCircle, AlertCircle, Scan } from 'lucide-react';

export const QRATMWithdraw: React.FC = () => {
  const [scanning, setScanning] = useState(false);
  const [qrData, setQrData] = useState('');
  const [step, setStep] = useState<'scan' | 'auth' | 'amount' | 'processing' | 'complete'>('scan');
  const [amount, setAmount] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      setError('');
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' },
        audio: false 
      });
      
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setScanning(true);
      
      // 簡易QR検出シミュレーション（実際はhtml5-qrcode使用）
      setTimeout(() => {
        setQrData(`ATM-SHIBUYA-${Date.now()}`);
        setStep('auth');
        stopCamera();
      }, 3000);
      
    } catch (err: any) {
      console.error("カメラエラー:", err);
      setError(`カメラアクセスエラー: ${err.message}`);
      
      // カメラなしでもテストできるようにダミーデータ
      setTimeout(() => {
        if (confirm('カメラが使えません。テストモードで続行しますか？')) {
          setQrData(`ATM-TEST-${Date.now()}`);
          setStep('auth');
        }
      }, 1000);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setScanning(false);
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  const handleAuth = () => {
    if (authCode.length === 6) {
      setStep('amount');
    }
  };

  const handleWithdraw = async () => {
    setStep('processing');
    
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
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Camera className="text-blue-400" size={28} />
            QR ATM 引き出し
          </h1>
        </div>

        {step === 'scan' && (
          <div className="space-y-4">
            {scanning && (
              <div className="relative rounded-2xl overflow-hidden bg-black">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-[400px] object-cover"
                />
                <canvas ref={canvasRef} className="hidden" />
                <div className="absolute inset-0 border-4 border-blue-500 m-12 rounded-xl pointer-events-none">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-400"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-400"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-400"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-400"></div>
                </div>
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <p className="text-white font-bold bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full inline-block">
                    <Scan className="inline animate-pulse mr-2" size={20} />
                    QRコードをスキャン中...
                  </p>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-900/50 border border-red-500 rounded-xl p-4 text-red-200 text-sm">
                <AlertCircle className="inline mr-2" size={20} />
                {error}
              </div>
            )}

            {!scanning ? (
              <button
                onClick={startCamera}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg"
              >
                <Camera className="inline mr-2" size={24} />
                カメラを起動
              </button>
            ) : (
              <button
                onClick={stopCamera}
                className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-all"
              >
                <X className="inline mr-2" size={24} />
                キャンセル
              </button>
            )}

            <div className="bg-slate-800/50 rounded-xl p-4 text-slate-300 text-sm">
              <p className="font-bold mb-2">💡 ヒント:</p>
              <ul className="space-y-1 text-xs">
                <li>• ATMのQRコードにカメラを向けてください</li>
                <li>• 明るい場所でスキャンしてください</li>
                <li>• カメラが使えない場合はテストモードで続行できます</li>
              </ul>
            </div>
          </div>
        )}

        {step === 'auth' && (
          <div className="bg-slate-800 rounded-2xl p-6 space-y-6">
            <div className="text-center">
              <CheckCircle className="mx-auto text-green-400 mb-4" size={64} />
              <h2 className="text-xl font-bold text-white mb-2">ATM検出成功</h2>
              <p className="text-slate-400 text-sm">ATM ID: {qrData}</p>
            </div>

            <div>
              <label className="block text-white font-bold mb-2">6桁認証コード</label>
              <input
                type="tel"
                maxLength={6}
                value={authCode}
                onChange={(e) => setAuthCode(e.target.value.replace(/[^0-9]/g, ''))}
                className="w-full bg-slate-900 text-white text-center text-3xl tracking-widest py-4 rounded-xl border-2 border-slate-700 focus:border-blue-500 focus:outline-none"
                placeholder="000000"
                autoFocus
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
            
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-2xl">¥</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-slate-900 text-white text-3xl text-center py-4 pl-12 rounded-xl border-2 border-slate-700 focus:border-blue-500 focus:outline-none"
                placeholder="10000"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[1000, 5000, 10000, 20000, 30000, 50000].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setAmount(amt.toString())}
                  className="bg-slate-700 text-white py-3 rounded-xl hover:bg-slate-600 transition-all font-bold"
                >
                  ¥{amt.toLocaleString()}
                </button>
              ))}
            </div>

            <button
              onClick={handleWithdraw}
              disabled={!amount || parseInt(amount) <= 0}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg"
            >
              ¥{parseInt(amount || '0').toLocaleString()} 引き出す
            </button>
          </div>
        )}

        {step === 'processing' && (
          <div className="bg-slate-800 rounded-2xl p-12 text-center">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
            <p className="text-white font-bold text-xl mb-2">処理中...</p>
            <p className="text-slate-400 text-sm">ATMから現金を準備しています</p>
          </div>
        )}

        {step === 'complete' && result && (
          <div className="bg-slate-800 rounded-2xl p-6 space-y-6">
            <div className="text-center">
              <div className="bg-green-500/20 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-green-400" size={64} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">引き出し完了</h2>
              <p className="text-green-400 text-sm">ATMから現金を受け取ってください</p>
            </div>

            <div className="bg-slate-900 rounded-xl p-6 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-700 pb-3">
                <span className="text-slate-400">金額</span>
                <span className="text-white font-bold text-2xl">¥{result.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">ATM ID</span>
                <span className="text-white font-mono text-sm">{result.atmId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">認証コード</span>
                <span className="text-green-400 font-mono font-bold text-lg">{result.authCode}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">取引ID</span>
                <span className="text-white font-mono text-xs">{result.txId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">日時</span>
                <span className="text-white text-xs">{new Date(result.timestamp).toLocaleString('ja-JP')}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setStep('scan');
                setQrData('');
                setAuthCode('');
                setAmount('');
                setResult(null);
                setError('');
              }}
              className="w-full bg-slate-700 text-white py-4 rounded-xl font-bold hover:bg-slate-600 transition-all"
            >
              新しい取引
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
