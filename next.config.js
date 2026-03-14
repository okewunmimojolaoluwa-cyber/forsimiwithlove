/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  swcMinify: false,
  compiler: {
    removeConsole: true, // Remove console.logs in production for speed
  },
  // Compress responses
  compress: true,
  // Faster page loads
  poweredByHeader: false,
}

module.exports = nextConfig
