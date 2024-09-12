import axios from 'axios';

export const getLocaleInfo = async () => {
  try {
    // Use the proxied API call (through Vite proxy configured as '/api')
    const response = await axios.get('/api/json/');
    const { country_code, languages } = response.data;

    // Check if the 'languages' field exists and parse it properly
    let language = 'en';  // Default to 'en' if parsing fails
    if (languages && typeof languages === 'string') {
      language = languages.split(',')[0].split('-')[0] || 'en';
    }

    
    const currency = countryCurrencyMap[country_code] || 'USD';

    return { currency, language };
  } catch (error) {
    // console.error('Error detecting locale:', error.message);

    // Fallback to USD and English if API call fails
    return { currency: 'USD', language: 'en' };
  }
};

// Currency mapping by country code
const countryCurrencyMap: Record<string, string> = {
  UG: 'UGX',
  KE: 'KES',
  US: 'USD',
  
};
