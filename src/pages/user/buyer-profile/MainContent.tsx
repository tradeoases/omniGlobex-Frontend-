// MainContent.js
import DashboardOverview from "./DashboardOverview";
import RFQManagement from "./RFQManagement";
import Messages from "./Messages";
import Ratings from "./Ratings";
import OrderTracking from "./OrderTracking";
import BuyersShowRoom from "./BuyersShowRoom";

const MainContent = ({ activeSection }: {activeSection:string}) => {
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
    default:
      return <DashboardOverview />;
  }
};

export default MainContent;
