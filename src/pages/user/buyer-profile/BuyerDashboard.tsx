import { Outlet } from "react-router-dom";
import SideBar from "./Sidebar";
import BuyersNavBar from "./BuyersNavBar";
import BuyersFooter from "./BuyersFooter";
import { useState } from "react";

const BuyerDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar visibility state

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
            <Outlet /> {/* Dynamic content goes here */}
          </main>

          {/* Footer: Only visible on medium and larger screens */}
          <div className="hidden md:block">
            <BuyersFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
