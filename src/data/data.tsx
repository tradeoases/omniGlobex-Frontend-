import { ICategory } from "@/components/Sidemenu";
import { BsPaintBucket } from "react-icons/bs";
import { IoGameControllerOutline } from "react-icons/io5";
import { LuCar } from "react-icons/lu";
import {
  MdDevices,
  MdOutlineChair,
  MdOutlinePhotoCamera,
  MdOutlineSanitizer,
  MdOutlineSportsBaseball,
} from "react-icons/md";
import { PiBowlFood } from "react-icons/pi";
import { TbBabyBottle } from "react-icons/tb";
import { BsFillCartCheckFill } from "react-icons/bs";
import { FaAddressBook, FaHeart, FaUser, FaUserGear } from "react-icons/fa6";
import { HiLockClosed } from "react-icons/hi2";
import { IoBagHandle, IoCard, IoLogOut } from "react-icons/io5";
import { MdDashboard, MdReviews } from "react-icons/md";

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

export type TActiveMenu =
  | "Dashboard"
  | "Personal"
  | "Products"
  | "Payment Method"
  | "Order"
  | "Wishlist"
  | "Address"
  | "Reviews"
  | "Change Password"
  | "Support Ticket"
  | "Logout";

export interface IDashboardNav {
  icon: JSX.Element;
  title: TActiveMenu;
}

export const dashboardNavs: IDashboardNav[] = [
  { icon: <MdDashboard />, title: "Dashboard" },
  { icon: <FaUser />, title: "Personal" },
  { icon: <IoBagHandle />, title: "Products" },
  { icon: <IoCard />, title: "Payment Method" },
  { icon: <BsFillCartCheckFill />, title: "Order" },
  { icon: <FaHeart />, title: "Wishlist" },
  { icon: <FaAddressBook />, title: "Address" },
  { icon: <MdReviews />, title: "Reviews" },
  { icon: <HiLockClosed />, title: "Change Password" },
  { icon: <FaUserGear />, title: "Support Ticket" },
  { icon: <IoLogOut />, title: "Logout" },
];

export const productNavs: TProductNav[] = [`Products`, `Orders`, `Other info`];

export type TProductNav = "Products" | "Orders" | "Other info";

export interface IMainMenu {
  name: string;
  route: string;
  subMenu?: IMainMenu[];
}

export const mainMenu: IMainMenu[] = [
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
