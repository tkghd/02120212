#!/bin/bash

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔧 TKG Bank 環境変数設定"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "実際のAPIトークンを入力してください"
echo "（テスト用の場合は 'demo' と入力）"
echo ""

# 銀行API
read -p "SBI APIトークン: " SBI_TOKEN
read -p "楽天銀行APIトークン: " RAKUTEN_TOKEN
read -p "GMOあおぞらAPIトークン: " GMO_TOKEN

# 決済サービス
read -p "Stripe Secret Key: " STRIPE_SECRET
read -p "PayPay APIキー: " PAYPAY_KEY

# eKYC
read -p "Liquid eKYC APIキー: " KYC_API_KEY

# データベース
read -p "Supabase URL: " SUPABASE_URL
read -p "Supabase Service Key: " SUPABASE_KEY

# 暗号通貨
read -p "Ethereum RPC URL: " ETH_RPC
read -p "Polygon RPC URL: " POLYGON_RPC

# 通知
read -p "Slack Webhook URL: " SLACK_WEBHOOK

# .env.local ファイルを作成
cat > .env.local <<ENVEOF
# 銀行API
SBI_API_TOKEN=$SBI_TOKEN
RAKUTEN_API_TOKEN=$RAKUTEN_TOKEN
GMO_API_TOKEN=$GMO_TOKEN

# 決済サービス
STRIPE_SECRET_KEY=$STRIPE_SECRET
PAYPAY_API_KEY=$PAYPAY_KEY

# eKYC/本人確認
KYC_API_KEY=$KYC_API_KEY
KYC_ENABLED=true

# データベース
SUPABASE_URL=$SUPABASE_URL
SUPABASE_SERVICE_KEY=$SUPABASE_KEY

# 暗号通貨
ETH_RPC_URL=$ETH_RPC
POLYGON_RPC_URL=$POLYGON_RPC

# 通知
SLACK_WEBHOOK_URL=$SLACK_WEBHOOK

# システム
NODE_ENV=production
API_VERSION=v1
ENVEOF

# .env.production も作成
cp .env.local .env.production

# Vercelに環境変数を設定
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📤 Vercelに環境変数をアップロード中..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

vercel env add SBI_API_TOKEN production <<< "$SBI_TOKEN"
vercel env add RAKUTEN_API_TOKEN production <<< "$RAKUTEN_TOKEN"
vercel env add GMO_API_TOKEN production <<< "$GMO_TOKEN"
vercel env add STRIPE_SECRET_KEY production <<< "$STRIPE_SECRET"
vercel env add PAYPAY_API_KEY production <<< "$PAYPAY_KEY"
vercel env add KYC_API_KEY production <<< "$KYC_API_KEY"
vercel env add KYC_ENABLED production <<< "true"
vercel env add SUPABASE_URL production <<< "$SUPABASE_URL"
vercel env add SUPABASE_SERVICE_KEY production <<< "$SUPABASE_KEY"
vercel env add ETH_RPC_URL production <<< "$ETH_RPC"
vercel env add POLYGON_RPC_URL production <<< "$POLYGON_RPC"
vercel env add SLACK_WEBHOOK_URL production <<< "$SLACK_WEBHOOK"

echo ""
echo "✅ 環境変数設定完了！"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 設定された環境変数:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cat .env.local | grep -v "SECRET\|KEY\|TOKEN" | sed 's/=.*/=***/'
echo ""
echo "🔒 セキュリティ情報は非表示にしています"
echo ""
