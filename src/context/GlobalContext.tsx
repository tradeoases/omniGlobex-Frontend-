import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchCurrencies } from '../utils/api';
import { getLocaleInfo } from '../utils/localeDetection';


const supportedLanguages = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },  
  { code: 'es', name: 'Español', nativeName: 'Español', flag: '🇪🇸' },  
  { code: 'ar', name: 'العربية', nativeName: 'العربية', flag: '🇦🇪' },  
  { code: 'de', name: 'Deutsch', nativeName: 'Deutsch', flag: '🇩🇪' },  
  { code: 'he', name: 'עברית', nativeName: 'עברית', flag: '🇮🇱' },     
  { code: 'ko', name: '한국어', nativeName: '한국어', flag: '🇰🇷' },   
  { code: 'pt', name: 'Português', nativeName: 'Português', flag: '🇵🇹' }, 
  { code: 'zh-Hans', name: '中文 (简体)', nativeName: '中文 (简体)', flag: '🇨🇳' }, 
  { code: 'zh-Hant', name: '中文 (繁體)', nativeName: '中文 (繁體)', flag: '🇹🇼' }, 
];

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
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [currencies, setCurrencies] = useState<CurrencyRates>({});
  const [languages] = useState<Language[]>(supportedLanguages); // Use the predefined list

  useEffect(() => {
    const init = async () => {
      try {
        const { currency, language } = await getLocaleInfo();
        setSelectedCurrency(currency);
        setSelectedLanguage(language);

        if (i18n.isInitialized) {
          i18n.changeLanguage(language);
        } else {
          i18n.on('initialized', () => i18n.changeLanguage(language));
        }

        const availableCurrencies = await fetchCurrencies();
        if (availableCurrencies) {
          setCurrencies(availableCurrencies);
        }
      } catch (error) {
        console.error('Error during initialization:', error);
      }
    };

    init();
  }, [i18n]);

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
        languages,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
