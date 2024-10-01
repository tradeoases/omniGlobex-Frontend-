// MainContent.js
import DashboardOverview from "./DashboardOverview";
import RFQManagement from "./RFQManagement";
import Messages from "./Messages";
import Ratings from "./Ratings";
import OrderTracking from "./OrderTracking";
import ProfileManagement from "./ProfileManagement";
import Logout from "./Logout";
import BuyersShowRoom from "./BuyersShowRoom";

const MainContent = ({ activeSection }) => {
  switch (activeSection) {
    case "Dashboard":
      return <DashboardOverview />;
    case "Show room":
      return <BuyersShowRoom />;
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

export default MainContent;
