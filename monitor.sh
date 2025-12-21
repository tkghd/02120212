#!/bin/bash
API="http://localhost:8080"

while true; do
  clear
  echo "================================================"
  echo "TKG HOLDINGS - LIVE MONITOR"
  echo "================================================"
  echo "Time: $(date '+%Y-%m-%d %H:%M:%S')"
  echo ""
  
  echo "REVENUE (Real-time)"
  curl -s $API/api/revenue/realtime 2>/dev/null | jq -r '.data | "  JP:     \(.jp | floor) M/sec\n  Global: \(.global | floor) M/sec\n  Total:  \(.total | floor) M/sec"'
  echo ""
  
  echo "RECENT TRANSFERS"
  curl -s $API/api/transfer/history?limit=5 2>/dev/null | jq -r '.data[]? | "  \(.id) | \(.status) | \(.amount) \(.currency)"'
  echo ""
  
  echo "SYSTEM HEALTH"
  curl -s $API/api/health 2>/dev/null | jq -r '"  Status: \(.status)\n  Time: \(.timestamp)"'
  echo ""
  
  echo "Press Ctrl+C to exit"
  sleep 3
done
