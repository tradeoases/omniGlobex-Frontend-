// /* eslint-disable @typescript-eslint/no-explicit-any */
// import {
//   getAllProductCategories,
//   IProductCategory,
// } from "@/service/apis/product-services";
// import { AxiosResponse, HttpStatusCode } from "axios";
// import { LuTally1 } from "react-icons/lu";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useQuery } from "@tanstack/react-query";
// import { useSearchParams } from "react-router-dom";
// import { Input } from "./ui/input";

// export const SearchBar = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const { data: categories } = useQuery({
//     queryKey: ["categories"],
//     queryFn: async () => {
//       const response: AxiosResponse<any, any> = await getAllProductCategories();

//       if (response.status === HttpStatusCode.Ok) {
//         return response.data.data as IProductCategory[];
//       }
//     },
//   });

//   return (
//     <div className="flex items-center justify-evenly border border-gray-300 rounded-md max-w-4xl w-full mx-auto">
//       {/* Input Field */}
//       <Input
//         type="text"
//         className="pl-2 flex-1 outline-none text-xs md:text-sm lg:text-base"
//         placeholder="Search Product..."
//         value={searchParams.get("search") || ""}
//         onChange={(e) => {
//           const value = e.target.value;
//           if (value.trim().length === 0) return searchParams.delete("search");
//           setSearchParams({
//             ...Object.fromEntries(searchParams),
//             search: value,
//           });
//         }}
//       />

//       {/* Category Select Dropdown */}
//       <Select
//         onValueChange={(e) => {
//           console.log({ e });
//           setSearchParams({ ...Object.fromEntries(searchParams), category: e });
//         }}
//         value={searchParams.get("category") || ""}
//       >
//         <SelectTrigger className="w-32 md:w-36 lg:w-44 focus:ring-0 border-l focus:ring-offset-0 bg-light rounded-none gap-x-4 border-none shadow-none">
//           <LuTally1 className="text-gray-400" />
//           <SelectValue placeholder="All categories" />
//         </SelectTrigger>
//         <SelectContent className="shadow-none">
//           <SelectGroup>
//             <SelectLabel>Categories</SelectLabel>
//             {categories &&
//               categories.map((item) => (
//                 <SelectItem
//                   className="line-clamp-1"
//                   key={item.category_id}
//                   value={item.category_id}
//                 >
//                   {item.name}
//                 </SelectItem>
//               ))}
//           </SelectGroup>
//         </SelectContent>
//       </Select>

//       {/* Search Button */}
//       {/* <button className="bg-main py-2 px-4 text-xs md:text-sm lg:text-base font-bold text-white hover:bg-main-dark flex-shrink-0">
//         Search
//       </button> */}
//     </div>
//   );
// };

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getAllProductCategories,
  IProductCategory,
} from "@/service/apis/product-services";
import { AxiosResponse, HttpStatusCode } from "axios";
import { LuTally1 } from "react-icons/lu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { Input } from "./ui/input";
import { useEffect, useState } from "react"; // Import useEffect and useState

export const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response: AxiosResponse<any, any> = await getAllProductCategories();

      if (response.status === HttpStatusCode.Ok) {
        return response.data.data as IProductCategory[];
      }
    },
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      const newSearchParams = new URLSearchParams(searchParams);
      
      if (searchQuery.trim().length === 0) {
        newSearchParams.delete("search");
      } else {
        newSearchParams.set("search", searchQuery);
      }

      setSearchParams(newSearchParams);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, searchParams, setSearchParams]);

  return (
    <div className="flex items-center justify-evenly border border-gray-300 rounded-md max-w-4xl w-full mx-auto">
      
      <Input
        type="text"
        className="pl-2 flex-1 outline-none text-xs md:text-sm lg:text-base"
        placeholder="Search Product..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
      />

      <Select
        onValueChange={(e) => {
          console.log({ e });
          setSearchParams({ ...Object.fromEntries(searchParams), category: e });
        }}
        value={searchParams.get("category") || ""}
      >
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
                  className="line-clamp-1 w-full"
                  key={item.category_id}
                  value={item.category_id}
                >
                  {item.name}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>

    </div>
  );
};


