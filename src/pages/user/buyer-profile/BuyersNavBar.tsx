import { Link } from "react-router-dom";
import { Logo } from "@/components/logo";
import img from "../../../assets/omniGlobexlogo.png";
import { BuyerDropDownProfile } from "./BuyerDropDownProfile";

const BuyersNavBar = () => {
  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center space-x-8">
          <img src={img} alt="Omniglobex logo" className="h-12 w-auto" />

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

        <div className="ml-auto flex items-center space-x-6">
          <div className="hidden md:flex space-x-6">
            <Link to={"/supplier-dashboard"}>
              <button className="bg-white text-main border border-main px-5 py-2 rounded-full hover:bg-main hover:text-white transition duration-300 shadow-md hover:shadow-lg">
                Start Selling Now
              </button>
            </Link>

            <Link to="/buyer-dashboard/messages">
              <button className="text-gray-400 px-5 py-2 rounded-full hover:text-main transition duration-300">
                Messages
              </button>
            </Link>

            <Link to="/buyer-dashboard/rfq">
              <button className="text-gray-400 px-5 py-2 rounded-full hover:text-main transition duration-300">
                Request for Quotations
              </button>
            </Link>
          </div>

          <div className="relative flex justify-end items-center">
            <BuyerDropDownProfile />
          </div>
        </div>
      </div>
    </header>
  );
};

export default BuyersNavBar;
