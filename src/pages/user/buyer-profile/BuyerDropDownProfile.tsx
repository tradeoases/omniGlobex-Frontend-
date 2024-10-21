import { CreditCard, Keyboard, LogOut, Settings, User } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuSub,
//   DropdownMenuSubContent,
//   DropdownMenuSubTrigger,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import "./profile.css";

export function BuyerDropDownProfile() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("profile");
    localStorage.removeItem("token");
    navigate("/");
    navigate(0);
  };

  return (
    // <DropdownMenu.Root>
    //   <DropdownMenu.Trigger asChild>
    //     <div className="text-2xl cursor-pointer">
    //       <FaUserCircle />
    //     </div>
    //   </DropdownMenu.Trigger>
    //   <DropdownMenu.Content className="w-56">
    //     {/* Main DropdownMenu */}

    //     {/* Submenu Trigger for My Account */}
    //     <DropdownMenu.Sub>
    //       <DropdownMenu.SubTrigger>My Account</DropdownMenu.SubTrigger>
    //       <DropdownMenu.SubContent side="bottom" align="start">
    //         <Link to="/buyer-dashboard/myAccount/favorites">
    //           <DropdownMenu.Item>
    //             <User className="mr-2 h-4 w-4" />
    //             <span>My Favorites</span>
    //           </DropdownMenu.Item>
    //         </Link>
    //         <Link to="/buyer-dashboard/myAccount/preferences">
    //           <DropdownMenu.Item>
    //             <CreditCard className="mr-2 h-4 w-4" />
    //             <span>Sourcing Preferences</span>
    //           </DropdownMenu.Item>
    //         </Link>
    //         <Link to="/buyer-dashboard/myAccount/profile">
    //           <DropdownMenu.Item>
    //             <Settings className="mr-2 h-4 w-4" />
    //             <span>User Profile</span>
    //           </DropdownMenu.Item>
    //         </Link>
    //       </DropdownMenu.SubContent>
    //     </DropdownMenu.Sub>

    //     <DropdownMenu.Separator />

    //     {/* Additional Menu Items */}
    //     <Link to="/buyer-dashboard/messages">
    //       <DropdownMenu.Item>
    //         <Keyboard className="mr-2 h-4 w-4" />
    //         <span className="cursor-pointer">Messages</span>
    //       </DropdownMenu.Item>
    //     </Link>

    //     <DropdownMenu.Separator />

    //     {/* Log out option */}
    //     <DropdownMenu.Item onClick={handleLogout}>
    //       <LogOut className="mr-2 h-4 w-4" />
    //       <span className="cursor-pointer">Log out</span>
    //     </DropdownMenu.Item>
    //   </DropdownMenu.Content>
    // </DropdownMenu.Root>
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="IconButton" aria-label="Customise options">
          <FaUserCircle />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger className="DropdownMenuSubTrigger">
              My Account
              <div className="RightSlot">
                <ChevronRightIcon />
              </div>
            </DropdownMenu.SubTrigger>

            {/* Updated SubContent positioning */}
            <DropdownMenu.Portal>
              <DropdownMenu.SubContent className="DropdownMenuSubContent">
                <Link to="/buyer-dashboard/myAccount/favorites">
                  <DropdownMenu.Item className="DropdownMenuItem">
                    My Favorites
                  </DropdownMenu.Item>
                </Link>
                <Link to="/buyer-dashboard/myAccount/preferences">
                  <DropdownMenu.Item className="DropdownMenuItem">
                    Sourcing Preferences
                  </DropdownMenu.Item>
                </Link>
                <Link to="/buyer-dashboard/myAccount/profile">
                  <DropdownMenu.Item className="DropdownMenuItem">
                    User Profile
                  </DropdownMenu.Item>
                </Link>
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>
          <Link to="/buyer-dashboard/messages">
            <DropdownMenu.Item className="DropdownMenuItem">
              Messages
            </DropdownMenu.Item>
          </Link>
          <DropdownMenu.Item
            className="DropdownMenuItem"
            onClick={handleLogout}
          >
            Logout
          </DropdownMenu.Item>

          <DropdownMenu.Arrow className="DropdownMenuArrow" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
