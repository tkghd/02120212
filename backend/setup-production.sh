#!/bin/bash

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 REAL送金システム - 本番環境構築"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Railway環境変数設定
railway variables set NODE_ENV=production
railway variables set JWT_SECRET=tkgbank-production-secret-2025-secure-key

# 銀行API実キー（本番用 - 要取得）
railway variables set SBI_API_KEY=sbi_prod_api_key_placeholder
railway variables set RAKUTEN_API_KEY=rakuten_prod_api_key_placeholder
railway variables set PAYPAY_API_KEY=paypay_prod_api_key_placeholder
railway variables set GMO_API_KEY=gmo_prod_api_key_placeholder

# 国際送金API
railway variables set WISE_API_TOKEN=wise_prod_token_placeholder
railway variables set REVOLUT_API_KEY=revolut_prod_key_placeholder

# Blockchain API
railway variables set INFURA_API_KEY=infura_prod_key_placeholder
railway variables set ALCHEMY_API_KEY=alchemy_prod_key_placeholder

# KYC/AML
railway variables set KYC_PROVIDER_API=jumio_prod_api_key
railway variables set AML_PROVIDER_API=chainalysis_prod_api_key

# 監査ログ
railway variables set AUDIT_LOG_ENABLED=true
railway variables set FRAUD_DETECTION_ENABLED=true

# セキュリティ
railway variables set RATE_LIMIT_MAX=1000
railway variables set IP_WHITELIST=enabled

echo ""
echo "✅ 環境変数設定完了"
echo ""
