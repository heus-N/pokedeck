// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import nextI18NextConfig from './next-i18next.config';

import ptCommon from './public/locales/pt/common.json';
import enCommon from './public/locales/en/common.json';

const savedLng = typeof window !== 'undefined'
  ? localStorage.getItem('i18nextLng')
  : null;

i18n
  .use(initReactI18next)
  .init({
    ...nextI18NextConfig.i18n,
    lng: savedLng || nextI18NextConfig.i18n.defaultLocale, // <---- isso aqui
    resources: {
      pt: { common: ptCommon },
      en: { common: enCommon },
    },
    fallbackLng: nextI18NextConfig.i18n.defaultLocale,
    interpolation: { escapeValue: false },
  });

export default i18n;
