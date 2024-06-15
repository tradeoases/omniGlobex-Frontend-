"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { LuChevronDown, LuChevronRight } from "react-icons/lu";
import { CiMenuFries } from "react-icons/ci";
import { CategoriesPopup } from "./CategoriesPopup";
import Link from "next/link";

const navs = [
  { title: "Homepage", icon: true },
  { title: "Shop", icon: true },
  { title: "Pages", icon: true },
  { title: "About" },
  { title: "Blog" },
  { title: "Contact" },
];

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
          <div className="flex items-center gap-x-10 p-4 rounded-t-lg bg-white relative -bottom-2 left-0 right-0">
            <p onClick={handleShowCat} className="flex items-center gap-x-2">
              <CiMenuFries
                className="text-lg text-black"
                style={{ transform: "scaleX(-1)" }}
              />
              <span>All Categories</span>
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
            {navs.map((nav, i) => (
              <p key={i} className="flex items-center gap-x-1">
                <span>{nav.title}</span> {nav.icon && <LuChevronDown />}
              </p>
            ))}
          </div>
        </div>
        <Button asChild className="space-x-2 rounded-none">
          <Link href="/become-seller">
            <span>Become a Seller</span> <LuChevronRight />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
