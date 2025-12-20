#!/bin/bash

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔍 環境変数確認"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

check_env() {
  local key=$1
  local name=$2
  if [ -z "${!key}" ]; then
    echo "❌ $name: 未設定"
  else
    echo "✅ $name: 設定済み"
  fi
}

# ローカル環境変数を読み込み
if [ -f .env.local ]; then
  export $(cat .env.local | xargs)
fi

check_env "SBI_API_TOKEN" "SBI API"
check_env "RAKUTEN_API_TOKEN" "楽天銀行API"
check_env "GMO_API_TOKEN" "GMOあおぞらAPI"
check_env "STRIPE_SECRET_KEY" "Stripe"
check_env "PAYPAY_API_KEY" "PayPay"
check_env "KYC_API_KEY" "eKYC"
check_env "SUPABASE_URL" "Supabase"
check_env "ETH_RPC_URL" "Ethereum RPC"
check_env "SLACK_WEBHOOK_URL" "Slack通知"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
