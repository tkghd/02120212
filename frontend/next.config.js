/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  env: {
    BACKEND_API: 'https://hopeful-liberation-production-9d00.up.railway.app'
  }
}

module.exports = nextConfig
