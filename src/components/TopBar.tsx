import { CiUser } from "react-icons/ci";
import { HiArrowPath } from "react-icons/hi2";
import { IoIosHeartEmpty } from "react-icons/io";
import { SlHandbag } from "react-icons/sl";
import { LuAlignLeft } from "react-icons/lu";
import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from "recoil";
import { SidemenuStore } from "@/store/sidemenuStore";
import { Link, useNavigate } from "react-router-dom";
import { IUser, userStore } from "@/store/user-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

import { SearchBar } from "./search-bar";
import { Logo } from "./logo";
import { HeaderCartNav } from "./header-cart-nav";

const TopBar = () => {
  const setSidemenu: SetterOrUpdater<boolean> =
    useSetRecoilState<boolean>(SidemenuStore);
  const userData = useRecoilValue<IUser | null>(userStore);
  const navigate = useNavigate();

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

          <Link to="/wishlist" className="relative">
            <span className="bg-main w-5 h-5 rounded-full text-xs flex items-center justify-center absolute -top-2 -right-3">
              9
            </span>
            <IoIosHeartEmpty className="text-2xl" />
          </Link>

          <HeaderCartNav />

          {userData ? (
            <Link to="/profile" className="relative">
              <CiUser className="text-2xl" />
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="link" className="p-0 m-0">
                  <CiUser className="text-2xl" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40">
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => navigate(`/login`)}>
                    Login
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate(`/signup`)}>
                    Signup
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate(`/become-seller`)}>
                    Become a Seller
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
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
