/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  poweredByHeader: false,
  reactStrictMode: true,
  output: 'export',
  images: {
    loader: 'custom',
    loaderFile: './imageLoader.ts'
  }
}

module.exports = nextConfig;
