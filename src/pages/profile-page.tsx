import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { BsFillCartCheckFill } from "react-icons/bs";
import { FaAddressBook, FaHeart, FaUser, FaUserGear } from "react-icons/fa6";
import { HiLockClosed } from "react-icons/hi2";
import { IoCard, IoLogOut } from "react-icons/io5";
import { MdDashboard, MdReviews } from "react-icons/md";
import { useState } from "react";
import Overview from "@/components/profile-dashboard/overview";

const ProfilePage = () => {
  const [activeMenu, setActiveMenu] = useState<TActiveMenu>(
    dashboardNavs[0].title
  );
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
            {dashboardNavs.map((nav, i) => (
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

          {activeMenu === "Dashboard" ? (
            <Overview />
          ) : (
            <div className="col-span-3 space-y-6 flex items-center justify-center text-4xl font-bold animate-pulse">
              coming soon...
            </div>
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
  | "Payment Method"
  | "Order"
  | "Wishlist"
  | "Address"
  | "Reviews"
  | "Change Password"
  | "Support Ticket"
  | "Logout";
