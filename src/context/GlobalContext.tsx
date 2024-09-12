import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { getLocaleInfo } from '../utils/localeDetection';
import { fetchCurrencies } from '../utils/api';
import i18n from '../i18n'; 

interface CurrencyRates {
  [key: string]: number;
}

interface GlobalContextType {
  selectedCurrency: string;
  setCurrency: (currency: string) => void;
  selectedLanguage: string;
  setLanguage: (language: string) => void;
  currencies: CurrencyRates;
  languages: string[];
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
  const [languages, setLanguages] = useState<string[]>([]);

  useEffect(() => {
    const init = async () => {
      try {
        const { currency, language } = await getLocaleInfo();
        setSelectedCurrency(currency);
        setSelectedLanguage(language);

        // Ensure i18n is initialized before calling changeLanguage
        if (i18n.isInitialized) {
          i18n.changeLanguage(language); // Safely change language
        } else {
          i18n.on('initialized', () => {
            i18n.changeLanguage(language);
          });
        }

        const availableCurrencies = await fetchCurrencies();
        setCurrencies(availableCurrencies);
      } catch (error) {
        console.error('Error during initialization:', error);
      }
    };

    init();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        selectedCurrency,
        setCurrency: setSelectedCurrency,
        selectedLanguage,
        setLanguage: setSelectedLanguage,
        currencies,
        languages,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
