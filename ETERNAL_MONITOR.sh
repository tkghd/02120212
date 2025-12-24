
#!/bin/bash



echo "🔄 ETERNAL MONITORING SYSTEM - Starting..."



while true; do

  clear

  echo "═══════════════════════════════════════════════════════════════"

  echo "  🔄 ETERNAL SYSTEM MONITOR - $(date)"

  echo "═══════════════════════════════════════════════════════════════"

  echo ""

  

  API="https://tkghd-api-azure.vercel.app"

  FRONTEND="https://tkghd.vercel.app"

  

  # Health Check

  health=$(curl -s -w "\n%{http_code}" "$API/api/health" | tail -n1)

  if [ "$health" = "200" ]; then

    echo "✅ Backend Health: OK"

  else

    echo "❌ Backend Health: FAILED ($health)"

    # Auto-healing trigger

    echo "🔧 Triggering auto-heal..."

    ./ULTIMATE_DEPLOY.sh > /dev/null 2>&1 &

  fi

  

  # Frontend Check

  frontend=$(curl -s -I "$FRONTEND" 2>&1 | grep "HTTP" | awk '{print $2}')

  if [ "$frontend" = "200" ]; then

    echo "✅ Frontend: OK"

  else

    echo "❌ Frontend: ISSUE ($frontend)"

  fi

  

  # API Count

  apis=$(curl -s "$API/api/index" 2>/dev/null | grep -o '"count":[0-9]*' | grep -o '[0-9]*')

  echo "📊 Active APIs: ${apis:-N/A}"

  

  echo ""

  echo "Next check in 60 seconds... (Ctrl+C to stop)"

  sleep 60

done

