// src/components/CurrencySelector.tsx
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select"; // Import react-select
import { useGlobalContext } from "../context/GlobalContext";
import ConfirmationModal from "./ConfirmationModal";

const CurrencySelector: React.FC = () => {
  const { t } = useTranslation();
  const { currencies, selectedCurrency, setCurrency } = useGlobalContext();
  const [showModal, setShowModal] = useState(false);
  const [pendingCurrency, setPendingCurrency] = useState<string | null>(null);

  const options = useMemo(() => {
    return Object.keys(currencies).map((currencyCode) => ({
      value: currencyCode,
      label: currencyCode,
    }));
  }, [currencies]);

  const handleCurrencyChange = (selectedOption: any) => {
    const newCurrency = selectedOption.value;
    setPendingCurrency(newCurrency);
    setShowModal(true); // Show confirmation modal
  };

  const confirmChange = () => {
    if (pendingCurrency) {
      setCurrency(pendingCurrency); // Apply the change
    }
    setShowModal(false);
  };

  return (
    <>
      <div className="w-full lg:w-auto">
        <Select
          options={options}
          defaultValue={options.find(
            (option) => option.value === selectedCurrency
          )}
          onChange={handleCurrencyChange}
          aria-label={t("selectCurrency")}
          styles={{
            container: (base) => ({
              ...base,
              width: "100%", // Full width for mobile
              maxWidth: "150px", // Adjust as needed for desktop
            }),
            menu: (base) => ({
              ...base,
              maxHeight: "150px", // Limit the dropdown height
              maxWidth: "80px",
              overflowY: "auto", // Enable scrolling for long lists
            }),
          }}
        />
      </div>

      {showModal && (
        <ConfirmationModal
          message={t("confirmCurrencyChange")}
          onCancel={() => setShowModal(false)}
          onConfirm={confirmChange}
        />
      )}
    </>
  );
};

export default CurrencySelector;
