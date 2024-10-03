// import React, { useMemo } from "react";
// import { useTranslation } from "react-i18next";
// import Select from "react-select";
// import { useGlobalContext } from "../context/GlobalContext";

// const LanguageSelector: React.FC = () => {
//   const { t } = useTranslation();
//   const { languages, selectedLanguage } = useGlobalContext();

//   // Map language options with label and value for react-select
//   const options = useMemo(() => {
//     return languages.map((lang) => ({
//       value: lang.code,
//       label: (
//         <div style={{ display: "flex", alignItems: "center" }}>
//           <img
//             src={lang.flag}
//             alt={`${lang.name} flag`}
//             style={{ width: "20px", height: "14px", marginRight: "8px" }}
//           />
//           {lang.name}
//         </div>
//       ),
//     }));
//   }, [languages]);

//   return (
//     <>
//       <div className="w-full lg:w-auto">
//         <Select
//           options={options}
//           defaultValue={options.find(
//             (option) => option.value === selectedLanguage
//           )}
//           aria-label={t("selectLanguage")}
//           styles={{
//             container: (base) => ({
//               ...base,
//               width: "100%",
//               maxWidth: "150px",
//             }),
//             menu: (base) => ({
//               ...base,
//               maxHeight: "150px",
//               overflowY: "auto",
//               zIndex: 999,
//             }),
//             control: (base) => ({
//               ...base,
//               padding: "4px",
//             }),
//             valueContainer: (base) => ({
//               ...base,
//               overflow: "visible",
//             }),
//           }}
//         />
//       </div>
//     </>
//   );
// };

// export default LanguageSelector;

import { useMemo, useState } from "react";
import Select from "react-select";
import { useGlobalContext } from "../context/GlobalContext";

// const options = [
//   { value: "chocolate", label: "Chocolate" },
//   { value: "strawberry", label: "Strawberry" },
//   { value: "vanilla", label: "Vanilla" },
// ];

export default function LanguageSelector() {
  const [selectedOption, setSelectedOption] = useState(null);
  const { languages, selectedLanguage } = useGlobalContext();
  const options = useMemo(() => {
        return languages.map((lang) => ({
          value: lang.code,
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

  return (
    <div className="App">
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
    </div>
  );
}
