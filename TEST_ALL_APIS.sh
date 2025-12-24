#!/bin/bash

API_BASE="https://tk-global-bank-alpha.vercel.app"

echo "🧪 TK GLOBAL BANK - 全APIテスト"
echo "=================================="
echo ""

# GET APIs
get_apis=(
  "health"
  "index"
  "ultimate-status"
  "owner-vault"
  "crypto-wallet"
  "mega-assets"
  "global-licenses"
  "ai-orchestrator"
  "revenue-stream"
  "system-os"
  "sovereign"
  "licenses"
  "corporate-entities"
  "audit-logs"
)

passed=0
failed=0

for api in "${get_apis[@]}"; do
  echo "Testing GET /api/$api"
  status=$(curl -s -o /dev/null -w "%{http_code}" "$API_BASE/api/$api")
  
  if [ "$status" = "200" ]; then
    echo "  ✅ PASS ($status)"
    ((passed++))
  else
    echo "  ❌ FAIL ($status)"
    ((failed++))
  fi
done

echo ""
echo "=================================="
echo "結果: $passed 成功 / $failed 失敗"
echo "=================================="

# 詳細レスポンス表示（最初の3つ）
echo ""
echo "📊 サンプルレスポンス:"
echo ""

for api in health index ultimate-status; do
  echo "=== /api/$api ==="
  curl -s "$API_BASE/api/$api" | python3 -m json.tool 2>/dev/null || curl -s "$API_BASE/api/$api"
  echo ""
done
