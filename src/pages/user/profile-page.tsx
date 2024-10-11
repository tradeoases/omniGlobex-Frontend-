import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { IDashboardNav, dashboardNavs } from "@/data/data";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import SupplierNavBar from "./supplier-profile/SupplierNavBar";
import { Logo } from "@/components/logo";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userStore } from "@/store/user-store";
import ProtectedRoute from "@/components/ProtectedRoutes";
import { SelectShowroom } from "@/components/select-show-room";

const SuppliersDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [navigations] = useState<IDashboardNav[]>(dashboardNavs);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const sidebarRef = useRef(null); // Reference for the sidebar

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };
  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const handleClickOutside = (event: any) => {
    // Check if click is outside both dropdown and sidebar
    if (
      dropdownRef.current &&
      !(dropdownRef.current as any).contains(event.target) &&
      sidebarRef.current &&
      !(sidebarRef.current as any).contains(event.target)
    ) {
      setDropdownOpen(false);
      setIsSidebarOpen(false); // Close sidebar on outside click
    }
  };

  const [profile] = useRecoilState(userStore);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
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
          <div className="relative group">
            <div onClick={toggleDropdown}>
              <FaUserCircle className="text-4xl text-gray-700 cursor-pointer transition duration-300" />
            </div>

            <div
              ref={dropdownRef}
              className={`absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 border border-gray-200 ${
                dropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"
              } transition-opacity duration-300 z-50`}
            >
              <Link
                to="/supplier-dashboard"
                onClick={closeDropdown}
                className="hover:bg-gray-100 px-4 py-2 text-gray-800 cursor-pointer"
              >
                Manage account
              </Link>

              <Link to="subscription" onClick={closeDropdown}>
                <div className="hover:bg-gray-100 px-4 py-2 text-gray-800 cursor-pointer">
                  Subscription
                </div>
              </Link>
              <Link to="order" onClick={closeDropdown}>
                <div className="hover:bg-gray-100 px-4 py-2 text-gray-800 cursor-pointer">
                  Sales Performance
                </div>
              </Link>
              <Link to="supplier-rfq" onClick={closeDropdown}>
                <div className="hover:bg-gray-100 px-4 py-2 text-gray-800 cursor-pointer">
                  Request for Quotation
                </div>
              </Link>
              <Link
                to="/products"
                onClick={closeDropdown}
                className="hover:bg-gray-100 px-4 py-2 text-gray-800 cursor-pointer"
              >
                Storefront Preview
              </Link>
              <div className="hover:bg-gray-100 px-4 py-2 text-gray-800 cursor-pointer">
                Log out
              </div>
            </div>
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

      <div className="mt-14 p-4">
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
