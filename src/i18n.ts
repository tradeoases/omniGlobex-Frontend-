import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: localStorage.getItem('selectedLanguage') || 'en', // Default language
    fallbackLng: 'en', // Fallback to English
    backend: {
      loadPath: '/locales/{{lng}}.json', // Dynamic loading of translation files
    },
    supportedLngs: ['en', 'ar'], // Prioritize English and Arabic
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
