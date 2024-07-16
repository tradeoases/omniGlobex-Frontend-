import { LuTally1 } from "react-icons/lu";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

export const SearchBar = () => {
  return (
    <div className="flex items-center border">
      <div className="py-2">
        <input
          type="text"
          className="pl-2 outline-none text-xs xl:text-sm bg-light"
          placeholder="Search Product..."
        />
      </div>
      <div className="py-2">
        <p className="flex items-center gap-x-4 px-2">
          <LuTally1 className="text-gray-400" />
          <span className="whitespace-nowrap text-xs ">All Categories</span>
          <MdOutlineKeyboardArrowDown />
        </p>
      </div>
      <div className="bg-main py-3 px-4 xl:px-6">
        <p className="font-bold text-xs xl:text-sm">Search</p>
      </div>
    </div>
  );
};
