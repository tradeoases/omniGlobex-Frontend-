/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICategory } from "@/components/Sidemenu";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useEffect, useState } from "react";
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
import { LuFilter } from "react-icons/lu";
import { LiaTimesSolid } from "react-icons/lia";
import { ProductStore } from "@/store/product-store";
import { useRecoilState } from "recoil";
import { IProduct, getAllProducts } from "@/service/apis/product-services";
import { AxiosResponse, HttpStatusCode } from "axios";
import { categories } from "@/data/data";
import { ProductCard } from "@/components/product-card";

const AllProductsPage = () => {
  const [position, setPosition] = useState<string>("bottom");
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const [products, setProducts] = useRecoilState<IProduct[] | null>(
    ProductStore
  );

  const fetchProducts = async () => {
    try {
      const response: AxiosResponse<any, any> = await getAllProducts(
        `?page=1&pageSize=15`
      );

      if (response.status === HttpStatusCode.Ok) {
        console.log({ response });
        setProducts(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    !products && fetchProducts();
  }, []);

  return (
    <div className="w-10/12 xl:w-8/12 mx-auto my-10 grid grid-cols-1 lg:grid-cols-4 gap-x-8">
      <SideBar onOpen={() => setOpenMenu(false)} open={openMenu} />

      <div className="lg:col-span-3 w-full space-y-8">
        <div className="bg-white border rounded-xl px-6 py-6 w-full space-y-8 md:space-y-0 md:flex items-center justify-between">
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

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {products ? (
            products.map((product, i) => <ProductCard key={i} {...product} />)
          ) : (
            <div>loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProductsPage;

const ProductCategoryItem: React.FC<ICategory> = ({ name }) => {
  return (
    <div className="flex py-2 items-center justify-between">
      <div className="flex items-center gap-4">
        <Checkbox id="terms" className="" />
        <label
          htmlFor="terms"
          className="line-clamp-1 text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {name}
        </label>
      </div>
      <FaPlus className="text-gray-400 text-xs" />
    </div>
  );
};

interface IBrand {
  name: string;
}

const BrandItem: React.FC<IBrand> = ({ name }) => {
  return (
    <div className="flex items-center py-2 gap-4">
      <Checkbox id="terms" className="" />
      <label
        htmlFor="terms"
        className="line-clamp-1 text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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

interface ISideBarProps {
  open: boolean;
  onOpen: () => void;
}

const SideBar: React.FC<ISideBarProps> = ({ onOpen, open }) => {
  return (
    <div
      className={`fixed z-10 overflow-x-scroll h-full top-0 left-0 right-0 rounded-xl lg:static lg:block bg-white lg:bg-gray-100 border max-h-fit py-10 px-10 lg:px-6 space-y-10 ${
        open ? " block " : " hidden "
      }`}
    >
      <div onClick={onOpen} className="flex justify-end">
        <button
          type="button"
          className="p-2 lg:hidden rounded-lg text-red-500 text-xl"
        >
          <LiaTimesSolid />
        </button>
      </div>
      <div className="space-y-6 border-b">
        <p className="text-lg font-bold ">Product Categories</p>

        <div className="space-y-2 pb-8">
          {categories.map((cat, i) => (
            <ProductCategoryItem {...cat} key={i} />
          ))}
        </div>
      </div>

      <div className="space-y-6 border-b">
        <p className="text-lg font-bold ">Brands</p>

        <div className="space-y-2 pb-8">
          {brands.map((brand, i) => (
            <BrandItem name={brand} key={i} />
          ))}
        </div>
      </div>

      {/* <div className="space-y-6 border-b text-xs lg:text-white">
        <p className="text-lg font-bold">Storage</p>
        <div className="pb-8 flex items-center gap-2 flex-wrap">
          <p className="p-1 px-4 border hover:bg-main">64GB</p>
          <p className="p-1 px-4 border hover:bg-main">128GB</p>
          <p className="p-1 px-4 border hover:bg-main">256GB</p>
          <p className="p-1 px-4 border hover:bg-main">512GB</p>
          <p className="p-1 px-4 border hover:bg-main">1024GB</p>
        </div>
      </div> */}

      <div className="space-y-6 border-b ">
        <p className="text-lg font-bold">Sizes</p>

        <div className="space-y-2 pb-8">
          {sizes.map((brand, i) => (
            <BrandItem name={brand} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};
