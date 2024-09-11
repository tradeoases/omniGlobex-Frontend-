import { useState } from "react";
import { LuChevronDown, LuChevronRight } from "react-icons/lu";
import { CiMenuFries } from "react-icons/ci";
import { NavLink, useLocation } from "react-router-dom";

import { Button } from "./ui/button";
import { CategoriesPopup } from "./CategoriesPopup";
import { navs } from "@/data/data";
import { NavBarPagesItem } from "./navbar-page-item";

const NavBar = () => {
  const [showCategory, setShowCategory] = useState<boolean>(false);
  const location = useLocation();

  const onToggleCategory = () => {
    setShowCategory(!showCategory);
  };

  const handleShowCat = () => {
    showCategory ? setShowCategory(false) : setShowCategory(true);
  };

  const isSellerActive = location.pathname === "/become-seller";
  console.log({ isSellerActive });

  return (
    <div className="hidden lg:block w-full border-b py-2 bg-main">
      <div className="hidden w-10/12 xl:w-8/12 mx-auto lg:flex items-center justify-between">
        <div className="flex gap-x-6 font-semibold text-sm items-center relative">
          <div className="flex items-center cursor-pointer gap-x-10 p-4 rounded-t-lg bg-white relative -bottom-2 left-0 right-0">
            <p onClick={handleShowCat} className="flex items-center gap-x-2">
              <CiMenuFries
                className="text-lg text-black"
                style={{ transform: "scaleX(-1)" }}
              />
              <span className="whitespace-nowrap">All Categories</span>
            </p>
            <LuChevronDown onClick={handleShowCat} className="text-sm" />

            {showCategory && (
              <CategoriesPopup
                onToggle={onToggleCategory}
                isOpen={showCategory}
              />
            )}
          </div>
          <div className="flex items-center gap-6 xl:gap-10 relative -bottom-1 flex-1">
            {navs.map((nav, i) =>
              nav.title === "Pages" ? (
                <NavBarPagesItem key={i} />
              ) : (
                <NavLink
                  to={nav.route}
                  key={i}
                  className={({ isActive }) =>
                    `flex cursor-pointer items-center gap-x-2 ${
                      isActive
                        ? "text-yellow-700 font-bold border-b-2 border-yellow-700"
                        : ""
                    }`
                  }
                >
                  <span className="whitespace-nowrap">{nav.title}</span>
                  {nav.icon && <LuChevronDown />}
                </NavLink>
              )
            )}
          </div>

          <Button
            asChild
            className={`bg-gradient-to-r from-yellow-200 to-yellow-700 text-black py-2 px-4 rounded-lg flex items-center space-x-2 hover:bg-gradient-to-l hover:shadow-lg transition-transform hover:scale-105 ${
              isSellerActive ? "font-bold text-yellow-700" : ""
            }`}
          >
            <NavLink to="/become-seller">
              <span>Become a Seller</span> <LuChevronRight />
            </NavLink>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
