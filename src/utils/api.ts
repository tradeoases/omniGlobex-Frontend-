import axios from 'axios';


export const fetchCurrencies = async (): Promise<{ [key: string]: number }> => {
  try {
    const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
    return response.data.rates;
  } catch (error) {
    console.error('Failed to fetch currencies:', error);
    return {};
  }
};
