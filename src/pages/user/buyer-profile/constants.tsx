import {
  FaTachometerAlt,
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
    path: "messages",
    icon: <FaUsers />,
  },
  // {
  //   title: "Show Room",
  //   path: "showRoom",
  //   icon: <FaBook />,
  // },
  {
    title: "RFQs",
    path: "rfq",
    icon: <FaUserPlus />,
  },
  {
    title: "Orders",
    path: "orders",
    icon: <FaBookReader />,
  },
  {
    title: "Ratings",
    path: "ratings",
    icon: <FaBookOpen />,
  },
  {
    title: "My Account",
    icon: <FaChartLine />,
    subItems: [
      { title: "My Favorite", path: "myAccount/favorites" },
      { title: "User Profile", path: "myAccount/profile" },
      { title: "Sourcing Preferences", path: "myAccount/preferences" },
    ],
  },
  {
    title: "Settings",
    icon: <FaChartBar />,
    subItems: [
      { title: "Security Settings", path: "settings/security" },
      { title: "Change Password", path: "settings/change-password" },
      { title: "Notifications", path: "settings/notifications" },
      { title: "Quick Messages", path: "settings/quick-messages" },
    ],
  },
];
