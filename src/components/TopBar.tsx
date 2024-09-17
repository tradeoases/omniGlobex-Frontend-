import { SlHandbag } from "react-icons/sl";
import { LuAlignLeft } from "react-icons/lu";
import { SetterOrUpdater, useSetRecoilState } from "recoil";
import { SidemenuStore } from "@/store/sidemenuStore";
import { Link } from "react-router-dom";

import { SearchBar } from "./search-bar";
import { Logo } from "./logo";
import { SelectShowroom } from "./select-show-room";
import CurrencySelector from "./CurrencySelector";
import LanguageSelector from "./LanguageSelector";

const TopBar = () => {
  const setSidemenu: SetterOrUpdater<boolean> =
    useSetRecoilState<boolean>(SidemenuStore);

  const onOpen = () => {
    setSidemenu(true);
  };

  return (
    <div className="w-full border-b py-4">
      <div className="hidden w-10/12 xl:w-8/12 mx-auto lg:flex  lg:items-center lg:justify-between">
        <Link to="/">
          <Logo />
        </Link>

        <SearchBar />

        <div className="flex items-center justify-end md:gap-4">
          <Link to="/track-order" className="whitespace-nowrap">
            Track Order
          </Link>
          <SelectShowroom />
          <CurrencySelector />
          <LanguageSelector />
        </div>
      </div>

      {/* Mobile / Tablet */}
      <div className="w-10/12 xl:w-8/12 mx-auto flex lg:hidden items-center justify-between">
        <div onClick={onOpen}>
          <LuAlignLeft className="text-2xl" />
        </div>
        <Link to="/">
          <Logo />
        </Link>
        <p className="relative">
          <span className="bg-main w-5 h-5 rounded-full text-xs flex items-center justify-center absolute -top-2 -right-3">
            3
          </span>
          <SlHandbag className="text-lg" />
        </p>
      </div>
    </div>
  );
};

export default TopBar;
