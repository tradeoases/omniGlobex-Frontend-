import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Logo } from "./logo";
import img from "../assets/omniGlobexlogo.png";
// import CurrencySelector from "./CurrencySelector";
// import LanguageSelector from "./LanguageSelector";
import { LuAlignLeft } from "react-icons/lu";
import { SetterOrUpdater, useRecoilState, useSetRecoilState } from "recoil";
import { SidemenuStore } from "@/store/side-menu-store";
import { SearchBar } from "./search-bar";
import { Button } from "./ui/button";
import { IUser, userStore } from "@/store/user-store";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { CiUser } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";

const TopBar = () => {
  const setSidemenu: SetterOrUpdater<boolean> =
    useSetRecoilState<boolean>(SidemenuStore);
  const onOpen = () => {
    // console.log('Hello')rrencySelector from "./CurrencySelector";
    // import La
    setSidemenu(true);
  };

  const navigate = useNavigate();

  const { t } = useTranslation();
  const location = useLocation();
  const isAuthenticating =
    location.pathname === "/signup" || location.pathname === "/signin";
  const [userData] = useRecoilState<IUser | null>(userStore);

  return (
    <header className="w-full border-b py-4">
      {/* Mobile / Tablet View */}
      <div className="w-10/12 xl:w-8/12 mx-auto flex justify-between items-center lg:hidden">
        <div className="flex gap-2 items-center">
          <div onClick={onOpen}>
            <LuAlignLeft className="text-2xl" />
          </div>
          <Link to="/" aria-label="Go to Home">
            <Logo />
          </Link>
        </div>
        <div className="flex flex-row items-center gap-4 mt-4">
          {/* <CurrencySelector />
          <LanguageSelector /> */}
        </div>
        {!userData && !isAuthenticating && (
          <div
            className={` text-black py-2 px-4 rounded-lg flex items-center space-x-2 hover:bg-gradient-to-l hover:shadow-lg transition-transform hover:scale-105`}
          >
            <NavLink to="/signin">
              <FaUserCircle className="text-4xl text-gray-700 cursor-pointer transition duration-300" />
            </NavLink>
          </div>
        )}
        {userData && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="link" className="p-0 m-0">
                <CiUser className="text-2xl" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit">
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => navigate(`/dashboard`)}>
                  {userData.fullname}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    // setUserData(null);
                    localStorage.removeItem("token");
                    localStorage.removeItem("profile");
                    navigate(0);
                  }}
                >
                  {t("Logout")} {/* Translate logout */}
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
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
        <SearchBar />

        <div className="flex items-center ml-14 justify-end gap-4">
          {/* <CurrencySelector />
          <LanguageSelector /> */}
        </div>
      </div>
    </header>
  );
};

export default TopBar;
