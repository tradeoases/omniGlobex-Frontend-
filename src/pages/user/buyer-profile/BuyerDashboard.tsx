import { Outlet } from "react-router-dom";
import SideBar from "./Sidebar";
import BuyersNavBar from "./BuyersNavBar";
import BuyersFooter from "./BuyersFooter";
import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoutes";
import { useRecoilState } from "recoil";
import { userStore } from "@/store/user-store";

const BuyerDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar visibility state
  const [profile] = useRecoilState(userStore);
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };


  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <BuyersNavBar />

      <div className="relative flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <div
          className={`flex flex-col flex-1 p-4 transition-all duration-300 bg-white`}
        >
          <main className="flex-1 overflow-y-auto">
            <ProtectedRoute
              isAuthenticated={!!profile}
              userRole={profile?.roles || []}
              requiredRoles={["Buyer"]}
            >
              <Outlet />
            </ProtectedRoute>
          </main>

          <div className="hidden md:block">
            <BuyersFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
