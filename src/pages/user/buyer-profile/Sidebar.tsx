import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { menuItems } from "./constants"; // Import your menu items
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // For dropdown arrow icons

const SideBar = () => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null); // State to control dropdown visibility
  const location = useLocation(); // Get the current path

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <div className="h-full bg-gray-800 text-white flex flex-col w-64">
      <div className="p-4 text-center font-bold text-xl border-b border-gray-600">
        {/* Sidebar Header */}
        My Dashboard
      </div>
      <ul className="p-4 flex-grow">
        {menuItems.map(({ title, path, icon, subItems }, index) => {
          const hasSubItems = Array.isArray(subItems) && subItems.length > 0;
          const isActive = location.pathname.startsWith(path || ""); // Check if the current path matches the item's path

          return (
            <li key={title} className="my-2">
              <div
                className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors duration-200 ${
                  isActive ? "bg-main" : "hover:bg-main"
                }`}
                onClick={() =>
                  hasSubItems ? () => toggleDropdown(index) : null
                }
              >
                <div className="flex items-center">
                  <span className="mr-3">{icon}</span>
                  <Link to={path || ""} className="flex-grow">
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

              {/* Submenu items */}
              {hasSubItems && openDropdown === index && (
                <ul className="ml-4 mt-2 bg-gray-700 rounded-md shadow-lg overflow-hidden transition-all duration-300 ease-in-out">
                  {subItems.map(({ title, path }) => (
                    <li key={title} className="my-1">
                      <Link
                        to={path}
                        className={`block p-2 pl-6 rounded-md transition-colors duration-200 hover:bg-main ${
                          location.pathname === path ? "bg-main" : ""
                        }`}
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

      {/* Sidebar Footer */}
      <div className="p-4 text-center text-gray-400 border-t border-gray-600">
        © 2024 Globex
      </div>
    </div>
  );
};

export default SideBar;
