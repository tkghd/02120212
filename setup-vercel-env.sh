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
