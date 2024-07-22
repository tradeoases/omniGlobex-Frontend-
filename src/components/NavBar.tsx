import { useState } from "react";
import { LuChevronDown, LuChevronRight } from "react-icons/lu";
import { CiMenuFries } from "react-icons/ci";
import { Link } from "react-router-dom";

import { Button } from "./ui/button";
import { CategoriesPopup } from "./CategoriesPopup";
import { navs } from "@/data/data";
import { NavBarPagesItem } from "./navbar-page-item";

const NavBar = () => {
  const [showCategory, setShowCategory] = useState<boolean>(false);

  const onToggleCategory = () => {
    setShowCategory(!showCategory);
  };

  const handleShowCat = () => {
    showCategory ? setShowCategory(false) : setShowCategory(true);
  };

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
          <div className="flex items-center gap-6 xl:gap-10 relative -bottom-1">
            {navs.map((nav, i) =>
              nav.title === "Pages" ? (
                <NavBarPagesItem key={i} />
              ) : (
                <Link
                  to={nav.route}
                  key={i}
                  className="flex cursor-pointer items-center gap-x-1"
                >
                  <span className="whitespace-nowrap">{nav.title}</span>
                  {nav.icon && <LuChevronDown />}
                </Link>
              )
            )}
          </div>
        </div>
        <Button asChild className="space-x-2 rounded-none">
          <Link to="/become-seller">
            <span>Become a Seller</span> <LuChevronRight />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
