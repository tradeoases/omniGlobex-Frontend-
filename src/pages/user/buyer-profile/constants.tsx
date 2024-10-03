import {
  FaTachometerAlt,
  FaBook,
  FaUserPlus,
  FaUsers,
  FaChartBar,
  FaBookOpen,
  FaBookReader,
  FaChartLine,
} from "react-icons/fa";

export const menuItems = [
  {
    title: "Dashboard",
    path: "/buyer-dashboard",
    icon: <FaTachometerAlt />,
  },
  {
    title: "Messages",
    path: "/buyer-dashboard/messages",
    icon: <FaUsers />,
  },
  {
    title: "Show Room",
    path: "/buyer-dashboard/showRoom",
    icon: <FaBook />,
  },
  {
    title: "RFQs",
    path: "/buyer-dashboard/rfq",
    icon: <FaUserPlus />,
  },
  {
    title: "Orders",
    path: "/buyer-dashboard/orders",
    icon: <FaBookReader />,
  },
  {
    title: "Ratings",
    path: "/buyer-dashboard/ratings",
    icon: <FaBookOpen />,
  },
  {
    title: "My Account",
    icon: <FaChartLine />,
    subItems: [
      { title: "My Favorite", path: "/buyer-dashboard/myAccount/favorites" },
      { title: "User Profile", path: "/buyer-dashboard/myAccount/profile" },
      { title: "Sourcing Preferences", path: "/buyer-dashboard/myAccount/preferences" },
    ],
  },
  {
    title: "Settings",
    icon: <FaChartBar />,
    subItems: [
      { title: "Security Settings", path: "/buyer-dashboard/settings/security" },
      { title: "Change Password", path: "/buyer-dashboard/settings/change-password" },
      { title: "Notifications", path: "/buyer-dashboard/settings/notifications" },
      { title: "Quick Messages", path: "/buyer-dashboard/settings/quick-messages" },
    ],
  },
];
