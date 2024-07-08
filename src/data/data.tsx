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
import card1 from "@/assets/card-1.svg";
import card2 from "@/assets/card-2.svg";
import card3 from "@/assets/card-3.svg";
import card4 from "@/assets/card-4.svg";
import iPhoneIcon from "@/assets/iphone3.svg";
import iPhone2Icon from "@/assets/iphone2.svg";
import iPhone3Icon from "@/assets/iphone.svg";

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

export enum MessageText {
  Default = "A confirmation email has been sent to your inbox. Please open the email and follow the instructions to confirm your email address.",
  TokenWrong = "Confirmation token does not match the one from your email, please resend code and try again.",
  Success = "Success! Your email is verified!",
}

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

export interface IBankAccount {
  bankName: string;
  bankDetails: string;
  status: string;
  img: string;
}

export const bankAccounts: IBankAccount[] = [
  {
    bankName: "Datch Bangla Bank Ltd",
    bankDetails: "Bank **********5535",
    status: "Verified",
    img: card1,
  },
  {
    bankName: "Datch Bangla Bank Ltd",
    bankDetails: "Bank **********5535",
    status: "Verified",
    img: card2,
  },
  {
    bankName: "Datch Bangla Bank Ltd",
    bankDetails: "Bank **********5535",
    status: "Verified",
    img: card3,
  },
  {
    bankName: "Datch Bangla Bank Ltd",
    bankDetails: "Bank **********5535",
    status: "Verified",
    img: card4,
  },
];

export interface IWishList {
  id: number;
  product: string;
  icon: string;
  color: string;
  size: string;
  price: string;
  quantity: number;
  total: string;
}

export const wishlistItems: IWishList[] = [
  {
    id: 1,
    product: "iPhone 12 Pro Max 128GB",
    icon: iPhoneIcon,
    color: "#E4BC87",
    size: "Small",
    price: "$38",
    quantity: 1,
    total: "$38",
  },
  {
    id: 2,
    product: "iPhone 12 Pro Max 128GB",
    icon: iPhone2Icon,
    color: "#E4BC87",
    size: "Small",
    price: "$38",
    quantity: 1,
    total: "$38",
  },
  {
    id: 3,
    product: "iPhone 12 Pro Max 128GB",
    icon: iPhone3Icon,
    color: "#E4BC87",
    size: "Small",
    price: "$38",
    quantity: 1,
    total: "$38",
  },
  {
    id: 4,
    product: "iPhone 12 Pro Max 128GB",
    icon: iPhone3Icon,
    color: "#E4BC87",
    size: "Small",
    price: "$38",
    quantity: 1,
    total: "$38",
  },
  {
    id: 5,
    product: "iPhone 12 Pro Max 128GB",
    icon: iPhone3Icon,
    color: "#E4BC87",
    size: "Small",
    price: "$38",
    quantity: 1,
    total: "$38",
  },
  {
    id: 6,
    product: "iPhone 12 Pro Max 128GB",
    icon: iPhone3Icon,
    color: "#E4BC87",
    size: "Small",
    price: "$38",
    quantity: 1,
    total: "$38",
  },
];

export const tableHeader: string[] = [
  `Product`,
  `Color`,
  `Size`,
  `Price`,
  `Quantity`,
  `Total`,
  `Action`,
];
