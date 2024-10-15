import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { IDashboardNav, dashboardNavs } from "@/data/data";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import SupplierNavBar from "./supplier-profile/SupplierNavBar";
import { Logo } from "@/components/logo";

import { useRecoilState } from "recoil";
import { userStore } from "@/store/user-store";
import ProtectedRoute from "@/components/ProtectedRoutes";
import { SelectShowroom } from "@/components/select-show-room";
import { SupplierDropDownProfile } from "./supplier-profile/SupplierDropDownProfile";

const SuppliersDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [navigations] = useState<IDashboardNav[]>(dashboardNavs);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    // Debugging: Log the event target to see where the click is happening
    console.log("Clicked target:", event.target);

    // Check if the click is outside both the dropdown and sidebar
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      console.log("Clicked outside the sidebar and dropdown. Closing sidebar.");
      setIsSidebarOpen(false); // Close sidebar on outside click
    } else {
      console.log("Clicked inside the sidebar or dropdown.");
    }
  };

  const [profile] = useRecoilState(userStore);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside); // Changed from 'click' to 'mousedown'
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col lg:flex-row w-full">
      <SupplierNavBar />
      <div>
        <div className="fixed lg:hidden top-0 p-4 bg-white left-0 w-full z-50 shadow flex justify-between">
          <button onClick={toggleSidebar} className="text-xl">
            <FaBars />
          </button>
          <NavLink to="/" className="text-2xl font-bold text-black">
            <Logo />
          </NavLink>

          {/* SupplierDropDownProfile should also have the ref to track clicks */}
          <div ref={dropdownRef}>
            <SupplierDropDownProfile />
          </div>
        </div>

        <div
          ref={sidebarRef} // Sidebar reference
          className={`lg:block bg-gray-600 overflow-scroll flex flex-col justify-start items-center text-xl lg:static fixed top-0 left-0 z-40 w-64 transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 h-full lg:h-full pt-16`}
        >
          <div className="absolute top-4 right-4 lg:hidden">
            <button onClick={toggleSidebar} className="text-xl">
              <FaTimes />
            </button>
          </div>
          <SelectShowroom />
          {navigations.map((nav) => (
            <NavLink
              to={nav.path}
              key={nav.path}
              className={({ isActive }) =>
                `w-full text-xs cursor-pointer flex justify-start px-6 py-4 items-center gap-x-5 ${
                  isActive ? "text-black" : "text-white"
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

      <div className="mt-14 w-full p-4">
        <ProtectedRoute
          isAuthenticated={!!profile}
          userRole={profile?.roles || []}
          requiredRoles={["Supplier"]}
        >
          <Outlet />
        </ProtectedRoute>
      </div>
    </div>
  );
};

export default SuppliersDashboard;
