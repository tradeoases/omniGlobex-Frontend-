import React, { useState } from "react";
import { HiMiniChevronUpDown } from "react-icons/hi2";

export interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  selectedOptions: Option[];
  onChange: (selected: Option[]) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selectedOptions,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: Option) => {
    if (selectedOptions.find((o) => o.value === option.value)) {
      onChange(selectedOptions.filter((o) => o.value !== option.value));
    } else {
      onChange([...selectedOptions, option]);
    }
  };

  const filteredOptions = options?.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full">
      <div
        className="border rounded-lg py-2 px-4 grid grid-cols-12 cursor-pointer"
        onClick={toggleDropdown}
      >
        <div className="col-span-10 flex items-center">
          <div className="overflow-x-scroll no-scrollbars whitespace-nowrap scroll-smooth flex items-center justify-start">
            {selectedOptions.length > 0 ? (
              selectedOptions.map((option) => (
                <span
                  key={option.value}
                  className="bg-gray-300 text-xs text-gray-900 px-1 mx-1 rounded-full"
                >
                  {option.label}
                </span>
              ))
            ) : (
              <span className="text-sm text-gray-700">
                Select one or more...
              </span>
            )}
          </div>
        </div>
        <span className="ml-4 text-gray-400">
          <HiMiniChevronUpDown className="text-2xl" />
        </span>
      </div>
      {isOpen && (
        <div className="absolute top-12 left-0 w-full border rounded-lg bg-white z-10">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border-b"
          />
          <ul className="max-h-60 overflow-y-auto">
            {filteredOptions?.map((option) => (
              <li
                key={option.value}
                onClick={() => handleOptionClick(option)}
                className={`px-2 py-1 border-b line-clamp-1 cursor-pointer ${
                  selectedOptions.find((o) => o.value === option.value)
                    ? "bg-gray-300 text-black"
                    : "hover:bg-gray-200"
                }`}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
