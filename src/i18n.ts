import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: localStorage.getItem('selectedLanguage') || 'en',  // default language is fetched from local storage or 'en'
    fallbackLng: 'en',
    backend: {
      loadPath: '/locales/{{lng}}.json',  // modify as needed for remote translations
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
