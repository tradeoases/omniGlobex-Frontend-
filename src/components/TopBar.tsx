import { CiUser } from "react-icons/ci";
import { HiArrowPath, HiOutlineXMark } from "react-icons/hi2";
import { IoIosHeartEmpty } from "react-icons/io";
import { SlHandbag } from "react-icons/sl";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { LuAlignLeft, LuTally1 } from "react-icons/lu";
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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { IWishList, wishlistItems } from "@/data/data";
import { useState } from "react";

const TopBar = () => {
  const setSidemenu: SetterOrUpdater<boolean> =
    useSetRecoilState<boolean>(SidemenuStore);
  const userData = useRecoilValue<IUser | null>(userStore);
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState<IWishList[]>(wishlistItems);

  const onOpen = () => {
    setSidemenu(true);
  };

  const handleRemoveItem = (itemId: number) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== itemId);
    setWishlist(updatedWishlist);
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

          {/* <Link to="/wishlist" className="relative">
            <span className="bg-main w-5 h-5 rounded-full text-xs flex items-center justify-center absolute -top-2 -right-3">
              3
            </span>
            <SlHandbag />
          </Link> */}

          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="link" className="relative">
                <span className="bg-main w-5 h-5 rounded-full text-xs flex items-center justify-center absolute -top-2 right-0">
                  3
                </span>
                <SlHandbag className="text-lg" />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-72 rounded-none p-0">
              <div className="bg-main w-full h-1" />
              <div className="px-4 text-xs">
                <div className="h-72 scrollbar pr-2 mb-4 space-y-4 overflow-y-scroll">
                  {wishlist.map((item, i) => (
                    <CartHeaderItem
                      {...item}
                      onClose={() => handleRemoveItem(item.id)}
                      key={i}
                    />
                  ))}
                </div>

                <div className="border-t py-2 space-y-4">
                  <p className="flex text-sm font-medium items-center justify-between">
                    <span>Subtotal</span>
                    <span className="text-red-500 font-medium">$234</span>
                  </p>

                  <div className="w-full flex space-y-2 flex-col">
                    <Button
                      variant="secondary"
                      className="rounded-none shadow-none w-full h-12"
                    >
                      View Cart
                    </Button>
                    <Button className="rounded-none bg-main text-black hover:bg-main/80 shadow-none w-full h-12">
                      Checkout Now
                    </Button>
                  </div>

                  <div className="border-t text-gray-500 pt-4 text-sm text-center">
                    <p>
                      Get Return within{" "}
                      <span className="text-black font-medium">30 days</span>
                    </p>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>

          {userData ? (
            <Link to="/profile" className="relative">
              <CiUser className="text-2xl font-bold" />
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <CiUser className="text-2xl font-bold" />
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

const SearchBar = () => {
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

interface Props extends IWishList {
  onClose: () => void;
}

const CartHeaderItem: React.FC<Props> = ({ icon, product, price, onClose }) => {
  return (
    <div className="w-full flex justify-between py-2">
      <div className="flex gap-x-2">
        <div>
          <img src={icon} alt={product} className="w-16 h-16 object-cover" />
        </div>
        <div className="space-y-1 flex flex-col font-medium">
          <p className="hover:text-blue-700">{product}</p>
          <p className="text-red-500">{price}</p>
        </div>
      </div>

      <div>
        <span className="cursor-pointer hover:text-red-500" onClick={onClose}>
          <HiOutlineXMark />
        </span>
      </div>
    </div>
  );
};
