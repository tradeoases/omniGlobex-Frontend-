import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGlobalContext } from '../context/GlobalContext';
import ConfirmationModal from './ConfirmationModal';

const LanguageSelector: React.FC = () => {
  const { t } = useTranslation();
  const { languages, selectedLanguage, setLanguage } = useGlobalContext();
  const [showModal, setShowModal] = useState(false);
  const [pendingLanguage, setPendingLanguage] = useState<string | null>(null);

  const options = useMemo(() => {
    return languages.map(lang => (
      <option key={lang.code} value={lang.code}>
        {lang.name} 
      </option>
    ));
  }, [languages]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value;
    setPendingLanguage(newLanguage);
    setShowModal(true);
  };

  const confirmChange = () => {
    if (pendingLanguage) {
      setLanguage(pendingLanguage);
    }
    setShowModal(false);
  };

  const selectedLang = languages.find(lang => lang.code === selectedLanguage);

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {selectedLang && (
        <img
          src={selectedLang.flag}
          alt={`${selectedLang.name} flag`}
          style={{ width: '24px', height: '16px', marginRight: '8px' }}
        />
      )}
      <select
        value={selectedLanguage}
        onChange={handleLanguageChange}
        aria-label={t('selectLanguage')}
      >
        {options}
      </select>
      {showModal && (
        <ConfirmationModal
          message={t('Confirm Language Change')}
          onCancel={() => setShowModal(false)}
          onConfirm={confirmChange}
        />
      )}
    </div>
  );
};

export default LanguageSelector;