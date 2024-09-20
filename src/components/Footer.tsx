import DiscountBanner from "./DiscountBanner";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa6";
import { Logo } from "./logo";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full bg-gray-700">
      {/* Discount Banner */}
      <DiscountBanner />

      {/* Logo Section */}
      <div className="flex items-center justify-center h-32 lg:h-40">
        <Logo />
      </div>

      {/* Main Footer Content */}
      <div className="w-10/12 xl:w-8/12 mx-auto text-base">
        <div className="border-t border-b py-14 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Company Section */}
          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-gray-100">Company</h3>
            <div className="space-y-3 text-gray-500">
              <Link
                to="about"
                className="hover:text-main transition duration-300"
              >
                <p className="pb-2">About Us</p>
              </Link>
              <Link
                to="contact"
                className="hover:text-main transition duration-300"
              >
                <p className="pb-2">Contact Us</p>
              </Link>
              <Link to="#" className="hover:text-main transition duration-300">
                <p className="pb-2">Careers</p>
              </Link>
              <Link to="#" className="hover:text-main transition duration-300">
                <p>Partners</p>
              </Link>
            </div>
          </div>

          {/* Legal Section */}
          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-gray-100">Legal</h3>
            <div className="space-y-3 text-gray-500">
              <Link
                to="terms-condition"
                className="hover:text-main transition duration-300"
              >
                <p className="pb-2">Terms & Conditions</p>
              </Link>
              <Link
                to="privacy-policy"
                className="hover:text-main transition duration-300"
              >
                <p className="pb-2">Privacy Policy</p>
              </Link>
              <Link
                to="/cookie-policy"
                className="hover:text-main transition duration-300"
              >
                <p>Cookie Policy</p>
              </Link>
            </div>
          </div>

          {/* Terms Section */}
          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-gray-100">Terms</h3>
            <div className="space-y-3 text-gray-500">
              <Link
                to="track-order"
                className="hover:text-main transition duration-300"
              >
                <p className="pb-2">Tracking Order</p>
              </Link>
              <Link
                to="signup"
                className="hover:text-main transition duration-300"
              >
                <p className="pb-2">Become Seller</p>
              </Link>
              <Link to="/" className="hover:text-main transition duration-300">
                <p className="pb-2">Best Products</p>
              </Link>
              <Link
                to="blogs"
                className="hover:text-main transition duration-300"
              >
                <p className="pb-2">Blog</p>
              </Link>
              <Link
                to="support"
                className="hover:text-main transition duration-300"
              >
                <p className="pb-2">Support</p>
              </Link>
              <Link
                to="faq"
                className="hover:text-main transition duration-300"
              >
                <p className="pb-2"> FAQ</p>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Social Media Icons */}
            <div className="flex items-center gap-4 text-2xl text-gray-500">
              <Link to="#" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="hover:text-pink-500 transition duration-300" />
              </Link>
              <Link to="#" target="_blank" rel="noopener noreferrer">
                <FaFacebookF className="hover:text-blue-500 transition duration-300" />
              </Link>
              <Link to="" target="_blank" rel="noopener noreferrer">
                <FaYoutube className="hover:text-red-500 transition duration-300" />
              </Link>
            </div>

            {/* Copyright */}
            <p className="text-base text-gray-500 mt-4 md:mt-0">
              &copy; {new Date().getFullYear()}{" "}
              <span className="text-sm xl:text-sm font-semibold text-main">
                Omni
                <span className="text-gray-500">
                  Globex . All rights reserved.
                </span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
