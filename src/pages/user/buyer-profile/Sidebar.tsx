/* eslint-disable @typescript-eslint/no-explicit-any */
import { FiMenu } from "react-icons/fi";

const Sidebar = ({
  activeSection,
  setActiveSection,
  isOpen,
  setIsOpen,
}: {
  activeSection: any;
  setActiveSection: any;
  isOpen: any;
  setIsOpen: any;
}) => {
  const sections = [
    "Dashboard",
    "Show room",
    "RFQ",
    "Messages",
    "Ratings",
    "Orders",
  ];

  return (
    <div>
      {/* Hamburger icon for mobile */}
      <div className="md:hidden p-4 bg-gray-800 text-white flex justify-between items-center">
        <h1 className="text-lg font-bold">Menu</h1>
        <button onClick={() => setIsOpen(!isOpen)}>
          <FiMenu size={24} />
        </button>
      </div>

      {/* Sidebar content */}
      <div
        className={`bg-gray-800 min-h-screen p-6 fixed inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:block`}
      >
        <nav>
          <ul className="space-y-2">
            {sections.map((section) => (
              <li
                key={section}
                className={`cursor-pointer p-3 rounded-lg text-gray-300 transition-all duration-300 
              ${
                activeSection === section
                  ? "bg-gray-700 text-white font-semibold shadow-lg"
                  : "hover:bg-gray-700 hover:text-white"
              }`}
                onClick={() => {
                  setActiveSection(section);
                  setIsOpen(false); // Close sidebar on mobile after clicking
                }}
              >
                {section}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
