import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchCurrencies } from '../utils/api';
import { getLocaleInfo } from '../utils/localeDetection';
import { useRecoilState } from 'recoil';
import { currencyAtom, languageAtom } from '../context/atmos';

const supportedLanguages = [
  { code: 'en', name: 'English', nativeName: 'English', flag: './flags/us.png' },
  { code: 'es', name: 'Español', nativeName: 'Español', flag: './flags/es.png' },
  { code: 'ar', name: 'العربية', nativeName: 'العربية', flag: './flags/ae.png' },
  { code: 'de', name: 'Deutsch', nativeName: 'Deutsch', flag: './flags/de.png' },
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

  useEffect(() => {
    const init = async () => {
      try {
        const { currency, language } = await getLocaleInfo();
        const userLanguage = supportedLanguages.some(lang => lang.code === language) ? language : 'en';

        // Check localStorage for stored language
        const storedLanguage = localStorage.getItem('selectedLanguage');
        const languageToSet = storedLanguage || userLanguage;

        // Set the language and change it in i18next
        setSelectedLanguage(languageToSet);
        i18n.changeLanguage(languageToSet);

        // Set currency and store in localStorage
        setSelectedCurrency(currency);
        localStorage.setItem('selectedCurrency', currency);

        // Fetch currencies
        const availableCurrencies = await fetchCurrencies();
        setCurrencies(availableCurrencies);
      } catch (error) {
        console.error('Error during initialization:', error);
      }
    };

    init();
  }, [i18n, setSelectedLanguage, setSelectedCurrency]);

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
