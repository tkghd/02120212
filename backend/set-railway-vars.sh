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

