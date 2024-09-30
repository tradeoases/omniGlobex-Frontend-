// Sidebar.js
const Sidebar = ({ activeSection, setActiveSection }) => {
    const sections = ["Dashboard", "RFQ", "Messages", "Ratings", "Orders", "Profile", "Logout"];
  
    return (
      <div className=" border-r bg-white h-full p-6">
        <nav>
          <ul className="space-y-2">
            {sections.map((section) => (
              <li
                key={section}
                className={`cursor-pointer p-3 rounded-lg transition-all duration-300 
                ${
                  activeSection === section
                    
                    
                }`}
                onClick={() => setActiveSection(section)}
              >
                {section}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    );
  };
  
  export default Sidebar;
  