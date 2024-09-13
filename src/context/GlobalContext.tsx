import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { getLocaleInfo } from '../utils/localeDetection';
import { fetchCurrencies } from '../utils/api';


interface CurrencyRates {
  [key: string]: number;
}

interface GlobalContextType {
  selectedCurrency: string;
  setCurrency: (currency: string) => void;
  selectedLanguage: string;
  setLanguage: (language: string) => void;
  currencies: CurrencyRates;
  languages: { code: string; name: string; flag: string }[];
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const { i18n } = useTranslation();
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [currencies, setCurrencies] = useState<CurrencyRates>({});
  const [languages, setLanguages] = useState<{ code: string; name: string; flag: string }[]>([]);

  useEffect(() => {
    const init = async () => {
      try {
        const { currency, language } = await getLocaleInfo();
        setSelectedCurrency(currency);
        setSelectedLanguage(language);

        // safely initialize i18n and change language
        if (i18n.isInitialized) {
          i18n.changeLanguage(language);
        } else {
          i18n.on('initialized', () => i18n.changeLanguage(language));
        }

        // Fetch available currencies
        const availableCurrencies = await fetchCurrencies();
        if (availableCurrencies) {
          setCurrencies(availableCurrencies);
        }

        // Fetch languages from REST Countries API
        const response = await axios.get('https://restcountries.com/v3.1/all');
       // Adjust GlobalContext.tsx to ensure that the language data has unique keys
const languagesData = response.data.map((country: any) => ({
  code: `${country.cca2}-${Object.keys(country.languages || {})[0] || 'en'}`, // Unique key: country code + language code
  name: Object.values(country.languages || {})[0] || 'English',
  flag: country.flags?.svg || '',
})).filter((lang: any) => lang.code && lang.name);


        // Add English and Arabic at the top
        const prioritizedLanguages = [
          { code: 'en', name: 'English', flag: 'path-to-english-flag' },
          { code: 'ar', name: 'Arabic', flag: 'path-to-arabic-flag' },
          ...languagesData
        ];

        setLanguages(prioritizedLanguages);
      } catch (error) {
        console.error('Error during initialization:', error);
      }
    };

    init();
  }, []);

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
