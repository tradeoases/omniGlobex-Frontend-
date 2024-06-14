import React from "react";
import { Button } from "./ui/button";
import { LuAlignLeft, LuChevronDown, LuChevronRight } from "react-icons/lu";
import { CiMenuFries } from "react-icons/ci";

const navs = [
  { title: "Homepage", icon: true },
  { title: "Shop", icon: true },
  { title: "Pages", icon: true },
  { title: "About" },
  { title: "Blog" },
  { title: "Contact" },
];

const NavBar = () => {
  return (
    <div className="hidden lg:block w-full border-b py-2 bg-main">
      <div className="hidden w-10/12 xl:w-8/12 mx-auto lg:flex items-center justify-between">
        <div className="flex gap-x-4 font-semibold text-sm items-center relative">
          <div className="flex items-center gap-x-10 p-4 rounded-t-lg bg-white relative -bottom-3 left-0 right-0">
            <p className="flex items-center gap-x-2">
            <CiMenuFries className="text-lg text-black"  style={{ transform: 'scaleX(-1)' }}/><span>All Categories</span></p>
            <LuChevronDown />
          </div>
          {navs.map((nav, i) => (
            <p key={i} className="flex items-center gap-x-2">
              <span>{nav.title}</span> {nav.icon && <LuChevronDown />}
            </p>
          ))}
        </div>
        <Button className="space-x-2 rounded-none">
          <span>Become a Seller</span> <LuChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
