import { useState } from "react";
import { Outlet } from "react-router-dom";
import { IDashboardNav, dashboardNavs } from "@/data/data";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const SuppliersDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [navigations] = useState<IDashboardNav[]>(dashboardNavs);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex  bg-amber-300 h-screen flex-col lg:flex-row w-full">
      <div>
        <div className="fixed lg:hidden top-0 p-4 bg-white left-0 w-full z-50 shadow">
          <button onClick={toggleSidebar} className="text-xl">
            <FaBars />
          </button>
        </div>
        <div
          className={`lg:block bg-slate-900 overflow-scroll flex flex-col justify-start items-center text-xl lg:static fixed top-0 left-0 z-40 w-64 transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 h-full lg:h-full pt-16`}
        >
          <div className="absolute top-4 right-4 lg:hidden">
            <button onClick={toggleSidebar} className="text-xl">
              <FaTimes />
            </button>
          </div>

          {navigations.map((nav) => (
            <NavLink
              to={nav.path}
              key={nav.path}
              className={({ isActive }) =>
                `w-full text-xs cursor-pointer flex justify-start px-6 py-4 items-center gap-x-5 ${
                  isActive ? "text-black" : "text-gray-500"
                }`
              }
              onClick={toggleSidebar}
            >
              <span>{nav.icon}</span>
              <span>{nav.title}</span>
            </NavLink>
          ))}
        </div>
      </div>

      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default SuppliersDashboard;
