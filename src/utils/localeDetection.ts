import axios from 'axios';

const CACHE_KEY = 'localeInfoCache';
const CACHE_DURATION = 24 * 60 * 60 * 1000; 

interface LocaleInfo {
  currency: string;
  language: string;
  timestamp: number;
}

const getLocaleInfoFromCache = (): LocaleInfo | null => {
  const cachedData = localStorage.getItem(CACHE_KEY);
  if (cachedData) {
    const parsedData = JSON.parse(cachedData) as LocaleInfo;
    if (Date.now() - parsedData.timestamp < CACHE_DURATION) {
      return parsedData;
    }
  }
  return null;
};

const setLocaleInfoCache = (data: LocaleInfo): void => {
  localStorage.setItem(CACHE_KEY, JSON.stringify(data));
};

export const getLocaleInfo = async (): Promise<{ currency: string; language: string }> => {
  // Check cache first
  const cachedInfo = getLocaleInfoFromCache();
  if (cachedInfo) {
    return { currency: cachedInfo.currency, language: cachedInfo.language };
  }

  try {
    // First, get the IP address using ipify
    const ipResponse = await axios.get('https://api.ipify.org?format=json');
    const ip = ipResponse.data.ip;

    // Use the new IPGeolocation API key to get geolocation data
    const geoResponse = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=a6a5dffdc2794c3da0f9ed77762f7fcb&ip=${ip}`);
    const { country_code2: country_code, languages } = geoResponse.data;
    
    let language = 'en';
    if (languages) {
      language = languages.split(',')[0].split('-')[0].toLowerCase();
    }
    
    const currency = countryCurrencyMap[country_code] || 'USD';
    
    // Cache the result
    const localeInfo: LocaleInfo = { currency, language, timestamp: Date.now() };
    setLocaleInfoCache(localeInfo);
    
    return { currency, language };
  } catch (error) {
    console.error('Error fetching locale info:', error);
    return { currency: 'USD', language: 'en' };
  }
};

const countryCurrencyMap: Record<string, string> = {
  AE: 'AED', SA: 'SAR', QA: 'QAR', KW: 'KWD', BH: 'BHD', OM: 'OMR',
  EG: 'EGP', JO: 'JOD', LB: 'LBP', IQ: 'IQD', IR: 'IRR', IL: 'ILS', TR: 'TRY',
  SY: 'SYP', YE: 'YER', PS: 'ILS', 
  ZA: 'ZAR', NG: 'NGN', KE: 'KES', UG: 'UGX', DZ: 'DZD', MA: 'MAD',
  TN: 'TND', GH: 'GHS', CI: 'XOF', CM: 'XAF', SN: 'XOF', TZ: 'TZS', ET: 'ETB',
  LY: 'LYD', AO: 'AOA', ZM: 'ZMW', ZW: 'ZWL', RW: 'RWF', MZ: 'MZN', NA: 'NAD',
  BW: 'BWP', MU: 'MUR', SD: 'SDG', SS: 'SSP', 
  GB: 'GBP', DE: 'EUR', FR: 'EUR', IT: 'EUR', ES: 'EUR', NL: 'EUR', CH: 'CHF',
  SE: 'SEK', NO: 'NOK', DK: 'DKK', FI: 'EUR', PL: 'PLN', RU: 'RUB', UA: 'UAH',
  CZ: 'CZK', AT: 'EUR', BE: 'EUR', IE: 'EUR', PT: 'EUR', GR: 'EUR', HU: 'HUF',
  US: 'USD', CA: 'CAD', MX: 'MXN', 
  PA: 'PAB', CR: 'CRC', NI: 'NIO', HN: 'HNL', SV: 'USD', GT: 'GTQ', BZ: 'BZD',
  DO: 'DOP', CU: 'CUP', JM: 'JMD', HT: 'HTG', BS: 'BSD', BB: 'BBD', 
  BR: 'BRL', AR: 'ARS', CL: 'CLP', CO: 'COP', PE: 'PEN', EC: 'USD', UY: 'UYU',
  PY: 'PYG', BO: 'BOB', VE: 'VES', 
  JP: 'JPY', CN: 'CNY', IN: 'INR', KR: 'KRW', SG: 'SGD', ID: 'IDR', MY: 'MYR',
  TH: 'THB', VN: 'VND', PH: 'PHP', PK: 'PKR', 
  AU: 'AUD', NZ: 'NZD',
};