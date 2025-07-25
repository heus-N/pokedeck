/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['axios'],
  output: 'standalone',
  images: {
    domains: ['raw.githubusercontent.com'],
    minimumCacheTTL: 604800 , // 1 semana
  },
  experimental: {
    scrollRestoration: true,
  }
};

module.exports = nextConfig;