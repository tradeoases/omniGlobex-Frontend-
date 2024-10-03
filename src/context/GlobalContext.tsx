import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchCurrencies } from '../utils/api';
import { getLocaleInfo } from '../utils/localeDetection';
import en from '../locales/en.json';
import es from '../locales/es.json';
import ar from '../locales/ar.json';
import de from '../locales/de.json';
import he from '../locales/he.json';
import ko from '../locales/ko.json';
import pt from '../locales/pt.json';
import zhHans from '../locales/zh-Hans.json';
import zhHant from '../locales/zh-Hant.json';
import { atom, useRecoilState } from 'recoil';

// Define Recoil atoms
const currencyAtom = atom({
  key: 'currencyAtom', // unique ID (with respect to other atoms/selectors)
  default: 'USD', // default value (aka initial value)
});

const languageAtom = atom({
  key: 'languageAtom',
  default: 'en',
});

const languages = {
  en,
  es,
  ar,
  de,
  he,
  ko,
  pt,
  'zh-Hans': zhHans,
  'zh-Hant': zhHant,
};

const supportedLanguages = [
  { code: 'en', name: 'English', nativeName: 'English', flag: './flags/us.png' },
  { code: 'es', name: 'Español', nativeName: 'Español', flag: './flags/es.png' },
  { code: 'ar', name: 'العربية', nativeName: 'العربية', flag: './flags/ae.png' },
  { code: 'de', name: 'Deutsch', nativeName: 'Deutsch', flag: './flags/de.png' },
  { code: 'he', name: 'עברית', nativeName: 'עברית', flag: './flags/il.png' },
  { code: 'ko', name: '한국어', nativeName: '한국어', flag: './flags/kr.png' },
  { code: 'pt', name: 'Português', nativeName: 'Português', flag: './flags/pt.png' },
  { code: 'zh-Hans', name: '中文 (简体)', nativeName: '中文 (简体)', flag: './flags/cn.png' },
  { code: 'zh-Hant', name: '中文 (繁體)', nativeName: '中文 (繁體)', flag: './flags/tw.png' },
];

const rtlLanguages = ['ar', 'he'];

interface CurrencyRates {
  [key: string]: number;
}

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

interface GlobalContextType {
  selectedCurrency: string;
  setCurrency: (currency: string) => void;
  selectedLanguage: string;
  setLanguage: (language: string) => void;
  currencies: CurrencyRates;
  languages: Language[];
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  const [selectedCurrency, setSelectedCurrency] = useRecoilState(currencyAtom);
  const [selectedLanguage, setSelectedLanguage] = useRecoilState(languageAtom);
  const [currencies, setCurrencies] = useState<CurrencyRates>({});

  const availableLanguages = Object.keys(languages);

  useEffect(() => {
    const init = async () => {
      try {
        const { currency, language } = await getLocaleInfo();
        const userLanguage = availableLanguages.includes(language) ? language : 'en';

        // Set the selected language from local storage if available
        const storedLanguage = localStorage.getItem('selectedLanguage');
        if (storedLanguage && availableLanguages.includes(storedLanguage)) {
          setSelectedLanguage(storedLanguage);
          i18n.changeLanguage(storedLanguage);
        } else {
          setSelectedLanguage(userLanguage);
          i18n.changeLanguage(userLanguage);
        }

        // Update selected currency from locale info
        setSelectedCurrency(currency);
        localStorage.setItem('selectedCurrency', currency);

        // Fetch available currencies
        const availableCurrencies = await fetchCurrencies();
        if (availableCurrencies) {
          setCurrencies(availableCurrencies);
        }
      } catch (error) {
        console.error('Error during initialization:', error);
      }
    };

    init();
  }, [i18n, setSelectedLanguage, setSelectedCurrency, availableLanguages]);

  // Set the direction attribute based on selected language
  useEffect(() => {
    document.documentElement.setAttribute('dir', rtlLanguages.includes(selectedLanguage) ? 'rtl' : 'ltr');
  }, [selectedLanguage]);

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    localStorage.setItem('selectedLanguage', language);
    i18n.changeLanguage(language);
  };

  return (
    <GlobalContext.Provider
      value={{
        selectedCurrency,
        setCurrency: setSelectedCurrency,
        selectedLanguage,
        setLanguage: handleLanguageChange,
        currencies,
        languages: supportedLanguages,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
