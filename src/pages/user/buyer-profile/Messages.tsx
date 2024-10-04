import { useState } from "react";

const Messages = () => {
  const [activeTab, setActiveTab] = useState("All"); // Default active tab

  return (
    <div className="p-4 w-full">
      {/* Message container with fixed height and full width */}
      <div className="bg-white p-4 w-full shadow rounded mt-4 h-64">
        {/* Links for All, Unread, Read with boundary line */}
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold mb-4">My Messages</h2>
          <div className="flex space-x-8 mb-4 relative">
            {/* Increased gap between links */}
            <a
              href="#"
              onClick={() => setActiveTab("All")}
              className={`relative ${
                activeTab === "All"
                  ? "text-yellow-500 after:w-full"
                  : "text-gray-500 after:w-0"
              } after:absolute after:bottom-[-1px] after:left-0 after:h-0.5 after:bg-yellow-500 after:transition-all after:duration-300`}
              style={{ display: "inline-block" }}
            >
              All
            </a>
            <a
              href="#"
              onClick={() => setActiveTab("Unread")}
              className={`relative ${
                activeTab === "Unread"
                  ? "text-yellow-500 after:w-full"
                  : "text-gray-500 after:w-0"
              } after:absolute after:bottom-[-1px] after:left-0 after:h-0.5 after:bg-yellow-500 after:transition-all after:duration-300`}
              style={{ display: "inline-block" }}
            >
              Unread
            </a>
            <a
              href="#"
              onClick={() => setActiveTab("Read")}
              className={`relative ${
                activeTab === "Read"
                  ? "text-yellow-500 after:w-full"
                  : "text-gray-500 after:w-0"
              } after:absolute after:bottom-[-1px] after:left-0 after:h-0.5 after:bg-yellow-500 after:transition-all after:duration-300`}
              style={{ display: "inline-block" }}
            >
              Read
            </a>
          </div>

          {/* Boundary line */}
          <hr className="border-gray-300 mb-4" />
        </div>

        {/* Message content, make it responsive and full width */}
        <div className="flex items-center justify-between w-full">
          <h3 className="flex-1">Supplier X</h3>
          <span className="text-xs text-gray-500">2 hours ago</span>
        </div>
        <p className="mt-2">Hi, we're interested in your RFQ...</p>
      </div>
    </div>
  );
};

export default Messages;
