import { CreditCard, Keyboard, Settings, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export function SupplierDropDownProfile() {
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
          <Link to="manage-users">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Users</span>
            </DropdownMenuItem>
          </Link>
          <Link to="supplier-profile">
            <DropdownMenuItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>My Profile</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuLabel>Settings</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link to="security-settings">
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Security Settings</span>
            </DropdownMenuItem>
          </Link>
          <Link to="change-password">
            <DropdownMenuItem>
              <Keyboard className="mr-2 h-4 w-4" />
              <span>Change Password</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
