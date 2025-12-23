# 📋 完全モジュール・API・コンポーネントリスト

## 🏦 Backend APIs (~/02120212/backend)

### 銀行・送金モジュール
- ✅ `/api/transfer/domestic` - 国内送金
- ✅ `/api/transfer/crypto` - 暗号通貨送金
- ✅ `/api/transfer/international` - 国際送金
- ✅ `/api/banking/wise/*` - Wise API (160カ国)
- ✅ `/api/banking/revolut/*` - Revolut API (30通貨)
- ✅ `/api/banking/plaid/*` - Plaid API (米欧銀行)
- ✅ `/api/banking/international/status` - 統合ステータス

### 決済モジュール
- ✅ `/api/payment/applepay` - Apple Pay
- ✅ `/api/payment/quicpay` - QUICPay
- ✅ `/api/payment/paypay` - PayPay
- ✅ `/api/atm/withdraw` - ATM出金
- ✅ `/api/qr/generate` - QRコード生成

### 法人・ライセンスモジュール
- ✅ `/api/corporate/incorporate` - 法人設立
- ✅ `/api/corporate/licenses/available` - ライセンス一覧
- ✅ `/api/license/financial/apply` - 金融ライセンス申請

### グローバルモジュール
- ✅ `/api/exchange-rate/:from/:to` - 為替レート
- ✅ `/api/legal/:country` - 各国法規制
- ✅ `/api/external/status` - 外部API統合状況

### システムモジュール
- ✅ `/health` - ヘルスチェック
- ✅ `/api/system/modules` - モジュール一覧

## 🎨 Frontend Components (~/02120212/frontend/src/components)

- ✅ `InternationalBankingModule.jsx` - 国際銀行統合UI
- ✅ `CompleteFinancialPlatform.jsx` - 完全金融プラットフォーム

## 📊 統計
- **総エンドポイント**: 25+
- **対応国**: 160+
- **対応通貨**: 40+
- **統合プロバイダー**: 8+ (Wise, Revolut, Plaid, Stripe, Binance, etc.)

## 🌐 デプロイ先
- **Frontend**: https://frontend-t-global.vercel.app
- **Backend**: https://hopeful-liberation-production-9d00.up.railway.app
- **Custom**: https://tkghd-api-azure.vercel.app
