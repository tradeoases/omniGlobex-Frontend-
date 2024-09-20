import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useGlobalContext } from "../context/GlobalContext";
import { FaChevronDown } from "react-icons/fa";

const CurrencySelector: React.FC = () => {
  const { t } = useTranslation();
  const { currencies, selectedCurrency, setCurrency } = useGlobalContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const options = useMemo(() => {
    return Object.keys(currencies).map((currencyCode) => (
      <li
        key={currencyCode}
        onClick={() => {
          setCurrency(currencyCode);
          setIsDropdownOpen(false);
        }}
        className="cursor-pointer px-4 py-2 hover:bg-gray-200"
      >
        {currencyCode}
      </li>
    ));
  }, [currencies, setCurrency]);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsDropdownOpen(true)}
      onMouseLeave={() => setIsDropdownOpen(false)}
    >
      <button
        className="flex items-center px-2 py-2 bg-gray-100 rounded cursor-pointer"
        aria-label={t("selectCurrency")}
      >
        {selectedCurrency}
        <FaChevronDown
          size={10}
          className="ml-2"
          style={{ flexShrink: 0 }}
        />{" "}
      </button>

      {isDropdownOpen && (
        <ul className="absolute right-0 w-16 text-xs bg-white border rounded shadow-lg z-10 max-h-48 overflow-y-auto">
          {options}
        </ul>
      )}
    </div>
  );
};

export default CurrencySelector;
