/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  poweredByHeader: false,
  reactStrictMode: true,
  output: 'export',
  images: {
    // todo: enable when appropriate provider found
    unoptimized: true
  }
}

module.exports = nextConfig;
