import { CiUser } from "react-icons/ci";
import { HiArrowPath } from "react-icons/hi2";
import { IoIosHeartEmpty } from "react-icons/io";
import { SlHandbag } from "react-icons/sl";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { LuAlignLeft, LuTally1 } from "react-icons/lu";
import { SetterOrUpdater, useSetRecoilState } from "recoil";
import { SidemenuStore } from "@/store/sidemenuStore";
import { Link } from "react-router-dom";

export const items = [
  {
    id: "item-01",
    name: "Item 1",
    url: "",
    category: "CategoryOne",
  },
  {
    id: "item-02",
    name: "Item 2",
    url: "",
    category: "CategoryTwo",
  },
  {
    id: "Item 3",
    name: "Item 3",
    url: "",
    category: "CategoryThree",
  },
];

const TopBar = () => {
  const setSidemenu: SetterOrUpdater<boolean> =
    useSetRecoilState<boolean>(SidemenuStore);
  const onOpen = () => {
    setSidemenu(true);
  };

  return (
    <div className="w-full border-b py-4">
      <div className="hidden w-10/12 xl:w-8/12 mx-auto lg:flex items-center justify-between">
        <Link to="/">
          <Logo />
        </Link>

        <SearchBar />

        <div className="flex items-center gap-x-6 text-xl">
          <p className="relative">
            <span className="bg-main w-5 h-5 rounded-full text-xs flex items-center justify-center absolute -top-2 -right-3">
              2
            </span>
            <HiArrowPath className="text-2xl" />
          </p>

          <p className="relative">
            <span className="bg-main w-5 h-5 rounded-full text-xs flex items-center justify-center absolute -top-2 -right-3">
              9
            </span>
            <IoIosHeartEmpty className="text-2xl" />
          </p>

          <p className="relative">
            <span className="bg-main w-5 h-5 rounded-full text-xs flex items-center justify-center absolute -top-2 -right-3">
              3
            </span>
            <SlHandbag />
          </p>
          <Link  to="/profile" className="relative">
            <CiUser className="text-2xl font-bold" />
          </Link>
        </div>
      </div>

      {/* Mobile / Tablet */}
      <div className="w-10/12 xl:w-8/12 mx-auto flex lg:hidden items-center justify-between">
        <div onClick={onOpen}>
          <LuAlignLeft className="text-2xl" />
        </div>
        <Logo />
        <p className="relative">
          <span className="bg-main w-5 h-5 rounded-full text-xs flex items-center justify-center absolute -top-2 -right-3">
            3
          </span>
          <SlHandbag className="text-lg" />
        </p>
      </div>
    </div>
  );
};

export default TopBar;

const SearchBar = () => {
  // const [searchQuery, setSearchQuery] = useState("");
  // const [selectedCategories, setSelectedCategories] = useState([]);

  // function handleSearch(e: any) {
  //   setSearchQuery(e.target.value);
  // }

  return (
    <div className="flex items-center border">
      <div className="py-3">
        <input
          type="text"
          className="pl-2 outline-none bg-light"
          placeholder="Search Product..."
        />
      </div>
      <div className="py-3">
        <p className="flex items-center gap-x-4 px-2">
          <LuTally1 className="text-gray-400" /> <span>All Categories</span>
          <MdOutlineKeyboardArrowDown />
        </p>
      </div>
      <div className="bg-main py-4 px-6">
        <p className="font-bold text-sm">Search</p>
      </div>
    </div>
  );
};

export const Logo = () => {
  return (
    <div className="text-4xl font-semibold text-main">
      Omni<span className="text-4xl text-black font-bold">Globex</span>
    </div>
  );
};
