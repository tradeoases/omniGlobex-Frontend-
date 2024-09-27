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
    !categories && fetchCategories();
  }, []);

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
    <div className="flex items-center border">
      <div className="py-2">
        <input
          type="text"
          className="pl-2 outline-none text-xs xl:text-sm bg-light"
          placeholder="Search Product..."
        />
      </div>
      <Select>
        <SelectTrigger className="w-44 focus:ring-0 border-l focus:ring-offset-0 bg-light rounded-none gap-x-4 border-none shadow-none">
          <LuTally1 className="text-gray-400" />
          <SelectValue placeholder="All categories" />
        </SelectTrigger>
        <SelectContent className="shadow-none">
          <SelectGroup>
            <SelectLabel>Categories</SelectLabel>
            {categories &&
              categories.map((item, i) => (
                <SelectItem
                  className="line-clamp-1"
                  key={i}
                  value={item.category_id}
                >
                  {item.name}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="bg-main py-3 px-4 xl:px-6">
        <p className="font-bold text-xs xl:text-sm cursor-pointer">Search</p>
      </div>
    </div>
  );
};
