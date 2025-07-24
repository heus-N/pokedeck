const nextI18NextConfig = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...nextI18NextConfig,
  experimental: {
    clientRouterFilter: true,
    clientRouterFilterRedirects: true,
    scrollRestoration: true,
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;