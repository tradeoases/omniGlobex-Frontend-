import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useGlobalContext } from '../context/GlobalContext';
import Select, { SingleValue } from 'react-select';

const CurrencySelector: React.FC = () => {
  const { t } = useTranslation();
  const { currencies, selectedCurrency, setCurrency } = useGlobalContext(); // Ensure this is used correctly

  // Convert currencies into the format required by react-select
  const options = useMemo(() => {
    return Object.keys(currencies).map(currencyCode => ({
      value: currencyCode,
      label: currencyCode.toUpperCase(), // Display the currency code in uppercase
    }));
  }, [currencies]);

  const handleCurrencyChange = (newValue: SingleValue<{ value: string; label: string }>) => {
    // Check if newValue is not null and handle the currency change
    if (newValue) {
      const newCurrency = newValue.value;
      setCurrency(newCurrency);
      localStorage.setItem('selectedCurrency', newCurrency);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <Select
        options={options}
        value={options.find(option => option.value === selectedCurrency) || null} // Provide null if no match
        onChange={handleCurrencyChange}
        aria-label={t('selectCurrency')}
        styles={{
          control: (base) => ({
            ...base,
            border: '1px solid #ccc',
            boxShadow: 'none',
            '&:hover': {
              border: '1px solid #aaa',
            },
            minWidth: '120px', // Minimum width for the dropdown
            maxWidth: '250px', // Maximum width to prevent overflow
            width: '100%', // Make it responsive
          }),
          menu: (base) => ({
            ...base,
            zIndex: 100, // Make sure the dropdown is on top
          }),
        }}
      />
    </div>
  );
};

export default CurrencySelector;
