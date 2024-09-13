import axios from 'axios';

export const getLocaleInfo = async () => {
  try {
    // Use ipgeolocation.io API to get user location and language info
    const response = await axios.get('https://api.ipgeolocation.io/ipgeo?apiKey=4547ead891fe44ddb40ae9039236ea00');
    const { country_code2, languages } = response.data;

    // Ensure language is correctly parsed
    let language = 'en';  // Default to 'en' if parsing fails
    if (languages && typeof languages === 'string') {
      language = languages.split(',')[0].split('-')[0] || 'en';
    }

    const currency = countryCurrencyMap[country_code2] || 'USD';
    return { currency, language };
  } catch (error) {
    console.error('Error fetching locale info:', error);
    return { currency: 'USD', language: 'en' };
  }
};

// Mapping country code to currencies
const countryCurrencyMap: Record<string, string> = {
  UG: 'UGX',
  KE: 'KES',
  US: 'USD',
};
