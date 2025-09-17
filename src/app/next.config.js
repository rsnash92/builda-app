/** @type {import('next').NextConfig} */
const nextConfig = {
  // This config is specifically for the app subdomain
  async rewrites() {
    return [
      {
        source: '/(.*)',
        destination: '/app/$1',
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
