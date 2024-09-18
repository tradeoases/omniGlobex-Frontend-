import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useGlobalContext } from '../context/GlobalContext';

const CurrencySelector: React.FC = () => {
  const { t } = useTranslation();
  const { currencies, selectedCurrency, setCurrency } = useGlobalContext();

  const options = useMemo(() => {
    return Object.keys(currencies).map(currencyCode => (
      <option key={currencyCode} value={currencyCode}>
        {currencyCode} 
      </option>
    ));
  }, [currencies]);

  return (
    <select
      value={selectedCurrency}
      onChange={(e) => setCurrency(e.target.value)}
      aria-label={t('selectCurrency')}
    >
      {options}
    </select>
  );
};

export default CurrencySelector;
