import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import Select from 'react-select';

const LanguageSelector: React.FC = () => {
  const { selectedLanguage, setLanguage, languages } = useGlobalContext();

  const handleLanguageChange = (selectedOption: any) => {
    setLanguage(selectedOption.value);
  };

  const languageOptions = languages.map((lang) => ({
    value: lang.code,
    label: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={lang.flag} alt={`${lang.name} flag`} width="20" style={{ marginRight: '10px' }} />
        <span>{lang.name}</span>
      </div>
    ),
  }));

  return (
    <Select
      value={languageOptions.find(option => option.value === selectedLanguage)}
      onChange={handleLanguageChange}
      options={languageOptions}
    />
  );
};

export default LanguageSelector;
