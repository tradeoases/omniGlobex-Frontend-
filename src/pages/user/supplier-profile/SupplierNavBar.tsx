/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/Navbar.tsx
import { Logo } from "@/components/logo";
import { useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

const SupplierNavBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };
  const closeDropdown = () => {
    setDropdownOpen(false);
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
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14">
          <div className="flex items-center">
            <NavLink to="/" className="text-2xl font-bold text-black">
              <Logo />
            </NavLink>

            <p className="text-2xl font-semibold pl-6">Supplier Center</p>
            <Link
              className="border  px-2 py-2 ml-6 rounded-lg cursor-pointerbg-white text-main  border-main hover:bg-main hover:text-white transition duration-300 shadow-md hover:shadow-lg "
              to="/buyer-dashboard"
            >
              Switch to Buyer
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {/* <Link
              className="border  px-2  rounded-lg cursor-pointerbg-white text-main  border-main hover:bg-main hover:text-white transition duration-300 shadow-md hover:shadow-lg "
              to="/buyer-dashboard"
            >
              Return to buyer site
            </Link> */}
            <div className="relative group">
              {/* Profile Icon */}
              <div onClick={toggleDropdown}>
                <FaUserCircle className="text-4xl text-gray-700 cursor-pointer transition duration-300" />
              </div>

              {/* Dropdown Content */}
              <div
                ref={dropdownRef}
                className={`absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 border border-gray-200 ${
                  dropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"
                } transition-opacity duration-300 z-50`}
              >
                <Link
                  to="/supplier-dashboard"
                  className="hover:bg-gray-100 px-4 py-2 text-gray-800 cursor-pointer"
                  onClick={closeDropdown}
                >
                  Manage account
                </Link>
                <Link to="/create-business" onClick={closeDropdown}>
                  <div className="hover:bg-gray-100 px-4 py-2 text-gray-800 cursor-pointer">
                    Create a business
                  </div>
                </Link>
                <Link to="subscription" onClick={closeDropdown}>
                  <div className="hover:bg-gray-100 px-4 py-2 text-gray-800 cursor-pointer">
                    Subscription
                  </div>
                </Link>
                <Link to="order" onClick={closeDropdown}>
                  <div className="hover:bg-gray-100 px-4 py-2 text-gray-800 cursor-pointer">
                    My purchases
                  </div>
                </Link>
                <Link to="supplier-rfq" onClick={closeDropdown}>
                  <div className="hover:bg-gray-100 px-4 py-2 text-gray-800 cursor-pointer">
                    Request for Quotation
                  </div>
                </Link>
                <Link
                  to="/products"
                  onClick={closeDropdown}
                  className="hover:bg-gray-100 px-4 py-2 text-gray-800 cursor-pointer"
                >
                  Shopping
                </Link>
                <div className="hover:bg-gray-100 px-4 py-2 text-gray-800 cursor-pointer">
                  Log out
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SupplierNavBar;
