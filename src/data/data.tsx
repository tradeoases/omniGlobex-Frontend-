import { ICategory } from "@/components/Sidemenu";
import { BsMinecartLoaded, BsPaintBucket } from "react-icons/bs";
import { IoGameControllerOutline } from "react-icons/io5";
import { LuCar } from "react-icons/lu";
import {
  MdDevices,
  MdOutlineChair,
  MdOutlinePhotoCamera,
  MdOutlineSanitizer,
  MdOutlineSecurity,
  MdOutlineSportsBaseball,
} from "react-icons/md";
import { PiBowlFood } from "react-icons/pi";
import { TbBabyBottle, TbTruckReturn, TbSubscript } from "react-icons/tb";
import { BsFillCartCheckFill } from "react-icons/bs";
import {  FaUser } from "react-icons/fa6";
import { HiLockClosed } from "react-icons/hi2";
import { IoBagHandle,  IoLogOut } from "react-icons/io5";
import { MdDashboard, MdReviews } from "react-icons/md";
import card1 from "@/assets/card-1.svg";
import card2 from "@/assets/card-2.svg";
import card3 from "@/assets/card-3.svg";
import card4 from "@/assets/card-4.svg";
import iPhoneIcon from "@/assets/iphone3.svg";
import iPhone2Icon from "@/assets/iphone2.svg";
import iPhone3Icon from "@/assets/iphone.svg";
import { GoTrophy } from "react-icons/go";
import sellerImg1 from "@/assets/saller-1.png";
import sellerImg2 from "@/assets/saller-2.png";
import sellerImg3 from "@/assets/saller-3.png";
import sellerImg4 from "@/assets/saller-4.png";
import sellerImg5 from "@/assets/saller-5.png";
import sellerImg6 from "@/assets/saller-6.png";

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
  | "Cart"
  | "Subscription"
  | "Reviews"
  | "Business"
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
  // { icon: <IoCard />, title: "Payment Method" },
  { icon: <BsFillCartCheckFill />, title: "Order" },
  // { icon: <FaHeart />, title: "Cart" },
  // { icon: <FaAddressBook />, title: "Address" },
  // { icon: <MdReviews />, title: "Reviews" },
  { icon: <TbSubscript />, title: 'Subscription'},
  { icon: <MdReviews />, title: "Business" },
  { icon: <HiLockClosed />, title: "Change Password" },
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
  { name: "Home", route: "/" },
  { name: "Shop", route: "/all-products" },
  {
    name: "Pages",
    route: "",
    subMenu: [
      { name: "Privacy Policy", route: "/privacy-policy" },
      { name: "FAQ", route: "/faq" },
      { name: "Terms and Conditions", route: "/terms-condition" },
    ],
  },
  { name: "About", route: "/about" },
  { name: "Blogs", route: "/blogs" },
  { name: "Contact", route: "/contact" },
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
  `Price`,
  `Quantity`,
  `Total`,
  `Action`,
];

export const wishListHeader = [
  "Product",
  "Status",
  "Price",
  "Quantity",
  "Total",
  "Actions",
];

export interface IWishLists {
  product: string;
  productImage: string;
  stockStatus: string;
  price: number;
  currency: string;
  quantity: number;
  total: number;
}

export const wishlistData: IWishLists[] = [
  {
    product: "Apples",
    productImage: "",
    stockStatus: `In Stock(${100})`,
    price: 10000,
    currency: "$",
    quantity: 2,
    total: 20000,
  },
  {
    product: "Apples",
    productImage: "",
    stockStatus: `In Stock(${100})`,
    price: 10000,
    currency: "$",
    quantity: 3,
    total: 30000,
  },
  {
    product: "Apples",
    productImage: "",
    stockStatus: `In Stock(${100})`,
    price: 10000,
    currency: "$",
    quantity: 2,
    total: 20000,
  },
  {
    product: "Apples",
    productImage: "",
    stockStatus: `In Stock(${100})`,
    price: 10000,
    currency: "$",
    quantity: 5,
    total: 50000,
  },
];

export type TTopbarNav =
  | "Home"
  | "Shop"
  | "Pages"
  | "About"
  | "Blogs"
  | "Contact";

export interface ITopbarNav {
  title: TTopbarNav;
  route: string;
  icon?: boolean;
}

export const navs: ITopbarNav[] = [
  { title: "Home", route: "/" },
  { title: "Shop", icon: true, route: "/all-products" },
  { title: "Pages", icon: true, route: "" },
  { title: "About", route: "/about" },
  { title: "Blogs", route: "/blogs" },
  { title: "Contact", route: "/contact" },
];

export const ourServices: IOurService[] = [
  {
    id: 1,
    title: "Free Shipping",
    description: "When order over $100",
    icon: <BsMinecartLoaded />,
  },
  {
    id: 2,
    title: "Free Return",
    description: "Get Return within 30 days",
    icon: <TbTruckReturn />,
  },
  {
    id: 3,
    title: "Secure Payment",
    description: "100% Secure Online Payment",
    icon: <MdOutlineSecurity />,
  },
  {
    id: 4,
    title: "Best Quality",
    description: "Original Product Guaranteed",
    icon: <GoTrophy />,
  },
];

export interface IOurService {
  title: string;
  description: string;
  icon: JSX.Element;
  id: number;
}

export interface IBestSeller {
  name: string;
  image?: string;
}

export const bestSellers: IBestSeller[] = [
  {
    name: "Shopno BD",
    image: sellerImg1,
  },
  {
    name: "Eecoms Shop",
    image: sellerImg2,
  },
  {
    name: "Fusion X",
    image: sellerImg3,
  },
  {
    name: "Rekayi Rox",
    image: sellerImg4,
  },
  {
    name: "Habbriyi",
    image: sellerImg5,
  },
  {
    name: "Rayhans",
    image: sellerImg6,
  },
];

export type IImageType = "PROFILE" | "COVER" | "LOGO";
