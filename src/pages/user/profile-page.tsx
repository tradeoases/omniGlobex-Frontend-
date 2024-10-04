/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Outlet } from "react-router-dom";
import { AxiosResponse, HttpStatusCode } from "axios";
import { IUser, userStore } from "@/store/user-store";
import { INewOrder, NewOrderStore } from "@/store/order-store";
import { IDashboardNav, TActiveMenu, dashboardNavs } from "@/data/data";
import { DashboardMenuStore } from "@/store/side-menu-store";
import { getUserInfo } from "@/service/apis/user-services";
import { getAllUserOrders } from "@/service/apis/order-service";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const SuppliersDashboard = () => {
  const [userData, setUserData] = useRecoilState<IUser | null>(userStore);
  const [newOrderData, setNewOrderData] =
    useRecoilState<INewOrder[]>(NewOrderStore);
  const [activeMenu, setActiveMenu] =
    useRecoilState<TActiveMenu>(DashboardMenuStore);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const [navigations] = useState<IDashboardNav[]>(dashboardNavs);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const fetchUserInfo = async () => {
    try {
      const response: AxiosResponse<any, any> = await getUserInfo();
      if (response.status === HttpStatusCode.Ok) {
        setUserData(response.data.data);
      }
    } catch (error) {
      setActiveMenu("Supplier Profile");
    }
  };

  const fetchAllUserOrders = async () => {
    try {
      const response: AxiosResponse<any, any> = await getAllUserOrders();
      if (response.status === HttpStatusCode.Ok) {
        setNewOrderData(response.data.data);
      }
    } catch (error) {
      setActiveMenu("Supplier Profile");
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

  if (!userData || !newOrderData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row w-full">
      {/* Hamburger Menu (Mobile) */}
      <div className="fixed top-0 left-0 w-full bg-white p-4 lg:hidden z-50 shadow">
        <button onClick={toggleSidebar} className="text-xl">
          <FaBars />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`lg:block bg-white lg:static fixed top-0 left-0 z-40 w-64 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 h-full lg:h-auto pt-16`} // Add pt-16 for padding to push content below the hamburger
      >
        {/* Close Button */}
        <div className="absolute top-4 right-4 lg:hidden">
          <button onClick={toggleSidebar} className="text-xl">
            <FaTimes />
          </button>
        </div>

        {navigations.map((nav) => (
          <NavLink
            to={nav.path}
            key={nav.path}
            className={`w-full text-xs cursor-pointer py-4 flex items-center gap-x-5 ${
              activeMenu === nav.title ? "text-black" : "text-gray-500"
            }`}
          >
            <span>{nav.icon}</span>
            <span>{nav.title}</span>
          </NavLink>
        ))}
      </div>

      <div className="w-full px-6 space-y-4 lg:ml-64">
        <Outlet />
      </div>
    </div>
  );
};

export default SuppliersDashboard;
