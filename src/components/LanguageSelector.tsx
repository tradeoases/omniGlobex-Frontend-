import { useGlobalContext } from '../context/GlobalContext';

const LanguageSelector = () => {
  const { selectedLanguage, setLanguage, languages } = useGlobalContext();

  return (
    <select value={selectedLanguage} onChange={(e) => setLanguage(e.target.value)}>
      {languages.map((language) => (
        <option key={language.code} value={language.code}>
          {language.name}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;
