import { Outlet } from "react-router-dom";
import SideBar from "./Sidebar";
import BuyersNavBar from "./BuyersNavBar";
import BuyersFooter from "./BuyersFooter";
import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoutes";
import { useRecoilState } from "recoil";
import { userStore } from "@/store/user-store";

const BuyerDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [profile] = useRecoilState(userStore);
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex  flex-col h-screen ">
      <BuyersNavBar />

      <div className="relative flex flex-1 overflow-hidden">
        <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <main className="flex-1 w-full overflow-y-auto">
          <ProtectedRoute
            isAuthenticated={!!profile}
            userRole={profile?.roles || []}
            requiredRoles={["Buyer"]}
          >
            <Outlet />
          </ProtectedRoute>
        </main>
      </div>
    </div>
  );
};

export default BuyerDashboard;
