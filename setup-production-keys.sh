#!/bin/bash

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔐 REAL APIキー本番設定"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "このスクリプトは Railway 環境変数を設定します"
echo ""

# Wise API
read -p "Wise API Key を入力 (または Enter でスキップ): " WISE_KEY
if [ ! -z "$WISE_KEY" ]; then
  echo "export WISE_API_KEY='$WISE_KEY'" >> .env.production
  echo "export WISE_ENV='production'" >> .env.production
  echo "✅ Wise API Key 設定完了"
fi

# Revolut API
read -p "Revolut API Key を入力 (または Enter でスキップ): " REVOLUT_KEY
if [ ! -z "$REVOLUT_KEY" ]; then
  echo "export REVOLUT_API_KEY='$REVOLUT_KEY'" >> .env.production
  echo "export REVOLUT_ENV='production'" >> .env.production
  echo "✅ Revolut API Key 設定完了"
fi

# Plaid API
read -p "Plaid Client ID を入力 (または Enter でスキップ): " PLAID_ID
read -p "Plaid Secret を入力 (または Enter でスキップ): " PLAID_SECRET
if [ ! -z "$PLAID_ID" ]; then
  echo "export PLAID_CLIENT_ID='$PLAID_ID'" >> .env.production
  echo "export PLAID_SECRET='$PLAID_SECRET'" >> .env.production
  echo "export PLAID_ENV='production'" >> .env.production
  echo "✅ Plaid API Keys 設定完了"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 Railway ダッシュボードで設定してください:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
cat .env.production
echo ""
echo "🔗 Railway設定ページ:"
echo "   https://railway.app/project/[your-project-id]/variables"
echo ""
echo "💡 上記の環境変数を Railway ダッシュボードにコピペしてください"
