// ./components/TopBanner.tsx
// import React from 'react';
import { Link } from 'react-router-dom';
// import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import CurrencySelector from './CurrencySelector';
import LanguageSelector from './LanguageSelector';
import {SelectShowroom} from './select-show-room';

const TopBanner = () => {
  return (
    <div className="w-full text-xs border-b py-3">
      <div className="w-full px-4 md:w-10/12 xl:w-8/12 mx-auto flex items-center justify-between">
        <div className="flex items-center justify-start gap-4">
          <Link to="/track-order" className="whitespace-nowrap">Track Order</Link>
          <Link to="/signup" className="whitespace-nowrap">Account</Link>
          <Link to="/support" className="whitespace-nowrap">Support</Link>
        </div>

        <div className="flex items-center justify-end md:gap-4">
        <SelectShowroom />
          <CurrencySelector />
          <LanguageSelector />
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
