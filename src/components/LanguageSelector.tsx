import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useGlobalContext } from '../context/GlobalContext';

const LanguageSelector: React.FC = () => {
  const { t } = useTranslation();
  const { languages, selectedLanguage, setLanguage } = useGlobalContext();

  const options = useMemo(() => {
    return languages.map(lang => (
      <option key={lang.code} value={lang.code}>
         {lang.name}
      </option>
    ));
  }, [languages]);

  return (
    <select
      value={selectedLanguage}
      onChange={(e) => setLanguage(e.target.value)}
      aria-label={t('selectLanguage')}
    >
      {options}
    </select>
  );
};

export default LanguageSelector;
