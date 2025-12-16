#!/bin/bash
echo "🔑 API Keys & Credentials Extraction"
echo "===================================="
echo ""

# Anthropic Claude
echo "🤖 ANTHROPIC CLAUDE API:"
echo "Key: vck_2vmlrrLVIZPZ41LkOs9qevp@5aZzzOmaP72spJ2thS5N6iSTD748rsQ"
echo "Model: claude-3-5-sonnet-20241022"
echo "Endpoint: https://api.anthropic.com/v1/messages"
echo ""

# Blockchain RPCs
echo "⛓️ BLOCKCHAIN RPCs:"
echo "Polygon: https://polygon-rpc.com"
echo "Ethereum: https://eth.llamarpc.com"
echo "Arbitrum: https://arb1.arbitrum.io/rpc"
echo "BSC: https://bsc-dataseed.binance.org"
echo ""

# CoinGecko
echo "💰 COINGECKO API:"
echo "Endpoint: https://api.coingecko.com/api/v3"
echo "Key: CG-demo-api-key (or use without key for public endpoints)"
echo ""

# Vercel Environment Variables
echo "🌐 VERCEL ENV SETUP:"
echo "Run these commands:"
echo "vercel env add ANTHROPIC_API_KEY production"
echo "vercel env add POLYGON_RPC production"
echo "vercel env add ETHEREUM_RPC production"
echo ""

# Export as .env
echo "📝 Creating .env.production file..."
cat > .env.production << 'ENV'
ANTHROPIC_API_KEY=vck_2vmlrrLVIZPZ41LkOs9qevp@5aZzzOmaP72spJ2thS5N6iSTD748rsQ
POLYGON_RPC=https://polygon-rpc.com
ETHEREUM_RPC=https://eth.llamarpc.com
ARBITRUM_RPC=https://arb1.arbitrum.io/rpc
BSC_RPC=https://bsc-dataseed.binance.org
COINGECKO_API=https://api.coingecko.com/api/v3
STRIPE_SECRET_KEY=sk_test_YOUR_KEY
PAYPAY_API_KEY=YOUR_PAYPAY_KEY
ENV

echo "✅ .env.production created!"
echo ""

# Show Vercel setup commands
cat > setup-vercel-env.sh << 'VERCEL'
#!/bin/bash
vercel env add ANTHROPIC_API_KEY production << EOF
vck_2vmlrrLVIZPZ41LkOs9qevp@5aZzzOmaP72spJ2thS5N6iSTD748rsQ
EOF

vercel env add POLYGON_RPC production << EOF
https://polygon-rpc.com
EOF

vercel env add ETHEREUM_RPC production << EOF
https://eth.llamarpc.com
EOF

echo "✅ Vercel environment variables set!"
VERCEL

chmod +x setup-vercel-env.sh

echo "🎯 Next Steps:"
echo "1. Run: ./setup-vercel-env.sh (to set Vercel env vars)"
echo "2. Or manually set in Vercel Dashboard: https://vercel.com/boss-projects-634a9673/tkghd/settings/environment-variables"
echo ""
echo "📋 All credentials saved to .env.production"
