import { CreditCard, Keyboard, LogOut, Settings, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export function BuyerDropDownProfile() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("profile");
    localStorage.removeItem("token");
    navigate("/");
    navigate(0);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className=" text-2xl cursor-pointer">
          <FaUserCircle />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link to="/buyer-dashboard/myAccount/favorites">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>My Favorites</span>
            </DropdownMenuItem>
          </Link>
          <Link to="/buyer-dashboard/myAccount/preferences">
            <DropdownMenuItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Sourcing Preferences</span>
            </DropdownMenuItem>
          </Link>
          <Link to="/buyer-dashboard/myAccount/profile">
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>User Profile</span>
            </DropdownMenuItem>
          </Link>
          <Link to="/buyer-dashboard/messages">
            <DropdownMenuItem>
              <Keyboard className="mr-2 h-4 w-4" />
              <span className="cursor-pointer">Messages</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub></DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span className="cursor-pointer">Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
