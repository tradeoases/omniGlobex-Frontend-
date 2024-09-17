/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { SetterOrUpdater, useRecoilState, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { HiBars3BottomLeft } from "react-icons/hi2";
import { AxiosResponse, HttpStatusCode } from "axios";

import { ProductManagement } from "@/components/product-management";
import { IUser, userStore } from "@/store/user-store";
import { INewOrder, NewOrderStore } from "@/store/order-store";
import Overview from "@/components/profile-dashboard/overview";
import { IDashboardNav, TActiveMenu, dashboardNavs } from "@/data/data";
import { Button } from "@/components/ui/button";
import {
  DashboardMenuStore,
  DashboardSideMenuStore,
} from "@/store/side-menu-store";
import { BuyerOrder } from "@/components/buyer-order";
import { PersonalSection } from "@/components/profile-personal-section";
import { getUserInfo } from "@/service/apis/user-services";
import { getAllUserOrders } from "@/service/apis/order-service";
import { PaymentMethod } from "@/components/payment-method";
import { UserAddress } from "@/components/user-address";
import SupportTicket from "@/components/support-ticket";
import WishList from "@/components/wish-list";
import { ReviewsDashboard } from "@/components/reviews-dashbaord";
import ChangePassword from "@/components/change-password";

const ProfilePage = () => {
  const [userData, setUserData] = useRecoilState<IUser | null>(userStore);
  const [newOrderData, setNewOrderData] =
    useRecoilState<INewOrder[]>(NewOrderStore);
  const [activeMenu, setActiveMenu] =
    useRecoilState<TActiveMenu>(DashboardMenuStore);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const setSidemenu: SetterOrUpdater<boolean> = useSetRecoilState<boolean>(
    DashboardSideMenuStore
  );
  const [navigations] = useState<IDashboardNav[]>(dashboardNavs);
  const navigate = useNavigate();

  const fetchUserInfo = async () => {
    try {
      const response: AxiosResponse<any, any> = await getUserInfo();
      if (response.status === HttpStatusCode.Ok) {
        setUserData(response.data.data);
      }
    } catch (error) {
      setActiveMenu("Dashboard");
      navigate("/");
    }
  };

  const fetchAllUserOrders = async () => {
    try {
      const response: AxiosResponse<any, any> = await getAllUserOrders();
      if (response.status === HttpStatusCode.Ok) {
        console.log({ response });
        setNewOrderData(response.data.data);
      }
    } catch (error) {
      setActiveMenu("Dashboard");
      navigate("/");
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      if (!userData) {
        await fetchUserInfo();
      }

      if (newOrderData.length === 0) {
        await fetchAllUserOrders();
      }
    };

    if (!isMounted) {
      fetchInitialData();
      setIsMounted(true);
    }
  }, [isMounted, userData, newOrderData.length]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserData(null);
    setNewOrderData([]);

    setActiveMenu("Dashboard");
    navigate(`/`);
  };

  if (!userData || !newOrderData) {
    return <div>loading...</div>;
  }

  return (
    <div className="w-10/12 xl:w-8/12 relative mx-auto py-12">
      <div className="space-y-8">
        <div className="w-full flex items-center gap-x-8 lg:gap-0">
          <Button
            className="lg:hidden p-1 border shadow-none"
            variant="secondary"
            size="icon"
            asChild
            onClick={() => setSidemenu(true)}
          >
            <HiBars3BottomLeft className="text-4xl" />
          </Button>
          <p className="text-xl font-semibold">Your Dashboard</p>
        </div>

        <div className="lg:grid grid-cols-4 gap-8 ">
          <div className="hidden lg:block col-span-1 lg:border-r bg-white px-4">
            {navigations.map((nav, i) => (
              <div
                key={i}
                onClick={() => {
                  setActiveMenu(nav.title);
                  nav.title === `Logout` && handleLogout();
                }}
                className={`w-full text-xs cursor-pointer py-4 flex items-center gap-x-5 ${
                  activeMenu === nav.title ? "text-black" : "text-gray-500"
                }`}
              >
                <span>{nav.icon}</span>
                <span>{nav.title}</span>
              </div>
            ))}
          </div>

          {activeMenu === "Dashboard" && (
            <Overview userData={userData} newOrderData={newOrderData || []} />
          )}
          {activeMenu === "Products" && <ProductManagement />}
          {activeMenu === "Address" && <UserAddress />}
          {activeMenu === "Personal" && <PersonalSection userData={userData} />}
          {activeMenu === "Payment Method" && <PaymentMethod />}
          {activeMenu === "Order" && <BuyerOrder />}
          {activeMenu === "Change Password" && <ChangePassword />}
          {activeMenu === "Reviews" && <ReviewsDashboard />}
          {activeMenu === "Wishlist" && <WishList />}
          {activeMenu === "Support Ticket" && <SupportTicket />}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
