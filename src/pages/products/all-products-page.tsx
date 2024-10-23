/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICategory } from "@/components/Sidemenu";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { LuFilter } from "react-icons/lu";
import { LiaTimesSolid } from "react-icons/lia";
import {
  IProduct,
  getAllProductCategories,
  filteredProducts,
} from "@/service/apis/product-services";
import { AxiosResponse, HttpStatusCode } from "axios";
import { ProductCard } from "@/components/product-card";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";

const AllProductsPage = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "15", 10);
  const catParams: string[] = [];
  searchParams.forEach((value, key) => {
    if (key.match(/^cat\d+$/)) {
      catParams.push(value);
    }
  });

  const {
    data: products,
    isLoading: productIsLoading,
    isSuccess: productSuccess,
    isError: productIsError,
    error: productError,
  } = useQuery({
    queryKey: [
      "products",
      searchParams.get("country"),
      searchParams.get("currency"),
      searchParams.get("pageSize"),
      searchParams.get("page"),
      searchParams.get("search"),
      searchParams.get("min"),
      searchParams.get("max"),
      searchParams.get("q"),
      searchParams.get("category"),
      ...catParams,
    ],
    queryFn: async () => {
      let params = `?page=${page}&pageSize=${pageSize}`;

      if (searchParams.get("search")?.trim() !== "") {
        params = params.concat(`&search=${searchParams.get("search")}`);
      }
      if (catParams.length > 0) {
        params = params.concat(`&categories=${catParams.join(",")}`);
      }
      if (searchParams.get("currency")?.trim() !== "") {
        params = params.concat(`&currency=${searchParams.get("currency")}`);
      }

      if (searchParams.get("country")?.trim() !== "") {
        params = params.concat(`&countryId=${searchParams.get("country")}`);
      }

      if (searchParams.get("q")?.trim() !== "") {
        params = params.concat(`&q=${searchParams.get("q")}`);
      }
      if (searchParams.get("min")?.trim() !== "") {
        params = params.concat(`&min=${searchParams.get("min")}`);
      }
      if (searchParams.get("max")?.trim() !== "") {
        params = params.concat(`&max=${searchParams.get("max")}`);
      }

      if (searchParams.get("category"))
        catParams.push(searchParams.get("category") || "");
      const response: AxiosResponse<any, any> = await filteredProducts(params);

      if (response.status === HttpStatusCode.Ok) {
        return response.data.data as {
          products: IProduct[];
          pageSize: number;
          page: number;
        };
      }
    },
  });

  return (
    <div className="w-full   grid grid-cols-1 lg:grid-cols-4 gap-x-8">
      <SideBar onOpen={() => setOpenMenu(false)} open={openMenu} />
      <div className="lg:col-span-3 w-full space-y-8">
        <div className="bg-white border rounded-xl px-6 py-6 w-full space-y-8 md:space-y-0 md:flex items-center justify-between">
          <p>
            <span className="text-gray-400">Showing</span>{" "}
            {products && products.products.length > 0 ? (
              <>
                {pageSize * (page - 1) + 1}-{pageSize * page} Products
              </>
            ) : (
              "0 results"
            )}
          </p>

          {/* <div className="flex items-center gap-2">
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
          </div> */}
          <button
            onClick={() => setOpenMenu(true)}
            type="button"
            className="lg:hidden text-3xl text-main border border-main rounded p-2"
          >
            <LuFilter />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {productIsLoading && <div>Loading...</div>}
          {productIsError && (
            <div>
              <h1>An error occured while loading products</h1>
              <h2>{productError.message}</h2>
            </div>
          )}
          {productSuccess && products && products?.products.length > 0 ? (
            products?.products.map((product) => (
              <ProductCard key={product.product_id} {...product} />
            ))
          ) : (
            <div>No products found based on filters</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProductsPage;

const ProductCategoryItem: React.FC<ICategory> = ({ category_id, name }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getCategoriesFromSearchParams = () => {
    const categories: { key: string; value: string }[] = [];
    const nonCategories: { key: string; value: string }[] = [];

    for (const [key, value] of searchParams.entries()) {
      if (key.startsWith("cat")) {
        categories.push({ key, value });
      } else {
        nonCategories.push({ key, value });
      }
    }
    return { categories, nonCategories };
  };

  const addCategory = (newCategory: string) => {
    const { categories, nonCategories } = getCategoriesFromSearchParams();
    const nextCategoryNumber = categories.length + 1;
    const newCategoryKey = `cat${nextCategoryNumber}`;

    const updatedSearchParams = new URLSearchParams();

    // Add the new category
    updatedSearchParams.set(newCategoryKey, newCategory);

    // Keep the rest of the existing params
    nonCategories.forEach(({ key, value }) =>
      updatedSearchParams.set(key, value)
    );
    categories.forEach(({ key, value }) => updatedSearchParams.set(key, value));

    setSearchParams(updatedSearchParams);
  };

  const deleteCategory = (categoryName: string) => {
    const { categories, nonCategories } = getCategoriesFromSearchParams();

    // Filter out the category we want to delete
    const updatedCategories = categories.filter(
      ({ value }) => value !== categoryName
    );

    // Renumber categories and update the search params
    const updatedSearchParams = new URLSearchParams();

    updatedCategories.forEach(({ value }, index) => {
      updatedSearchParams.set(`cat${index + 1}`, value);
    });

    // Keep the rest of the existing params
    nonCategories.forEach(({ key, value }) =>
      updatedSearchParams.set(key, value)
    );

    setSearchParams(updatedSearchParams);
  };

  const isCategorySelected = () => {
    return getCategoriesFromSearchParams().categories.some(
      ({ value }) => value === category_id
    );
  };

  const handleCheckboxChange = () => {
    if (isCategorySelected()) {
      deleteCategory(category_id);
    } else {
      addCategory(category_id);
    }
  };

  return (
    <div className="flex py-2 items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Checkbox toggles the category */}
        <Checkbox
          id={category_id}
          checked={isCategorySelected()}
          onClick={handleCheckboxChange}
          className=""
        />
        <label
          onClick={handleCheckboxChange}
          htmlFor={category_id}
          className="line-clamp-1 text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {name}
        </label>
      </div>

      {/* Add or remove icon depending on selection */}
      {isCategorySelected() ? (
        <FaMinus
          className="text-gray-400 text-xs"
          onClick={handleCheckboxChange}
        />
      ) : (
        <FaPlus
          className="text-gray-400 text-xs"
          onClick={handleCheckboxChange}
        />
      )}
    </div>
  );
};

interface ISideBarProps {
  open: boolean;
  onOpen: () => void;
}

const SideBar: React.FC<ISideBarProps> = ({ onOpen, open }) => {
  const [price, setPrice] = useState<{ min: string; max: string }>({
    min: "",
    max: "",
  });
  const [search, setSearch] = useState<string>("");
  const { data: categories, isSuccess } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response: AxiosResponse<any, any> = await getAllProductCategories();

      if (response.status === HttpStatusCode.Ok) {
        return response.data.data as ICategory[];
      }
    },
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const handleSearch = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (price.max.trim() !== "") {
      newSearchParams.set("max", price.max.trim());
    }
    if (price.min.trim() !== "") {
      newSearchParams.set("min", price.min.trim());
    }
    if (search.trim() !== "") {
      newSearchParams.set("q", search.trim());
    }
    setSearchParams(newSearchParams);
  };
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

      <div className="space-y-6 border-b">
        <p className="text-lg font-bold ">Price</p>

        <div className="pb-8 gap-x-4 flex">
          <Label>
            Min{" "}
            <Input
              onChange={(e) =>
                setPrice((v) => ({ ...v, [e.target.name]: e.target.value }))
              }
              value={price.min}
              name="min"
              placeholder="min"
              type="number"
            />
          </Label>
          <Label>
            Max
            <Input
              onChange={(e) =>
                setPrice((v) => ({ ...v, [e.target.name]: e.target.value }))
              }
              value={price.max}
              name="max"
              placeholder="max"
              type="number"
            />
          </Label>
        </div>
        <div className="pb-8 w-full gap-x-4">
          <Label>Search</Label>
          <Input
            className="w-full"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Search product, origin, price"
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>
      </div>
    </div>
  );
};
