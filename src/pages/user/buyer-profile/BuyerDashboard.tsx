
import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MainContent from "./MainContent";

const BuyerDashboard = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For toggling sidebar on mobile

  return (
    <div className="w-full flex flex-col md:flex-row overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isOpen={isSidebarOpen} // Pass isOpen state to Sidebar
        setIsOpen={setIsSidebarOpen} // To toggle sidebar visibility
      />

      {/* Main Content */}
      <div className="flex-1 p-4">
        {/* Header with a hamburger menu for mobile */}
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Main content */}
        <MainContent activeSection={activeSection} />
      </div>
    </div>
  );
};

export default BuyerDashboard;

