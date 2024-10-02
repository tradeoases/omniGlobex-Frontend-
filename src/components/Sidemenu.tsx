import React, { useState } from "react";
import { HiArrowPath, HiOutlineXMark } from "react-icons/hi2";
import { IoIosHeartEmpty } from "react-icons/io";
import { LuChevronRight } from "react-icons/lu";
import { RiSearchLine } from "react-icons/ri";
import { useRecoilState, useSetRecoilState } from "recoil";
import { SidemenuStore } from "@/store/sidemenuStore";
import { IMainMenu, mainMenu } from "@/data/data";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse, HttpStatusCode } from "axios";
import { getAllProductCategories } from "@/service/apis/product-services";

export interface ICategory {
  category_id: string;
  name: string;
}

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
            className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center"
          >
            <HiOutlineXMark className="text-xl text-gray-300" />
          </span>
        </div>

        <div className="px-6 w-full">
          <div className="grid grid-cols-12 border">
            <div className="col-span-9">
              <input
                type="text"
                className="pl-2 py-2 text-xs outline-none"
                placeholder="Search Product..."
              />
            </div>
            <div className="bg-main flex items-center justify-center col-span-3 py-2 px-3">
              <p className="font-bold text-sm">
                <RiSearchLine />
              </p>
            </div>
          </div>
        </div>

        <div className="w-full flex items-center justify-center gap-x-2">
          <button
            onClick={() => setMenu(2)}
            type="button"
            className={`text-base font-medium ${
              menu === 2 ? "text-black" : "text-gray-500"
            }`}
          >
            <span className="">☰</span>
          </button>
        </div>

        {/* {menu === 1 && <SideMenuCategories />} */}
        {menu === 2 && <MainMenu />}
      </div>
    </div>
  );
};

export default Sidemenu;

const MenuItem: React.FC<ICategory> = ({ name }) => {
  return (
    <div className="flex items-center justify-between px-6 py-3 hover:bg-main">
      <div className="flex items-center gap-x-4">
        {/* <span className="text-lg text-gray-700">{icon}</span> */}
        <span className="text-sm">{name}</span>
      </div>
      <LuChevronRight className="text-base" />
    </div>
  );
};

export const SideMenuCategories = () => {
  const { data: categories, isSuccess: categorySuccess } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response: AxiosResponse<any, any> = await getAllProductCategories();

      if (response.status === HttpStatusCode.Ok) {
        return response.data.data as ICategory[];
      }
    },
  });
  return (
    <div className="w-full">
      {categorySuccess &&
        categories?.map((cat, i) => <MenuItem key={i} {...cat} />)}
    </div>
  );
};

const MainMenuItem: React.FC<IMainMenu> = ({ name, route }) => {
  const setSidemenu = useSetRecoilState<boolean>(SidemenuStore);

  const onClose = () => {
    setSidemenu(false);
  };
  return (
    <Link
      to={route}
      onClick={onClose}
      className="flex items-center justify-between px-6 py-3 hover:bg-main"
    >
      <span className="text-sm">{name}</span>
      <LuChevronRight className="text-base" />
    </Link>
  );
};

export const MainMenu = () => {
  return (
    <div className="w-full">
      {mainMenu.map((menu, i) => (
        <>
          <MainMenuItem key={i} {...menu} />
          {menu.subMenu && (
            <div className="ml-7">
              {menu.subMenu.map((nav, j) => (
                <MainMenuItem key={j} {...nav} />
              ))}
            </div>
          )}
        </>
      ))}
    </div>
  );
};
