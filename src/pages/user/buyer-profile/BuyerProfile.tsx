import React, { useState } from 'react';

// Header Component
const Header = () => (
  <div className="flex justify-between items-center p-4 shadow">
    <div className="text-xl font-bold">Buyer Dashboard</div>
    <input type="text" placeholder="Search products/services..." className="border p-2 rounded w-1/3" />
    <div className="flex items-center space-x-4">
      <span className="relative">
        <NotificationsIcon />
        <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">3</span>
      </span>
      <ProfileIcon />
    </div>
  </div>
);

// Sidebar Component
const Sidebar = ({ activeSection, setActiveSection }) => {
  return (
    <div className="w-1/4 border-r bg-white0 h-full p-6">
      <nav>
        <ul className="space-y-4">
          <li
            className={`cursor-pointer p-3 rounded-lg transition-all duration-300 
              ${activeSection === 'Dashboard' ? 'bg-main text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
            onClick={() => setActiveSection('Dashboard')}
          >
            Dashboard
          </li>
          <li
            className={`cursor-pointer p-3 rounded-lg transition-all duration-300 
              ${activeSection === 'RFQ' ? 'bg-main text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
            onClick={() => setActiveSection('RFQ')}
          >
            RFQ Management
          </li>
          <li
            className={`cursor-pointer p-3 rounded-lg transition-all duration-300 
              ${activeSection === 'Messages' ? 'bg-main text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
            onClick={() => setActiveSection('Messages')}
          >
            Messages
          </li>
          <li
            className={`cursor-pointer p-3 rounded-lg transition-all duration-300 
              ${activeSection === 'Ratings' ? 'bg-main text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
            onClick={() => setActiveSection('Ratings')}
          >
            Ratings & Reviews
          </li>
          <li
            className={`cursor-pointer p-3 rounded-lg transition-all duration-300 
              ${activeSection === 'Orders' ? 'bg-main text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
            onClick={() => setActiveSection('Orders')}
          >
            Orders
          </li>
          <li
            className={`cursor-pointer p-3 rounded-lg transition-all duration-300 
              ${activeSection === 'Profile' ? 'bg-main text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
            onClick={() => setActiveSection('Profile')}
          >
            Profile Management
          </li>
        </ul>
      </nav>
    </div>
  );
};


// Main Content Component
const MainContent = ({ activeSection }) => {
  switch (activeSection) {
    case 'Dashboard':
      return <DashboardOverview />;
    case 'RFQ':
      return <RFQManagement />;
    case 'Messages':
      return <Messages />;
    case 'Ratings':
      return <Ratings />;
    case 'Orders':
      return <OrderTracking />;
    case 'Profile':
      return <ProfileManagement />;
    default:
      return <DashboardOverview />;
  }
};

// Dashboard Overview Component
const DashboardOverview = () => (
  <div className="p-4">
    <h2 className="text-lg font-semibold">Overview</h2>
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white p-4 shadow rounded">Total RFQs: 12</div>
      <div className="bg-white p-4 shadow rounded">Messages: 5</div>
      <div className="bg-white p-4 shadow rounded">Orders in Progress: 3</div>
    </div>
  </div>
);

// RFQ Management Component
const RFQManagement = () => (
  <div className="p-4">
    <h2 className="text-lg font-semibold">Request for Quotation (RFQ)</h2>
    <div className="mt-4">
      <form className="space-y-4">
        <input type="text" placeholder="Product Name" className="border p-2 w-full rounded" />
        <input type="number" placeholder="Quantity" className="border p-2 w-full rounded" />
        <textarea placeholder="Additional Details" className="border p-2 w-full rounded" />
        <button className="bg-main text-white px-4 py-2 rounded">Submit RFQ</button>
      </form>
    </div>
    <div className="mt-6">
      <h3 className="text-lg">Your RFQs</h3>
      <ul className="space-y-2">
        <li className="p-4 bg-gray-100 rounded">RFQ for Product X - Status: Pending</li>
        <li className="p-4 bg-gray-100 rounded">RFQ for Product Y - Status: Approved</li>
      </ul>
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
    <ul className="space-y-4">
      <li className="bg-white p-4 shadow rounded">
        <h3>Order #12345</h3>
        <p>Status: Shipped</p>
      </li>
      <li className="bg-white p-4 shadow rounded">
        <h3>Order #67890</h3>
        <p>Status: Processing</p>
      </li>
    </ul>
  </div>
);

// Profile Management Component
const ProfileManagement = () => (
  <div className="p-4">
    <h2 className="text-lg font-semibold">Profile Management</h2>
    <div className="mt-4">
      <form className="space-y-4">
        <input type="text" placeholder="Name" className="border p-2 w-full rounded" />
        <input type="email" placeholder="Email" className="border p-2 w-full rounded" />
        <input type="text" placeholder="Company" className="border p-2 w-full rounded" />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Update Profile</button>
      </form>
    </div>
  </div>
);

// Main Buyer Dashboard Component
const BuyerDashboard = () => {
  const [activeSection, setActiveSection] = useState('Dashboard');

  return (
    <div className="flex h-screen">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="w-3/4">
        <Header />
        <MainContent activeSection={activeSection} />
      </div>
    </div>
  );
};

// Placeholder Icons for Notifications and Profile
const NotificationsIcon = () => <span>🔔</span>;
const ProfileIcon = () => <span>👤</span>;

export default BuyerDashboard;
