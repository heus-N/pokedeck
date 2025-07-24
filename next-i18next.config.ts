import path from 'path';
import type { UserConfig } from 'next-i18next';

const nextI18NextConfig: UserConfig = {
  i18n: {
    defaultLocale: 'pt',
    locales: ['pt', 'en'],
  },
  localePath: path.resolve('./public/locales'),
};

export default nextI18NextConfig;
