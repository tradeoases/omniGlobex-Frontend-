// BuyerDashboard.js
import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MainContent from "./MainContent";

const BuyerDashboard = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");

  return (
    <div className="flex overflow-hidden">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <div className="flex-1 p-4">
        <Header />
        <MainContent activeSection={activeSection} />
      </div>
    </div>
  );
};

export default BuyerDashboard;
