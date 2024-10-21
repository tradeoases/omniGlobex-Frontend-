import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import "./supplierProfile.css";

export function SupplierDropDownProfile() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("profile");
    localStorage.removeItem("token");
    navigate("/");
    navigate(0);
  };
  return (
    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild>
    //     <div className=" text-2xl cursor-pointer">
    //       <FaUserCircle />
    //     </div>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent className="w-56">
    //     <DropdownMenuLabel>My Account</DropdownMenuLabel>
    //     <DropdownMenuSeparator />
    //     <DropdownMenuGroup>
    //       <Link to="manage-users">
    //         <DropdownMenuItem>
    //           <User className="mr-2 h-4 w-4" />
    //           <span>Users</span>
    //         </DropdownMenuItem>
    //       </Link>
    //       <Link to="supplier-profile">
    //         <DropdownMenuItem>
    //           <CreditCard className="mr-2 h-4 w-4" />
    //           <span>My Profile</span>
    //         </DropdownMenuItem>
    //       </Link>
    //       <DropdownMenuLabel>Settings</DropdownMenuLabel>
    //       <DropdownMenuSeparator />
    //       <Link to="security-settings">
    //         <DropdownMenuItem>
    //           <Settings className="mr-2 h-4 w-4" />
    //           <span>Security Settings</span>
    //         </DropdownMenuItem>
    //       </Link>
    //       <Link to="change-password">
    //         <DropdownMenuItem>
    //           <Keyboard className="mr-2 h-4 w-4" />
    //           <span>Change Password</span>
    //         </DropdownMenuItem>
    //       </Link>
    //     </DropdownMenuGroup>
    //   </DropdownMenuContent>
    // </DropdownMenu>
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
                <Link to="users">
                  <DropdownMenu.Item className="DropdownMenuItem">
                    Users
                  </DropdownMenu.Item>
                </Link>
                <Link to="supplier-profile">
                  <DropdownMenu.Item className="DropdownMenuItem">
                    My Profile
                  </DropdownMenu.Item>
                </Link>
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger className="DropdownMenuSubTrigger">
              Settings
              <div className="RightSlot">
                <ChevronRightIcon />
              </div>
            </DropdownMenu.SubTrigger>

            {/* Updated SubContent positioning */}
            <DropdownMenu.Portal>
              <DropdownMenu.SubContent className="DropdownMenuSubContent">
                <Link to="security-settings">
                  <DropdownMenu.Item className="DropdownMenuItem">
                    Security Settings
                  </DropdownMenu.Item>
                </Link>
                <Link to="change-password">
                  <DropdownMenu.Item className="DropdownMenuItem">
                    Change Password
                  </DropdownMenu.Item>
                </Link>
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>
          <Link to="/supplier-dashboard/messages">
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
