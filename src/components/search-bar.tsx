/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getAllProductCategories,
  IProductCategory,
} from "@/service/apis/product-services";
import { CategoryStore } from "@/store/product-store";
import { AxiosResponse, HttpStatusCode } from "axios";
import { useEffect } from "react";
import { LuTally1 } from "react-icons/lu";
import { useRecoilState } from "recoil";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const SearchBar = () => {
  const [categories, setCategories] = useRecoilState<IProductCategory[] | null>(
    CategoryStore
  );

  useEffect(() => {
    if (!categories) fetchCategories();
  }, [categories]);

  const fetchCategories = async () => {
    try {
      const response: AxiosResponse<any, any> = await getAllProductCategories();

      if (response.status === HttpStatusCode.Ok) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-md max-w-4xl w-full mx-auto">
      {/* Input Field */}
      <input
        type="text"
        className="pl-2 flex-1 outline-none text-xs md:text-sm lg:text-base"
        placeholder="Search Product..."
      />

      {/* Category Select Dropdown */}
      <Select>
        <SelectTrigger className="w-32 md:w-36 lg:w-44 focus:ring-0 border-l focus:ring-offset-0 bg-light rounded-none gap-x-4 border-none shadow-none">
          <LuTally1 className="text-gray-400" />
          <SelectValue placeholder="All categories" />
        </SelectTrigger>
        <SelectContent className="shadow-none">
          <SelectGroup>
            <SelectLabel>Categories</SelectLabel>
            {categories &&
              categories.map((item) => (
                <SelectItem
                  className="line-clamp-1"
                  key={item.category_id}
                  value={item.category_id}
                >
                  {item.name}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Search Button */}
      <button className="bg-main py-2 px-4 text-xs md:text-sm lg:text-base font-bold text-white hover:bg-main-dark flex-shrink-0">
        Search
      </button>
    </div>
  );
};
