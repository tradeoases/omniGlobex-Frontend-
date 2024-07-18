import { useState } from "react";
import { Button } from "./ui/button";
import { LuChevronDown, LuChevronRight } from "react-icons/lu";
import { CiMenuFries } from "react-icons/ci";
import { CategoriesPopup } from "./CategoriesPopup";
import { Link } from "react-router-dom";
import { navs } from "@/data/data";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

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
                <PagesItem />
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

export const PagesItem = () => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          variant="link"
          className="p-0 h-0 gap-2 flex items-center hover:underline"
        >
          Pages <LuChevronDown />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-52 mt-7 rounded-none shadow-none">
        <div className="flex flex-col justify-between space-y-2">
          {otherPages.map((nav) => (
            <Link
              className="text-gray-600 hover:text-main font-normal"
              key={nav.title}
              to={nav.route}
            >
              {nav.title}
            </Link>
          ))}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

const otherPages = [
  { title: "Privacy Policy", route: "privacy-policy" },
  { title: "Terms and Conditions", route: "terms-condition" },
  { title: "FAQ", route: "/faq" },
];
