const path = require('path');

/** @type {import('next-i18next').UserConfig} */
const nextI18NextConfig = {
  i18n: {
    defaultLocale: 'pt',
    locales: ['pt', 'en'],
  },
  localePath: path.resolve('./public/locales'),
};

module.exports = nextI18NextConfig;
