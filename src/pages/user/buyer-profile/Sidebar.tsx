import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { menuItems } from "./constants";
import { FaChevronDown, FaChevronUp, FaBars, FaTimes } from "react-icons/fa";
import { SelectShowroom } from "@/components/select-show-room";

const SideBar = ({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const location = useLocation();
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

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

          {menuItems.map(({ title, path, icon, subItems }, index) => {
            const hasSubItems = Array.isArray(subItems) && subItems.length > 0;
            const isActive = location.pathname.startsWith(path || "");

            return (
              <li key={title} className="my-2">
                <div
                  className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors duration-200 ${
                    isActive ? "" : ""
                  }`}
                  onClick={
                    hasSubItems ? () => toggleDropdown(index) : toggleSidebar
                  }
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
                  {hasSubItems && (
                    <span>
                      {openDropdown === index ? (
                        <FaChevronUp className="ml-2" />
                      ) : (
                        <FaChevronDown className="ml-2" />
                      )}
                    </span>
                  )}
                </div>

                {/* Submenu */}
                {hasSubItems && openDropdown === index && (
                  <ul className="ml-4 mt-2 rounded-md shadow-lg transition-all duration-300 ease-in-out">
                    {subItems.map(({ title, path }) => (
                      <li key={title} className="my-1 hover:text-main">
                        <Link
                          to={path}
                          className={`block p-2 pl-6 rounded-md transition-colors duration-200 ${
                            location.pathname === path ? "" : ""
                          }`}
                          onClick={toggleSidebar}
                        >
                          {title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
