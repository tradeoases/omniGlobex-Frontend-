import { useMemo, useState } from "react";
import Select, { SingleValue } from "react-select";
import { useGlobalContext } from "../context/GlobalContext";

// Define the type for the options
type OptionType = {
  value: string; // language code
  label: JSX.Element; // JSX for language name and flag
};

export default function LanguageSelector() {
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null); // Correctly typed state
  const { languages } = useGlobalContext();

  const options = useMemo(() => {
    return languages.map((lang) => ({
      value: lang.code, // language code
      label: (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={lang.flag}
            alt={`${lang.name} flag`}
            style={{ width: "20px", height: "14px", marginRight: "8px" }}
          />
          {lang.name}
        </div>
      ),
    }));
  }, [languages]);

  // Handle change event correctly with the correct types
  const handleChange = (newValue: SingleValue<OptionType>) => {
    setSelectedOption(newValue); // Update the state with the new selection
  };

  return (
    <div className="App">
      <Select
        value={selectedOption} // Controlled component
        onChange={handleChange} // Pass the handleChange function
        options={options} // Options generated from the languages array
      />
    </div>
  );
}
