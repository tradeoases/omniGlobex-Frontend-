import { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { menuItems } from "./constants";
import { FaBars, FaSignOutAlt, FaTimes } from "react-icons/fa";
import { SelectShowroom } from "@/components/select-show-room";

const SideBar = ({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) => {
  const location = useLocation();
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      if (isOpen) toggleSidebar();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = () => {
    localStorage.removeItem("profile");
    localStorage.removeItem("token");
    navigate("/");
    navigate(0);
  };

  const handleMenuItemClick = (path: string) => {
    navigate(path);
    toggleSidebar();
  };

  return (
    <div>
      {/* Sidebar Toggle Button (Mobile) */}
      <div className="flex justify-between items-center p-4 md:hidden">
        <button
          className="text-gray-600 focus:outline-none"
          onClick={toggleSidebar}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 h-full w-64 bg-gray-600 p-4 text-white z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:w-64`}
        style={{
          maxHeight: "calc(100vh - 64px)",
          top: "80px",
          overflowY: "auto",
        }}
      >
        <ul className="p-4 flex-grow border-gray-300 rounded-lg shadow-lg">
          <div className="text-gray-700">
            <SelectShowroom />
          </div>

          {menuItems.map(({ title, path, icon }) => {
            const isActive = location.pathname.startsWith(path || "");

            return (
              <li key={title} className="my-2">
                <div
                  className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors duration-200 ${
                    isActive ? "" : ""
                  }`}
                  onClick={() => handleMenuItemClick(path || "")}
                >
                  <div className="flex items-center">
                    <span className="mr-3">{icon}</span>
                    <Link
                      to={path || ""}
                      className={`flex-grow text-white hover:text-main ${
                        isActive ? "text-main" : ""
                      }`}
                    >
                      {title}
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
          <div onClick={handleLogout} className="flex gap-2 cursor-pointer">
            <FaSignOutAlt className="ml-2 mt-2" />
            <span className="hover:text-main">Log out</span>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
