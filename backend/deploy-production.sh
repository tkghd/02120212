#!/bin/bash

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 本番環境自動構築スクリプト"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Railway Web UIで環境変数を設定
echo "📝 環境変数を設定してください："
echo ""
echo "Railway Dashboard → Settings → Variables"
echo "以下の変数を追加："
echo ""
cat .env.production
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
