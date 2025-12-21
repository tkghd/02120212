#!/bin/bash
# Railway Project ID を入力
PROJECT_ID="6b923d33-707b-4c1d-801e-89c2921a3cdf"
VARS_FILE="railway-vars.json"

if ! [ -f "$VARS_FILE" ]; then
  echo "❌ $VARS_FILE が見つかりません"
  exit 1
fi

echo "🔧 Railway 環境変数を自動設定中..."

# JSON を読み込み、key=value の形に変換して Railway CLI で設定
jq -r 'to_entries|map("\(.key)=\(.value|tostring)")|.[]' "$VARS_FILE" | while read line; do
  echo "⚡ Setting: $line"
  railway variables up "$line" --project "$PROJECT_ID"
done

echo "✅ 全環境変数設定完了"
