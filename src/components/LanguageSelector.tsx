import React from 'react';
import { useGlobalContext } from '../context/GlobalContext'; // Adjust import if necessary

const LanguageSelector: React.FC = () => {
  const { selectedLanguage, setLanguage, languages } = useGlobalContext();

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
  };

  return (
    <select value={selectedLanguage} onChange={handleLanguageChange}>
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;
