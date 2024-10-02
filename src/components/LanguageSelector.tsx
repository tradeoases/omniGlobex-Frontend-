import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'react-select'; // Import react-select
import { useGlobalContext } from '../context/GlobalContext';
import ConfirmationModal from './ConfirmationModal';

const LanguageSelector: React.FC = () => {
  const { t } = useTranslation();
  const { languages, selectedLanguage, setLanguage } = useGlobalContext();
  const [showModal, setShowModal] = useState(false);
  const [pendingLanguage, setPendingLanguage] = useState<string | null>(null);

  // Map language options with label and value for react-select
  const options = useMemo(() => {
    return languages.map(lang => ({
      value: lang.code,
      label: (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={lang.flag}
            alt={`${lang.name} flag`}
            style={{ width: '20px', height: '14px', marginRight: '8px' }}
          />
          {lang.name}
        </div>
      )
    }));
  }, [languages]);

  const handleLanguageChange = (selectedOption: any) => {
    const newLanguage = selectedOption.value;
    setPendingLanguage(newLanguage);
    setShowModal(true); // Show confirmation modal
  };

  const confirmChange = () => {
    if (pendingLanguage) {
      setLanguage(pendingLanguage); // Apply language change
    }
    setShowModal(false);
  };

  return (
    <>
      <div className="w-full lg:w-auto">
        <Select
          options={options}
          defaultValue={options.find(option => option.value === selectedLanguage)}
          onChange={handleLanguageChange}
          aria-label={t('selectLanguage')}
          styles={{
            container: (base) => ({
              ...base,
              width: '100%', // Full width for mobile
              maxWidth: '150px', // Adjust as needed for desktop
            }),
            menu: (base) => ({
              ...base,
              maxHeight: '150px', // Limit the dropdown height
              overflowY: 'auto', // Only menu scrolls, not parent container
              zIndex: 999, // Ensure dropdown is above other elements
            }),
            control: (base) => ({
              ...base,
              padding: '4px', // Compact control padding
            }),
            valueContainer: (base) => ({
              ...base,
              overflow: 'visible', // Prevent overflow issues on control
            }),
          }}
        />
      </div>

      {showModal && (
        <ConfirmationModal
          message={t('Confirm Language Change')}
          onCancel={() => setShowModal(false)}
          onConfirm={confirmChange}
        />
      )}
    </>
  );
};

export default LanguageSelector;
