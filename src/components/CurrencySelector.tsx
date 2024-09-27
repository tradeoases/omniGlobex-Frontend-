import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGlobalContext } from '../context/GlobalContext';
import ConfirmationModal from './ConfirmationModal';

const CurrencySelector: React.FC = () => {
  const { t } = useTranslation();
  const { currencies, selectedCurrency, setCurrency } = useGlobalContext();
  const [showModal, setShowModal] = useState(false);
  const [pendingCurrency, setPendingCurrency] = useState<string | null>(null);

  const options = useMemo(() => {
    return Object.keys(currencies).map(currencyCode => (
      <option key={currencyCode} value={currencyCode}>
        {currencyCode} 
      </option>
    ));
  }, [currencies]);

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCurrency = e.target.value;
    setPendingCurrency(newCurrency);
    setShowModal(true);  // show confirmton modal
  };

  const confirmChange = () => {
    if (pendingCurrency) {
      setCurrency(pendingCurrency);  // ply the change
    }
    setShowModal(false);
  };

  return (
    <>
      <select
        value={selectedCurrency}
        onChange={handleCurrencyChange}
        aria-label={t('selectCurrency')}
      >
        {options}
      </select>
      {showModal && (
        <ConfirmationModal
          message={t('confirmCurrencyChange')}
          onCancel={() => setShowModal(false)}
          onConfirm={confirmChange}
        />
      )}
    </>
  );
};

export default CurrencySelector;
