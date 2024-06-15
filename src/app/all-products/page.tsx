"use client";

import { ICategory, categories } from "@/components/Sidemenu";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdKeyboardArrowDown } from "react-icons/md";
import { ProductCard } from "@/components/GameWorldSection";
import { LuFilter } from "react-icons/lu";
import { LiaTimesSolid } from "react-icons/lia";

const Page = () => {
  const [position, setPosition] = useState<string>("bottom");
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  return (
    <div className="w-10/12 xl:w-8/12 mx-auto my-10 grid grid-cols-1 lg:grid-cols-4 gap-x-8">
      <div
        className={`fixed overflow-x-scroll h-full top-0 left-0 right-0 lg:static lg:block bg-white max-h-fit py-10 px-10 lg:px-6 space-y-10 ${
          openMenu ? " block " : " hidden "
        }`}
      >
        <div onClick={() => setOpenMenu(false)} className="flex justify-end">
          <button
            type="button"
            className="p-2 rounded-lg border border-red-500 text-red-500 text-xl"
          >
            <LiaTimesSolid />
          </button>
        </div>
        <div className="space-y-6 border-b">
          <p className="text-lg font-bold">Product Categories</p>

          <div className="space-y-2 pb-8">
            {categories.map((cat, i) => (
              <ProductCategoryItem {...cat} key={i} />
            ))}
          </div>
        </div>

        <div className="space-y-6 border-b">
          <p className="text-lg font-bold">Brands</p>

          <div className="space-y-2 pb-8">
            {brands.map((brand, i) => (
              <BrandItem name={brand} key={i} />
            ))}
          </div>
        </div>

        <div className="space-y-6 border-b">
          <p className="text-lg font-bold">Storage</p>
          <div className="pb-8 flex items-center gap-2 flex-wrap">
            <p className="p-1 px-4 border hover:bg-main">64GB</p>
            <p className="p-1 px-4 border hover:bg-main">128GB</p>
            <p className="p-1 px-4 border hover:bg-main">256GB</p>
            <p className="p-1 px-4 border hover:bg-main">512GB</p>
            <p className="p-1 px-4 border hover:bg-main">1024GB</p>
          </div>
        </div>

        <div className="space-y-6 border-b">
          <p className="text-lg font-bold">Sizes</p>

          <div className="space-y-2 pb-8">
            {sizes.map((brand, i) => (
              <BrandItem name={brand} key={i} />
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-3 w-full space-y-8">
        <div className="bg-white px-6 py-6 w-full space-y-8 md:space-y-0 md:flex items-center justify-between">
          <p>
            <span className="text-gray-400">Showing</span> 1-16 of 66 results
          </p>

          <div className="flex items-center gap-2">
            <p>Sort by:</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <p className="cursor-pointer py-2 font-bold border-b flex items-center gap-x-3">
                  <span>{position}</span> <MdKeyboardArrowDown />
                </p>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-36">
                <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={position}
                  onValueChange={setPosition}
                >
                  <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="bottom">
                    Bottom
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="right">
                    Right
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <button
            onClick={() => setOpenMenu(true)}
            type="button"
            className="lg:hidden text-3xl text-main border border-main rounded p-2"
          >
            <LuFilter />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 16 }).map((_, i) => (
            <ProductCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;

{
  /* <FaPlus /> */
}

const ProductCategoryItem: React.FC<ICategory> = ({ name }) => {
  return (
    <div className="flex py-2 items-center justify-between">
      <div className="flex items-center gap-4">
        <Checkbox id="terms" />
        <label
          htmlFor="terms"
          className="line-clamp-1 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {name}
        </label>
      </div>
      <FaPlus className="text-gray-400" />
    </div>
  );
};

interface IBrand {
  name: string;
}

const BrandItem: React.FC<IBrand> = ({ name }) => {
  return (
    <div className="flex items-center py-2 gap-4">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="line-clamp-1 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {name}
      </label>
    </div>
  );
};

const brands: string[] = [
  "Apple",
  "Samsung",
  "Walton",
  "Oneplus",
  "Vivo",
  "Oppo",
  "Xiaomi",
  "Other",
];

const sizes: string[] = ["S", "M", "XL", "XXL", "Slim Fit"];
