import { NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="w-10/12 xl:w-8/12 relative mx-auto py-12">
      
      {/* Horizontal Navbar */}
      <div className="flex justify-around border-b pb-4 mb-6">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `text-lg font-medium ${isActive ? "text-black" : "text-gray-500"}`
          }
        >
          Personal Info
        </NavLink>
        <NavLink
          to="supplier"
          className={({ isActive }) =>
            `text-lg font-medium ${isActive ? "text-black" : "text-gray-500"}`
          }
        >
          Supplier Dashboard
        </NavLink>
        <NavLink
          to="buyer"
          className={({ isActive }) =>
            `text-lg font-medium ${isActive ? "text-black" : "text-gray-500"}`
          }
        >
          Buyer's Dashboard
        </NavLink>
      </div>

      {/* Content area for active component */}
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
