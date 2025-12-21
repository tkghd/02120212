#!/bin/bash

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔐 REAL契約・REALキー統合セットアップ"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# .envファイル作成
cat > .env << 'ENVFILE'
# ============================================
# TKG GLOBAL EMPIRE - REAL契約設定
# ============================================

# Server Configuration
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://tkghd.vercel.app

# Database (Railway自動設定)
DATABASE_URL=${DATABASE_URL}
REDIS_URL=${REDIS_URL}

# Authentication
JWT_SECRET=tkghd_ultimate_secret_2025_production
AUTH_ID=1190212

# ============================================
# REAL契約 1: Stripe (決済プラットフォーム)
# ============================================
# 取得先: https://dashboard.stripe.com/apikeys
STRIPE_SECRET_KEY=sk_live_51QTaDGP0example
STRIPE_PUBLISHABLE_KEY=pk_live_51QTaDGP0example
STRIPE_WEBHOOK_SECRET=whsec_example

# ============================================
# REAL契約 2: Plaid (銀行API統合)
# ============================================
# 取得先: https://dashboard.plaid.com/developers/keys
PLAID_CLIENT_ID=your_client_id_here
PLAID_SECRET=your_secret_here
PLAID_ENV=production

# ============================================
# REAL契約 3: 日本の銀行API
# ============================================

# SBI銀行 (住信SBIネット銀行)
# 契約先: https://www.netbk.co.jp/contents/lineup/api/
SBI_API_URL=https://api.netbk.co.jp/v1
SBI_API_KEY=your_sbi_api_key
SBI_CLIENT_ID=your_sbi_client_id
SBI_CLIENT_SECRET=your_sbi_secret

# 楽天銀行
# 契約先: https://www.rakuten-bank.co.jp/business/api/
RAKUTEN_API_URL=https://api.rakuten-bank.co.jp/v1
RAKUTEN_API_KEY=your_rakuten_api_key
RAKUTEN_CLIENT_ID=your_rakuten_client_id
RAKUTEN_CLIENT_SECRET=your_rakuten_secret

# GMOあおぞらネット銀行
# 契約先: https://gmo-aozora.com/business/service/api-coordination.html
GMO_API_URL=https://api.gmo-aozora.com/v1
GMO_API_KEY=your_gmo_api_key
GMO_CLIENT_ID=your_gmo_client_id
GMO_CLIENT_SECRET=your_gmo_secret

# MUFG銀行
MUFG_API_URL=https://api.bk.mufg.jp/v1
MUFG_API_KEY=your_mufg_api_key

# みずほ銀行
MIZUHO_API_URL=https://api.mizuhobank.co.jp/v1
MIZUHO_API_KEY=your_mizuho_api_key

# 三井住友銀行
SMBC_API_URL=https://api.smbc.co.jp/v1
SMBC_API_KEY=your_smbc_api_key

# ============================================
# REAL契約 4: Wise (国際送金)
# ============================================
# 取得先: https://wise.com/settings/api-tokens
WISE_API_TOKEN=your_wise_api_token_here
WISE_PROFILE_ID=your_profile_id_here
WISE_ENV=live

# ============================================
# REAL契約 5: PayPal
# ============================================
# 取得先: https://developer.paypal.com/dashboard/
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_SECRET=your_paypal_secret
PAYPAL_MODE=live

# ============================================
# REAL契約 6: Revolut Business
# ============================================
# 取得先: https://business.revolut.com/settings/api
REVOLUT_API_TOKEN=your_revolut_token
REVOLUT_API_URL=https://b2b.revolut.com/api/1.0

# ============================================
# REAL契約 7: Crypto/Web3
# ============================================
# Infura (Ethereum/Polygon)
# 取得先: https://infura.io/dashboard
INFURA_PROJECT_ID=your_infura_project_id
INFURA_API_SECRET=your_infura_secret

# Alchemy (代替/バックアップ)
# 取得先: https://dashboard.alchemy.com/
ALCHEMY_API_KEY=your_alchemy_key

# Wallet設定
WALLET_ADDRESS=0xyour_wallet_address
WALLET_PRIVATE_KEY=your_private_key_here

# ============================================
# REAL契約 8: AI統合
# ============================================
# Claude (Anthropic)
# 取得先: https://console.anthropic.com/settings/keys
ANTHROPIC_API_KEY=sk-ant-api03-your_key_here

# OpenAI (バックアップ)
OPENAI_API_KEY=sk-your_openai_key

# ============================================
# REAL契約 9: トレーディングAPI
# ============================================
# Alpaca (株式取引)
# 取得先: https://app.alpaca.markets/paper/dashboard/overview
ALPACA_API_KEY=your_alpaca_key
ALPACA_SECRET_KEY=your_alpaca_secret
ALPACA_BASE_URL=https://api.alpaca.markets

