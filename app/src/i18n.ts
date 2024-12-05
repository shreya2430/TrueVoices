import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend) // Load translations from public/locales
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Bind react-i18next
  .init({
    fallbackLng: 'en', // Default language
    debug: true, // Enable debug mode during development
    interpolation: {
      escapeValue: false // React already escapes by default
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json' // Path to translation files
    }
  });

// Force language to Hindi for testing
i18n.changeLanguage('hi');

export default i18n;