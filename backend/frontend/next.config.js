/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: false },
  experimental: { appDir: true },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  env: {
    CUSTOM_KEY: 'tkghd-finance-system',
    DEPLOY_TIME: new Date().toISOString()
  }
}
module.exports = nextConfig
