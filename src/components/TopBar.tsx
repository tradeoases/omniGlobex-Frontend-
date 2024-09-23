import { SlHandbag } from "react-icons/sl";
import { LuAlignLeft } from "react-icons/lu";
import { SetterOrUpdater, useSetRecoilState } from "recoil";
import { SidemenuStore } from "@/store/sidemenuStore";
import { Link } from "react-router-dom";
import { SearchBar } from "./search-bar";
import { Logo } from "./logo";
import img from "../assets/omniGlobexlogo.png";
import { SelectShowroom } from "./select-show-room";
import CurrencySelector from "./CurrencySelector";
import LanguageSelector from "./LanguageSelector";

// Badge Component for displaying numbers on icons (like cart items)
const Badge = ({ count }: { count: number }) => (
  <span className="bg-main w-5 h-5 rounded-full text-xs flex items-center justify-center absolute -top-2 -right-3">
    {count}
  </span>
);

const TopBar = () => {
  const setSidemenu: SetterOrUpdater<boolean> =
    useSetRecoilState<boolean>(SidemenuStore);

  const onOpen = () => {
    setSidemenu(true);
  };

  return (
    <header className="w-full border-b py-4">
      <div className="w-10/12 xl:w-8/12 mx-auto flex items-center justify-between lg:hidden">
        {/* Mobile / Tablet View */}
        <button
          onClick={onOpen}
          aria-label="Open Side Menu"
          className="text-2xl focus:outline-none"
        >
          <LuAlignLeft />
        </button>
        <Link to="/" aria-label="Go to Home">
          <Logo />
        </Link>
        <Link to="/cart" aria-label="View Cart" className="relative">
          <Badge count={3} />
          <SlHandbag className="text-lg" />
        </Link>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:flex lg:items-center lg:justify-between w-10/12 xl:w-8/12 mx-auto">
        <div className="flex items-center gap-x-4">
          {" "}
          <img
            src={img}
            alt="Omniglobex logo"
            onError={(e) => {
              e.currentTarget.src = "path-to-fallback-logo.png";
            }}
            className="h-12 w-auto cursor-pointer"
          />
          <Link to="/" aria-label="Go to Home">
            <Logo />
          </Link>
          <SearchBar />
        </div>

        <div className="flex items-center ml-14 justify-end gap-4">
          <Link to="/track-order" className="whitespace-nowrap hover:underline">
            Track Order
          </Link>
          <SelectShowroom />
          <CurrencySelector />
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
