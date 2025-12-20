#!/bin/bash

echo "🎮 デモ用環境変数を設定します..."

cat > .env.local <<DEMOENV
# デモ環境
SBI_API_TOKEN=demo_sbi_token
RAKUTEN_API_TOKEN=demo_rakuten_token
GMO_API_TOKEN=demo_gmo_token
STRIPE_SECRET_KEY=sk_test_demo
PAYPAY_API_KEY=demo_paypay_key
KYC_API_KEY=demo_kyc_key
KYC_ENABLED=false
SUPABASE_URL=https://demo.supabase.co
SUPABASE_SERVICE_KEY=demo_service_key
ETH_RPC_URL=https://eth-mainnet.alchemyapi.io/v2/demo
POLYGON_RPC_URL=https://polygon-rpc.com/demo
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/demo
NODE_ENV=development
API_VERSION=v1
DEMOENV

echo "✅ デモ用環境変数を作成しました"
echo ""
echo "⚠️  これはデモ用です。実際の送金はできません。"
