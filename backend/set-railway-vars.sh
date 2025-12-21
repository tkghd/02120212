#!/bin/bash

# Railway Project ID
PROJECT_ID="6b923d33-707b-4c1d-801e-89c2921a3cdf"

echo "🔧 Railway 環境変数を自動設定中..."
echo ""

# JSONから環境変数を読み込んで設定
cat railway-vars.json | jq -r 'to_entries[] | "\(.key)=\(.value)"' | while read var; do
  KEY=$(echo $var | cut -d= -f1)
  VALUE=$(echo $var | cut -d= -f2-)
  
  echo "設定中: $KEY"
  
  # Railway CLI v3 の正しい構文
  railway variables --set "$KEY=$VALUE" 2>/dev/null || \
  railway variable set "$KEY" "$VALUE" 2>/dev/null || \
  echo "  ⚠️  手動設定が必要: $KEY"
done

echo ""
echo "✅ 環境変数設定完了"
