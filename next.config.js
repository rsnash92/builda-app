/** @type {import('next').NextConfig} */
const nextConfig = {
  // App subdomain configuration
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
  // Ensure static files are properly served
  trailingSlash: false,
  // Add image optimization configuration
  images: {
    unoptimized: true, // This helps with static file serving on Vercel
  },
}

module.exports = nextConfig