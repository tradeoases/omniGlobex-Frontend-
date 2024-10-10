import React, { useMemo, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Select, { SingleValue } from "react-select";

const CurrencySelector: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);

  const options = useMemo(() => {
    const currencies = [
      { name: "Euro", code: "EUR", description: "Primary currency for Europe, including Belgium, Germany, and the Netherlands." },
      { name: "US Dollar", code: "USD", description: "The global currency for international trade." },
      { name: "British Pound", code: "GBP", description: "For transactions with the UK." },
      { name: "Chinese Yuan", code: "CNY", description: "For suppliers and buyers in China." },
      { name: "Saudi Riyal", code: "SAR", description: "For trade in Saudi Arabia and the Middle East." },
      { name: "Emirati Dirham", code: "AED", description: "For the UAE market." },
      { name: "Polish Zloty", code: "PLN", description: "Key for transactions in Poland." },
      { name: "Swiss Franc", code: "CHF", description: "For the Swiss market." },
      { name: "Canadian Dollar", code: "CAD", description: "For North American transactions, particularly Canada." },
      { name: "Japanese Yen", code: "JPY", description: "For trade with Japan." },
      { name: "Omani Rial", code: "OMR", description: "For the Oman market." },
      { name: "Qatari Riyal", code: "QAR", description: "For the Qatar market." },
      { name: "Indian Rupee", code: "INR", description: "For the Indian market." },
      { name: "Brazilian Real", code: "BRL", description: "For the Brazilian market." },
      { name: "Turkish Lira", code: "TRY", description: "For the Turkish market." }
    ];

    return currencies.map((currency) => ({
      value: currency.code,
      label: currency.name,
    }));
  }, []);

  useEffect(() => {
    // Load the currency from URL or default to USD if not present
    const currencyFromURL = searchParams.get("currency");
    const currencyFromStorage = localStorage.getItem("selectedCurrency");

    if (currencyFromURL) {
      setSelectedCurrency(currencyFromURL);
    } else if (currencyFromStorage) {
      setSelectedCurrency(currencyFromStorage);
      searchParams.set("currency", currencyFromStorage);
      setSearchParams(searchParams);
    } else {
      // Default to USD
      setSelectedCurrency("USD");
      searchParams.set("currency", "USD");
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  const handleCurrencyChange = (
    newValue: SingleValue<{ value: string; label: string }>
  ) => {
    if (newValue) {
      const newCurrency = newValue.value;
      setSelectedCurrency(newCurrency);

      // Update the currency in searchParams without removing other parameters
      searchParams.set("currency", newCurrency);
      setSearchParams(searchParams);

      // Store the currency in localStorage
      localStorage.setItem("selectedCurrency", newCurrency);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
      <Select
        options={options}
        value={options.find((option) => option.value === selectedCurrency) || null}
        onChange={handleCurrencyChange}
        styles={{
          control: (base) => ({
            ...base,
            border: "1px solid #ccc",
            boxShadow: "none",
            "&:hover": {
              border: "1px solid #aaa",
            },
            minWidth: "120px",
            maxWidth: "250px",
            width: "100%",
          }),
          menu: (base) => ({
            ...base,
            zIndex: 100,
          }),
        }}
      />
    </div>
  );
};

export default CurrencySelector;
