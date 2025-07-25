/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['axios'],
  output: 'standalone',
  images: {
    domains: ['raw.githubusercontent.com'],
    minimumCacheTTL: 60, // 1 minuto para testes
  },
  experimental: {
    scrollRestoration: true,
  }
};

module.exports = nextConfig;