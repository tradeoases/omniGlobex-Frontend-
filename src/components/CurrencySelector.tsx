import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';


const CurrencySelector = () => {
  const { selectedCurrency, setCurrency, currencies } = useGlobalContext();

  return (
    <select value={selectedCurrency} onChange={(e) => setCurrency(e.target.value)}>
      {Object.keys(currencies).map((currency) => (
        <option key={currency} value={currency}>
          {currency}
        </option>
      ))}
    </select>
  );
};

export default CurrencySelector;
