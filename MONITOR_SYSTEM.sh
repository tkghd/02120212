#!/bin/bash

API_BASE="https://tk-global-bank-alpha.vercel.app"

while true; do
  clear
  echo "🔄 TK GLOBAL BANK - リアルタイム監視"
  echo "===================================="
  echo "時刻: $(date '+%Y-%m-%d %H:%M:%S')"
  echo ""
  
  # Health Check
  health=$(curl -s "$API_BASE/api/health")
  if echo "$health" | grep -q "OK"; then
    echo "✅ Health: OK"
  else
    echo "❌ Health: ERROR"
  fi
  
  # Ultimate Status
  status=$(curl -s "$API_BASE/api/ultimate-status" | python3 -c "import sys,json;d=json.load(sys.stdin);print(d.get('status','N/A'))" 2>/dev/null)
  echo "📊 Status: ${status:-N/A}"
  
  # API Count
  count=$(curl -s "$API_BASE/api/index" | python3 -c "import sys,json;d=json.load(sys.stdin);print(d.get('count','N/A'))" 2>/dev/null)
  echo "🔌 APIs: ${count:-N/A}"
  
  echo ""
  echo "次のチェック: 30秒後 (Ctrl+C で停止)"
  sleep 30
done
