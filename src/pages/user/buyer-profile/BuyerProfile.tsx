import { BuyerOrder } from "@/components/buyer-order";
import { PersonalSection } from "@/components/profile-personal-section";
import { SearchBar } from "@/components/search-bar";
import { SelectShowroom } from "@/components/select-show-room";
import { useState } from "react";

// Header Component
const Header = () => (
  <div className="flex justify-between items-center p-4 shadow">
    <p className="flex items-center gap-2">
      <SearchBar />
      <SelectShowroom />
    </p>
    <div className="items-center space-x-4">
      <span className="relative">
        <NotificationsIcon />
        <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">
          3
        </span>
      </span>
    </div>
  </div>
);

// Sidebar Component
const Sidebar = ({ activeSection, setActiveSection }) => {
  return (
    <div className="w-64 border-r bg-white h-full p-6">
      {" "}
      {/* Fixed width of 64 */}
      <nav>
        <ul className="space-y-4">
          {[
            "Dashboard",
            "RFQ",
            "Messages",
            "Ratings",
            "Orders",
            "Profile",
            "Logout",
          ].map((section) => (
            <li
              key={section}
              className={`cursor-pointer p-3 rounded-lg transition-all duration-300 
                ${
                  activeSection === section
                    ? "bg-main text-white"
                    : "text-gray-400 hover:bg-gray-700 hover:text-white"
                }`}
              onClick={() => setActiveSection(section)}
            >
              {section}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

// Main Content Component
const MainContent = ({ activeSection }) => {
  switch (activeSection) {
    case "Dashboard":
      return <DashboardOverview />;
    case "RFQ":
      return <RFQManagement />;
    case "Messages":
      return <Messages />;
    case "Ratings":
      return <Ratings />;
    case "Orders":
      return <OrderTracking />;
    case "Profile":
      return <ProfileManagement />;
    case "Logout":
      return <Logout />;
    default:
      return <DashboardOverview />;
  }
};

// Dashboard Overview Component
const DashboardOverview = () => (
  <div className="p-4">
    <h2 className="text-lg font-semibold">Overview</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-white p-4 shadow rounded flex-1">Total RFQs: 12</div>
      <div className="bg-white p-4 shadow rounded flex-1">Messages: 5</div>
      <div className="bg-white p-4 shadow rounded flex-1">
        Orders in Progress: 3
      </div>
    </div>
  </div>
);

// RFQ Management Component
const RFQManagement = () => (
  <div className="p-4">
    <h2 className="text-lg font-semibold">Request for Quotation (RFQ)</h2>
    <div className="mt-4">
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Product Name"
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          placeholder="Quantity"
          className="border p-2 w-full rounded"
        />
        <textarea
          placeholder="Additional Details"
          className="border p-2 w-full rounded"
        />
        <button className="bg-main text-white px-4 py-2 rounded">
          Submit RFQ
        </button>
      </form>
    </div>
  </div>
);

// Messages Component
const Messages = () => (
  <div className="p-4">
    <h2 className="text-lg font-semibold">Messages</h2>
    <div className="bg-white p-4 shadow rounded mt-4">
      <div className="flex items-center justify-between">
        <h3>Supplier X</h3>
        <span className="text-xs text-gray-500">2 hours ago</span>
      </div>
      <p>Hi, we're interested in your RFQ...</p>
    </div>
  </div>
);

// Ratings & Reviews Component
const Ratings = () => (
  <div className="p-4">
    <h2 className="text-lg font-semibold">Supplier and Product Ratings</h2>
    <div className="space-y-4 mt-4">
      <div className="bg-white p-4 shadow rounded">
        <h3>Supplier X - ★★★★☆</h3>
        <p>Great communication, on-time delivery.</p>
      </div>
      <div className="bg-white p-4 shadow rounded">
        <h3>Supplier Y - ★★★☆☆</h3>
        <p>Product quality was okay, but shipping was delayed.</p>
      </div>
    </div>
  </div>
);

// Order Tracking Component
const OrderTracking = () => (
  <div className="p-4">
    <h2 className="text-lg font-semibold">Order Tracking</h2>
    <BuyerOrder />
  </div>
);

// Profile Management Component
const ProfileManagement = () => (
  <div className="p-4">
    <h2 className="text-lg font-semibold">Profile Management</h2>
    <PersonalSection userData />
    <div className="mt-4"></div>
  </div>
);

const Logout = () => {
  return <div>Confirm logout</div>;
};

// Main Buyer Dashboard Component
const BuyerDashboard = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <div className="flex-1 overflow-y-auto p-4">
        <Header />
        <MainContent activeSection={activeSection} />
      </div>
    </div>
  );
};

// Placeholder Icons for Notifications
export const NotificationsIcon = () => <span>🔔</span>;

export default BuyerDashboard;
