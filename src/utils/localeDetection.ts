import axios from 'axios';

export const getLocaleInfo = async () => {
  try {
    const response = await axios.get('https://api.ipgeolocation.io/ipgeo?apiKey=4547ead891fe44ddb40ae9039236ea00');
    const { country_code2, languages } = response.data;

    let language = 'en'; // Default to English
    if (languages && typeof languages === 'string') {
      language = languages.split(',')[0].split('-')[0].toLowerCase();
    }

    const currency = countryCurrencyMap[country_code2] || 'USD';
    return { currency, language };
  } catch (error) {
    console.error('Error fetching locale info:', error);
    return { currency: 'USD', language: 'en' };
  }
};

const countryCurrencyMap: Record<string, string> = {
  // Middle East
  AE: 'AED', SA: 'SAR', QA: 'QAR', KW: 'KWD', BH: 'BHD', OM: 'OMR',
  EG: 'EGP', JO: 'JOD', LB: 'LBP', IQ: 'IQD', IR: 'IRR', IL: 'ILS', TR: 'TRY',
  SY: 'SYP', YE: 'YER', PS: 'ILS',

  // Africa
  ZA: 'ZAR', NG: 'NGN', KE: 'KES', UG: 'UGX', DZ: 'DZD', MA: 'MAD',
  TN: 'TND', GH: 'GHS', CI: 'XOF', CM: 'XAF', SN: 'XOF', TZ: 'TZS', ET: 'ETB',
  LY: 'LYD', AO: 'AOA', ZM: 'ZMW', ZW: 'ZWL', RW: 'RWF', MZ: 'MZN', NA: 'NAD',
  BW: 'BWP', MU: 'MUR', SD: 'SDG', SS: 'SSP',

  // Europe
  GB: 'GBP', DE: 'EUR', FR: 'EUR', IT: 'EUR', ES: 'EUR', NL: 'EUR', CH: 'CHF',
  SE: 'SEK', NO: 'NOK', DK: 'DKK', FI: 'EUR', PL: 'PLN', RU: 'RUB', UA: 'UAH',
  CZ: 'CZK', AT: 'EUR', BE: 'EUR', IE: 'EUR', PT: 'EUR', GR: 'EUR', HU: 'HUF',

  // North America
  US: 'USD', CA: 'CAD', MX: 'MXN',

  // Central America and Caribbean
  PA: 'PAB', CR: 'CRC', NI: 'NIO', HN: 'HNL', SV: 'USD', GT: 'GTQ', BZ: 'BZD',
  DO: 'DOP', CU: 'CUP', JM: 'JMD', HT: 'HTG', BS: 'BSD', BB: 'BBD',

  // South America
  BR: 'BRL', AR: 'ARS', CL: 'CLP', CO: 'COP', PE: 'PEN', EC: 'USD', UY: 'UYU',
  PY: 'PYG', BO: 'BOB', VE: 'VES',

  // Asia
  JP: 'JPY', CN: 'CNY', IN: 'INR', KR: 'KRW', SG: 'SGD', ID: 'IDR', MY: 'MYR',
  TH: 'THB', PH: 'PHP', VN: 'VND', PK: 'PKR', BD: 'BDT', LK: 'LKR', NP: 'NPR',
  MM: 'MMK', KH: 'KHR', LA: 'LAK', MN: 'MNT',

  // Oceania
  AU: 'AUD', NZ: 'NZD', FJ: 'FJD', PG: 'PGK', SB: 'SBD', VU: 'VUV', WS: 'WST',
};