import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';

const LanguageSelector = () => {
  const { selectedLanguage, setLanguage, languages } = useGlobalContext();

  return (
    <select value={selectedLanguage} onChange={(e) => setLanguage(e.target.value)}>
      {languages.map((lang) => (
        <option key={lang} value={lang}>
          {lang.toUpperCase()}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;
