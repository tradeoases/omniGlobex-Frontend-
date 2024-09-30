// Header.js
import { SearchBar } from "@/components/search-bar";
import { SelectShowroom } from "@/components/select-show-room";
import NotificationsIcon from "./NotificationsIcon";

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

export default Header;
