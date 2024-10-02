/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICategory } from "@/components/Sidemenu";
import { Checkbox } from "@/components/ui/checkbox";
import React, {
  useState, // { useState }
} from "react";
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
import {
  IProduct,
  getAllProductCategories,
  getAllProducts,
} from "@/service/apis/product-services";
import { AxiosResponse, HttpStatusCode } from "axios";
import { ProductCard } from "@/components/product-card";
import { useQuery } from "@tanstack/react-query";

const AllProductsPage = () => {
  const [position, setPosition] = useState<string>("bottom");
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const pageSize = 15;
  const currentPage = 1;

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response: AxiosResponse<any, any> = await getAllProducts(
        `?page=${currentPage}&pageSize=${pageSize}`
      );

      if (response.status === HttpStatusCode.Ok) {
        return response.data.data as {
          products: IProduct[];
          pageSize: number;
          page: number;
        };
      }
    },
  });

  const totalResults = 120;

  return (
    <div className="w-full   grid grid-cols-1 lg:grid-cols-4 gap-x-8">
      <SideBar onOpen={() => setOpenMenu(false)} open={openMenu} />
      <div className="lg:col-span-3 w-full space-y-8">
        <div className="bg-white border rounded-xl px-6 py-6 w-full space-y-8 md:space-y-0 md:flex items-center justify-between">
          <p>
            <span className="text-gray-400">Showing</span>{" "}
            {products && products.products.length > 0 ? (
              <>
                {pageSize * (currentPage - 1) + 1}-
                {Math.min(pageSize * currentPage, totalResults)} of{" "}
                {totalResults} results
              </>
            ) : (
              "0 results"
            )}
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
            products.products.length === 0 ? (
              <div>No Products</div>
            ) : (
              products.products.map((product) => (
                <ProductCard key={product.product_id} {...product} />
              ))
            )
          ) : (
            <div>loading...</div>
          )}
        </div>
      </div>
      //{" "}
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

interface ISideBarProps {
  open: boolean;
  onOpen: () => void;
}

const SideBar: React.FC<ISideBarProps> = ({ onOpen, open }) => {
  const { data: categories, isSuccess } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response: AxiosResponse<any, any> = await getAllProductCategories();

      if (response.status === HttpStatusCode.Ok) {
        return response.data.data as ICategory[];
      }
    },
  });
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
          {isSuccess &&
            categories?.map((cat: ICategory) => (
              <ProductCategoryItem {...cat} key={cat.category_id} />
            ))}
        </div>
      </div>
    </div>
  );
};
