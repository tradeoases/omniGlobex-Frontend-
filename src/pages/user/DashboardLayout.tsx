import { NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10">
      {/* Horizontal Navbar */}
      <div className="flex flex-wrap justify-between md:justify-around border-b pb-4 mb-6 space-y-2 md:space-y-0">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `text-sm sm:text-base md:text-lg font-medium ${
              isActive ? "text-black" : "text-gray-500"
            }`
          }
        >
          Personal Info
        </NavLink>
        <NavLink
          to="supplier"
          className={({ isActive }) =>
            `text-sm sm:text-base md:text-lg font-medium ${
              isActive ? "text-black" : "text-gray-500"
            }`
          }
        >
          Supplier Dashboard
        </NavLink>
        <NavLink
          to="buyer"
          className={({ isActive }) =>
            `text-sm sm:text-base md:text-lg font-medium ${
              isActive ? "text-black" : "text-gray-500"
            }`
          }
        >
          Buyer's Dashboard
        </NavLink>
      </div>

      {/* Content area for active component */}
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
