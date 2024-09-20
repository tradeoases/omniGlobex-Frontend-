import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useGlobalContext } from "../context/GlobalContext";
import { FaChevronDown } from "react-icons/fa";
import img from "../assets/img.png";

const LanguageSelector: React.FC = () => {
  const { t } = useTranslation();
  const { languages, selectedLanguage, setLanguage } = useGlobalContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const options = useMemo(() => {
    return languages.map((lang) => (
      <li
        key={lang.code}
        onClick={() => {
          setLanguage(lang.code);
          setIsDropdownOpen(false);
        }}
        className="cursor-pointer px-4 py-2 hover:bg-gray-200"
      >
        {lang.name}
      </li>
    ));
  }, [languages, setLanguage]);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsDropdownOpen(true)}
      onMouseLeave={() => setIsDropdownOpen(false)}
    >
      <button
        className="flex items-center px-2 py-2 bg-gray-100 rounded cursor-pointer"
        aria-label={t("selectLanguage")}
      >
        <img src={img} alt="Flag" className="w-4 h-3 mr-2" />
        <span className="">
          {languages
            .find((lang) => lang.code === selectedLanguage)
            ?.name.slice(0, 2)}{" "}
        </span>
        <FaChevronDown size={10} className="ml-2" style={{ flexShrink: 0 }} />{" "}
      </button>

      {isDropdownOpen && (
        <ul className="absolute right-0 w-36 text-xs bg-white border rounded shadow-lg z-10 max-h-48 overflow-y-auto">
          {options}
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;
