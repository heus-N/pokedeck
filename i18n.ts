import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import nextI18NextConfig from './next-i18next.config';

// Carregue traduções manualmente (você pode fazer dinamicamente para produção)
import ptCommon from './public/locales/pt/common.json';
import enCommon from './public/locales/en/common.json';

i18n
  .use(initReactI18next)
  .init({
    ...nextI18NextConfig.i18n,
    resources: {
      pt: { common: ptCommon },
      en: { common: enCommon },
    },
    fallbackLng: nextI18NextConfig.i18n.defaultLocale,
    interpolation: { escapeValue: false },
  });

export default i18n;
