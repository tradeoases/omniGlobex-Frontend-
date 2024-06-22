import React, { useState } from "react";
import { HiArrowPath } from "react-icons/hi2";
import { IoIosHeartEmpty } from "react-icons/io";
import { LuCar, LuChevronRight } from "react-icons/lu";
import {
  MdDevices,
  MdOutlineChair,
  MdOutlinePhotoCamera,
  MdOutlineSanitizer,
  MdOutlineSportsBaseball,
} from "react-icons/md";
import { RiSearchLine } from "react-icons/ri";
import { TiTimes } from "react-icons/ti";
import { TbBabyBottle } from "react-icons/tb";
import { BsPaintBucket } from "react-icons/bs";
import { PiBowlFood } from "react-icons/pi";
import { IoGameControllerOutline } from "react-icons/io5";
import { useRecoilState } from "recoil";
import { SidemenuStore } from "@/store/sidemenuStore";

export interface ICategory {
  name: string;
  icon: JSX.Element;
}

export const categories: ICategory[] = [
  { name: "Mobile & Laptops", icon: <MdDevices /> },
  { name: "Gamming Entertainment", icon: <IoGameControllerOutline /> },
  { name: "Image & Video", icon: <MdOutlinePhotoCamera /> },
  { name: "Vehicles", icon: <LuCar /> },
  { name: "Furnitures", icon: <MdOutlineChair /> },
  { name: "Sports", icon: <MdOutlineSportsBaseball /> },
  { name: "Food & Accessories", icon: <PiBowlFood /> },
  { name: "Toilet & Sanitation", icon: <MdOutlineSanitizer /> },
  { name: "Makeup Corner", icon: <BsPaintBucket /> },
  { name: "Baby items", icon: <TbBabyBottle /> },
];

const Sidemenu = () => {
  const [menu, setMenu] = useState<number>(1);
  const [sidemenu, setSidemenu] = useRecoilState<boolean>(SidemenuStore);

  const onClose = () => {
    setSidemenu(false);
  };

  return (
    <div
      className={`lg:hidden overflow-hidden w-[100vw] h-full bg-black/45 fixed left-0 top-0 bottom-0 z-20 transition-transform duration-400 ease-in-out ${
        sidemenu ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div
        className={`lg:hidden w-[70vw] md:w-[40vw] h-full fixed left-0 top-0 bottom-0 bg-white z-50 space-y-10 transition-transform duration-300 ${
          sidemenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 pb-0">
          <div className="flex items-center gap-4">
            <p className="relative">
              <span className="bg-main w-5 h-5 rounded-full text-xs flex items-center justify-center absolute -top-2 -right-3">
                2
              </span>
              <HiArrowPath className="text-xl" />
            </p>

            <p className="relative">
              <span className="bg-main w-5 h-5 rounded-full text-xs flex items-center justify-center absolute -top-2 -right-3">
                9
              </span>
              <IoIosHeartEmpty className="text-xl" />
            </p>
          </div>
          <span
            onClick={onClose}
            className="w-6 h-6 rounded-full bg-red-400 flex items-center justify-center"
          >
            <TiTimes className="text-xl text-red-900" />
          </span>
        </div>

        <div className="px-6 w-full">
          <div className="w-full flex items-center border justify-between">
            <div className="">
              <input
                type="text"
                className="pl-2 outline-none"
                placeholder="Search Product..."
              />
            </div>
            <div className="bg-main py-2 px-3">
              <p className="font-bold text-sm">
                <RiSearchLine />
              </p>
            </div>
          </div>
        </div>

        <div className="w-full flex items-center justify-center gap-x-2">
          <button
            onClick={() => setMenu(1)}
            type="button"
            className={`text-base font-medium ${
              menu === 1 ? "text-black" : "text-gray-500"
            }`}
          >
            Categories
          </button>
          <div className="h-4 w-[1.5px] bg-slate-800" />
          <button
            onClick={() => setMenu(2)}
            type="button"
            className={`text-base font-medium ${
              menu === 2 ? "text-black" : "text-gray-500"
            }`}
          >
            Main Menu
          </button>
        </div>

        {menu === 1 && <SideMenuCategories />}
        {menu === 2 && <MainMenu />}
      </div>
    </div>
  );
};

export default Sidemenu;

const MenuItem: React.FC<ICategory> = ({ icon, name }) => {
  return (
    <div className="flex items-center justify-between px-6 py-3 hover:bg-main">
      <div className="flex items-center gap-x-4">
        <span className="text-lg text-gray-700">{icon}</span>
        <span className="text-sm">{name}</span>
      </div>
      <LuChevronRight className="text-base" />
    </div>
  );
};

const SideMenuCategories = () => {
  return (
    <div className="w-full">
      {categories.map((cat, i) => (
        <MenuItem key={i} {...cat} />
      ))}
    </div>
  );
};

interface IMainMenu {
  name: string;
  route: string;
  subMenu?: IMainMenu[];
}

const MainMenuItem: React.FC<IMainMenu> = ({ name }) => {
  return (
    <div className="flex items-center justify-between px-6 py-3 hover:bg-main">
      <span className="text-sm">{name}</span>
      <LuChevronRight className="text-base" />
    </div>
  );
};

const MainMenu = () => {
  return (
    <div className="w-full">
      {mainMenu.map((menu, i) => (
        <>
          <MainMenuItem key={i} {...menu} />
          {menu.subMenu && (
            <div className="ml-7">
              {menu.subMenu.map((nav, i) => (
                <MainMenuItem key={i} {...nav} />
              ))}
            </div>
          )}
        </>
      ))}
    </div>
  );
};

const mainMenu: IMainMenu[] = [
  { name: "Home", route: "" },
  { name: "Shop", route: "" },
  {
    name: "Pages",
    route: "",
    subMenu: [
      { name: "Privacy Policy", route: "" },
      { name: "FAQ", route: "" },
      { name: "Terms and Conditions", route: "" },
    ],
  },
  { name: "About", route: "" },
  { name: "Blogs", route: "" },
  { name: "Contact", route: "" },
];
