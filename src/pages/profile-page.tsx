import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { BsFillCartCheckFill } from "react-icons/bs";
import { FaAddressBook, FaHeart, FaUser, FaUserGear } from "react-icons/fa6";
import { HiLockClosed } from "react-icons/hi2";
import { IoBagHandle, IoCard, IoLogOut } from "react-icons/io5";
import { MdDashboard, MdReviews } from "react-icons/md";
import { useEffect, useState } from "react";
import Overview from "@/components/profile-dashboard/overview";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/GameWorldSection";
import { useRecoilValue } from "recoil";
import {
  IUser,
  // IUserRole,
  userStore,
} from "@/store/user-store";
import { IProduct } from "@/service/apis/product-services";
import { ProductStore } from "@/store/product-store";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const userData = useRecoilValue<IUser | null>(userStore);
  const [activeMenu, setActiveMenu] = useState<TActiveMenu>(
    dashboardNavs[0].title
  );
  const [isMounted, setIsMounted] = useState<boolean>(false);
  // const [role, setRole] = useState<IUserRole[]>([`buyer`]);
  const products = useRecoilValue<IProduct[] | null>(ProductStore);
  const navigate = useNavigate();

  useEffect(() => {
    !isMounted && setIsMounted(true);
    if (!userData) {
      navigate(`/`);
    }
  }, []);

  console.log(userData);

  if (!userData) return <></>;

  return (
    <div className="w-10/12 xl:w-8/12 mx-auto py-12">
      <div className="bg-white p-8 space-y-8">
        <div className="w-full flex items-center justify-between">
          <p className="text-xl font-semibold">Your Dashboard</p>
          <div className="flex items-center space-x-2">
            <Label className="text-base text-gray-500" htmlFor="airplane-mode">
              Switch Dashboard
            </Label>
            <Switch className="" id="airplane-mode" />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-8">
          <div className="col-span-1 border-r">
            {dashboardNavs
              // .filter((nav) => {
              //   if (role.includes(`buyer`)) {
              //     return nav.title !== `Products`;
              //   }
              // })
              .map((nav, i) => (
                <div
                  key={i}
                  onClick={() => setActiveMenu(nav.title)}
                  className={`w-full cursor-pointer py-4 flex items-center gap-x-5 text-base ${
                    activeMenu === nav.title ? "text-black" : "text-gray-500"
                  }`}
                >
                  <span>{nav.icon}</span>
                  <span>{nav.title}</span>
                </div>
              ))}
          </div>

          {activeMenu === "Dashboard" && <Overview />}
          {activeMenu === "Products" && (
            <ProductManagement products={products} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

interface IDashboardNav {
  icon: JSX.Element;
  title: TActiveMenu;
}

const dashboardNavs: IDashboardNav[] = [
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

type TActiveMenu =
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

interface ProductProps {
  products: IProduct[] | null;
}

const ProductManagement: React.FC<ProductProps> = ({ products }) => {
  // const fetchProducts = async () => {
  //   try {
  //     const response: AxiosResponse<any, any> = await getAllProducts(
  //       `?page=1&pageSize=25`
  //     );

  //     if (response.status === HttpStatusCode.Ok) {
  //       console.log({ response });
  //       setProducts(response.data.data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   !products && fetchProducts();
  // }, []);

  const [activeTab, setActiveTab] = useState<string>(productNavs[0]);
  return (
    <div className="col-span-3 space-y-6">
      <div className="border-b">
        <div className="w-10/12 xl:w-8/12 mx-auto flex items-center">
          {productNavs.map((nav, i) => (
            <p
              onClick={() => setActiveTab(nav)}
              key={i}
              className={`py-3 px-7 border-b cursor-pointer ${
                activeTab === nav ? " border-main " : " border-zinc-100 "
              }`}
            >
              {nav}
            </p>
          ))}
        </div>
      </div>

      <div className="w-full">
        <Button>New Product</Button>
      </div>

      <div className="w-full grid grid-cols-3 gap-8">
        {products ? (
          products
            .slice(0, 8)
            .map((product, i) => <ProductCard key={i} {...product} />)
        ) : (
          <div>loading...</div>
        )}
      </div>
    </div>
  );
};

const productNavs = [`Products`, `Orders`, `Other info`];
