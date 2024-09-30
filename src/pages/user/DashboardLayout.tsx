import { NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div>
      {/* Sticky navigation bar */}
      <div className="flex items-center w-full justify-center bg-main p-4 shadow-lg sticky top-0 z-50">
        <NavLink
          to="/dashboard"
          className="mx-4 text-white transition-colors duration-300"
        >
          Personal Info
        </NavLink>
        <NavLink
          to="supplier"
          className="mx-4 text-white transition-colors duration-300"
        >
          Supplier Dashboard
        </NavLink>
        <NavLink
          to="buyer"
          className="mx-4 text-white transition-colors duration-300"
        >
          Buyer's Dashboard
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
};

export default DashboardLayout;
