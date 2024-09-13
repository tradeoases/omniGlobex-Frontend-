import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    // Load language from localStorage or default to 'en'
    lng: localStorage.getItem('selectedLanguage') || 'en',
    fallbackLng: 'en', // Fallback language is English

    backend: {
      loadPath: '/locales/{{lng}}.json', // Ensure this path matches where your translation files are
    },

    supportedLngs: ['en', 'ar'], // Ensure main languages (English, Arabic) are supported
    interpolation: {
      escapeValue: false, // React already handles escaping
    },
    
    react: {
      useSuspense: false, // Disable suspense to avoid delays in loading translations
    },
  });

export default i18n;
