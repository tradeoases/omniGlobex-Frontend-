/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "@/components/logo";
import img from "../../../assets/omniGlobexlogo.png";
import { FaUserCircle } from "react-icons/fa";

const BuyersNavBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event: any) => {
    if (
      dropdownRef.current &&
      !(dropdownRef.current as any).contains(event.target)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Left Section: Logo and Navigation */}
        <div className="flex items-center space-x-8">
          {/* Company Logo */}
          <img src={img} alt="Omniglobex logo" className="h-12 w-auto" />

          {/* Home Link */}
          <Link
            to="/"
            className="text-gray-900 hover:text-blue-600 font-medium"
          >
            <Logo />
          </Link>
          <div className="hidden lg:block text-gray-900 font-bold text-2xl">
            Buyer Center
          </div>
        </div>

        {/* Right Section: Buttons and Profile */}
        <div className="ml-auto flex items-center space-x-6">
          {/* Navigation Buttons (aligned to the right) */}
          <div className="hidden md:flex space-x-6">
            <Link to={"/create-business"}>
              <button className="bg-white text-main border border-main px-5 py-2 rounded-full hover:bg-main hover:text-white transition duration-300 shadow-md hover:shadow-lg">
                Start Selling Now
              </button>
            </Link>

            <Link to="/buyer-dashboard/messages">
              <button className=" text-gary-400 px-5 py-2 rounded-full hover:text-main transition duration-300 ">
                Messages
              </button>
            </Link>

            <Link to="#">
              <button className=" text-gary-400 px-5 py-2 rounded-full hover:text-main transition duration-300">
                Request for Quotations
              </button>
            </Link>
          </div>

          {/* Profile Icon with hover dropdown */}
          <div className="relative group">
            {/* Profile Icon */}
            <div onClick={toggleDropdown}>
              <FaUserCircle className="text-4xl text-gray-700 cursor-pointer transition duration-300" />
            </div>

            {/* Dropdown Content */}
            <div
              ref={dropdownRef}
              className={`absolute flex flex-col right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 border border-gray-200 ${
                dropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"
              } transition-opacity duration-300 z-50`}
            >
              {/* <div className="text-gray-900 font-semibold px-4 py-2">
                Buyer Center
              </div> */}
              {/* <div className="border-t border-gray-100"></div> */}
              <Link
                to="/create-business"
                className="hover:bg-gray-100 px-4 py-2 text-gray-800 cursor-pointer"
              >
                Start Selling Now
              </Link>
              <Link
                to={"/buyer-dashboard/rfq"}
                className="hover:bg-gray-100 px-4 py-2 text-gray-800 cursor-pointer"
              >
                My RFQ
              </Link>
              <Link
                to={"/buyer-dashboard/orders"}
                className="hover:bg-gray-100 px-4 py-2 text-gray-800 cursor-pointer"
              >
                My Orders
              </Link>
              <Link
                to={"/buyer-dashboard/messages"}
                className="hover:bg-gray-100 px-4 py-2 text-gray-800 cursor-pointer"
              >
                Messages
              </Link>
              <Link
                to={"/buyer-dashboard/myAccount/profile"}
                className="hover:bg-gray-100 px-4 py-2 text-gray-800 cursor-pointer"
              >
                My Account
              </Link>
              <div
                onClick={() => {
                  localStorage.removeItem("profile");
                  localStorage.removeItem("token");
                  navigate("/");
                  navigate(0);
                }}
                className="hover:bg-gray-100 px-4 py-2 text-gray-800 cursor-pointer"
              >
                Sign out
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default BuyersNavBar;
// Buyer Center
// My Inquires
// My RFQ
// My Orders
// My Account
// Browsing History
// Business Card

// Sign out
