// import { SetterOrUpdater, useSetRecoilState } from "recoil";
// import { SidemenuStore } from "@/store/sidemenuStore";
import { Link } from "react-router-dom";
import { Logo } from "./logo";
import img from "../assets/omniGlobexlogo.png";
import CurrencySelector from "./CurrencySelector";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";

// Badge Component for displaying numbers on icons (like cart items)
// const Badge = ({ count }: { count: number }) => (
//   <span className="bg-main w-5 h-5 rounded-full text-xs flex items-center justify-center absolute -top-2 -right-3">
//     {count}
//   </span>
// );

const TopBar = () => {
  // const setSidemenu: SetterOrUpdater<boolean> =
  //   useSetRecoilState<boolean>(SidemenuStore);

  // const onOpen = () => {
  //   setSidemenu(true);
  // };
  const { t } = useTranslation(); 

  return (
    <header className="w-full border-b py-4">
      {/* Mobile / Tablet View */} 
      <div className="w-10/12 xl:w-8/12 mx-auto flex items-center lg:hidden">
        {/* <Link to="/" aria-label="Go to Home">
          <Logo />
        </Link> */}
        <div className="flex items-center gap-4">
          <CurrencySelector />
          <LanguageSelector />
          {/* <Link to="/cart" aria-label="View Cart" className="relative">
            <Badge count={3} />
            <SlHandbag className="text-lg" />
          </Link> */}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:flex lg:items-center lg:justify-between w-10/12 xl:w-8/12 mx-auto">
        <div className="flex items-center gap-x-4">
          <img
            src={img}
            alt={t('omniglobexLogo', 'Omniglobex logo')}
            onError={(e) => {
              e.currentTarget.src = "path-to-fallback-logo.png";
            }}
            className="h-12 w-auto cursor-pointer"
          />
          <Link to="/" aria-label={t('goHome', 'Go to Home')}>
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