# Coinbase (暗号資産取引)
COINBASE_API_KEY=your_coinbase_key
COINBASE_API_SECRET=your_coinbase_secret

# ============================================
# REAL契約 10: 監査・コンプライアンス
# ============================================
# Sumsub (KYC/AML)
# 取得先: https://cockpit.sumsub.com/
SUMSUB_APP_TOKEN=your_sumsub_token
SUMSUB_SECRET_KEY=your_sumsub_secret

# Chainalysis (暗号資産コンプライアンス)
CHAINALYSIS_API_KEY=your_chainalysis_key

# ============================================
# その他サービス
# ============================================
# SendGrid (メール送信)
SENDGRID_API_KEY=your_sendgrid_key

# Twilio (SMS/2FA)
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=+1234567890

# Cloudflare (セキュリティ)
CLOUDFLARE_API_KEY=your_cloudflare_key
CLOUDFLARE_ZONE_ID=your_zone_id

ENVFILE

echo "✅ .env ファイル作成完了"
echo ""

# Railway環境変数設定スクリプト
cat > set-railway-vars.sh << 'RAILWAY'
#!/bin/bash

echo "🚂 Railway環境変数設定中..."

# 基本設定
railway variables set NODE_ENV=production
railway variables set JWT_SECRET=tkghd_ultimate_secret_2025_production
railway variables set AUTH_ID=1190212
railway variables set FRONTEND_URL=https://tkghd.vercel.app

echo "✅ Railway基本変数設定完了"
echo ""
echo "⚠️  次に手動で以下を設定してください:"
echo "   railway variables set STRIPE_SECRET_KEY=sk_live_..."
echo "   railway variables set PLAID_CLIENT_ID=..."
echo "   railway variables set WISE_API_TOKEN=..."
echo ""
echo "または Railway Dashboard から設定:"
echo "   https://railway.app/project/6b923d33-707b-4c1d-801e-89c2921a3cdf"

RAILWAY

chmod +x set-railway-vars.sh

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 REAL契約取得ガイド"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cat > REAL_CONTRACT_GUIDE.md << 'GUIDE'
# 🔐 REAL契約取得ガイド

## 優先順位順に取得

### 🥇 最優先: すぐに取得可能

1. **Stripe** (即日)
   - URL: https://dashboard.stripe.com/register
   - 必要: メールアドレス、事業情報
   - 費用: 無料 (取引手数料のみ)

2. **Anthropic Claude API** (即日)
   - URL: https://console.anthropic.com/
   - 必要: メールアドレス
   - 費用: 従量課金

3. **Infura** (即日)
   - URL: https://infura.io/register
   - 必要: メールアドレス
   - 費用: 無料プランあり

### 🥈 準優先: 1-3営業日

4. **Plaid** (審査1-3日)
   - URL: https://dashboard.plaid.com/signup
   - 必要: 事業登録、銀行情報
   - 費用: 従量課金

5. **Wise Business** (審査2-3日)
   - URL: https://wise.com/register/business
   - 必要: 法人登記、銀行口座
   - 費用: 送金ごと

6. **PayPal Business** (即日-3日)
   - URL: https://www.paypal.com/bizsignup/
   - 必要: 事業情報
   - 費用: 取引手数料

### 🥉 要審査: 1-4週間

7. **日本の銀行API**
   - **SBI銀行**: 法人口座開設必須 (2-4週間)
   - **楽天銀行**: 法人口座 + API申請 (2-3週間)
   - **GMO**: 法人口座 + 審査 (1-2週間)
   
8. **Trading APIs**
   - **Alpaca**: 審査1週間
   - **Coinbase Pro**: 審査2週間

## 📝 必要書類

### 法人の場合
- 法人登記簿謄本
- 代表者身分証明書
- 事業計画書
- 銀行口座情報

### 個人事業主の場合
- 開業届
- 本人確認書類
- 事業内容説明書

## 💰 初期費用概算

| サービス | 初期費用 | 月額費用 |
|---------|---------|---------|
| Stripe | ¥0 | 取引手数料 |
| Plaid | ¥0 | 従量課金 |
| Wise | ¥0 | 送金ごと |
| 銀行API | ¥0-50万 | ¥1-10万 |

GUIDE

cat REAL_CONTRACT_GUIDE.md

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ セットアップ完了"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📁 作成されたファイル:"
echo "  ✅ .env (環境変数テンプレート)"
echo "  ✅ set-railway-vars.sh (Railway設定)"
echo "  ✅ REAL_CONTRACT_GUIDE.md (契約ガイド)"
echo ""
echo "次のステップ:"
echo "  1. 各サービスでアカウント作成"
echo "  2. APIキー取得"
echo "  3. .env ファイルに設定"
echo "  4. Railway変数設定: ./set-railway-vars.sh"
echo "  5. デプロイ: railway up"
echo ""

