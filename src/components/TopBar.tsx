import { Link } from "react-router-dom";
import { Logo } from "./logo";
import img from "../assets/omniGlobexlogo.png";
import CurrencySelector from "./CurrencySelector";
import LanguageSelector from "./LanguageSelector";

const TopBar = () => {
  return (
    <header className="w-full border-b py-4">
      {/* Mobile / Tablet View */}
      <div className="w-10/12 xl:w-8/12 mx-auto flex flex-col items-center lg:hidden">
        <Link to="/" aria-label="Go to Home">
          <Logo />
        </Link>
        <div className="flex flex-row items-center gap-4 mt-4">
          <CurrencySelector />
          <LanguageSelector />
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:flex lg:items-center lg:justify-between w-10/12 xl:w-8/12 mx-auto">
        <div className="flex items-center gap-x-4">
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
        </div>

        <div className="flex items-center ml-14 justify-end gap-4">
          <CurrencySelector />
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
