#!/bin/bash
echo "=== Deployment Health Check ==="
echo ""
echo "Frontend: https://tkghd.vercel.app"
curl -I https://tkghd.vercel.app 2>&1 | grep "HTTP"
echo ""
echo "Backend: https://tkghd-api.vercel.app"
curl -I https://tkghd-api.vercel.app/api/health 2>&1 | grep "HTTP"
echo ""
echo "API Test:"
curl -s https://tkghd-api.vercel.app/api/health | python3 -m json.tool
