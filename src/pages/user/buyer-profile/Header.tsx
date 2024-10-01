import { SearchBar } from "@/components/search-bar";
import { SelectShowroom } from "@/components/select-show-room";
import NotificationsIcon from "./NotificationsIcon";

const Header = () => (
  <header className="flex flex-col md:flex-row justify-between items-center p-4 shadow bg-white">
    {/* Dashboard Title */}
    <strong className="text-lg md:text-xl mb-2 md:mb-0">Welcome To Buyer's Dashboard</strong>

    {/* Search and Showroom selector - Stack vertically on smaller screens */}
    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mb-2 md:mb-0">
      <SearchBar />
      <SelectShowroom />
    </div>

    {/* Notifications Icon */}
    <div className="relative items-center space-x-4">
      <NotificationsIcon />
      {/* Notification Badge */}
      <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">
        3
      </span>
    </div>
  </header>
);

export default Header;
