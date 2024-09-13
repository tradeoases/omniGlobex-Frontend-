import DiscountBanner from "./DiscountBanner";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa6";
import { Logo } from "./logo";

const Footer = () => {
  return (
    <div className="w-full">
      <DiscountBanner />

      <div className="flex items-center justify-center h-32 lg:h-40">
        <Logo />
      </div>

      <div className="w-10/12 xl:w-8/12 mx-auto text-base">
        <div className="border-t border-b py-14 grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-5">
            <p>About</p>
            <p className="w-3/4 text-gray-400">
            Our platform is a comprehensive B2B multi-vendor marketplace designed to connect various
business entities, including suppliers, buyers, local marketing companies, local logistics
companies, and international supply chain service providers. The platform aims to facilitate
international trade by providing a secure, efficient, and user-friendly environment for business
transactions, market insights, and supply chain management.

            </p>
          </div>

          <div className="space-y-5">
            <p>Feature</p>
            <div className="space-y-3 text-gray-400">
              <p>About Us</p>
              <p>Terms Conditions</p>
              <p>Best Products</p>
            </div>
          </div>

          <div className="space-y-5">
            <p>General Links</p>
            <div className="space-y-3 text-gray-400">
              <p>Blog</p>
              <p>Tracking Order</p>
              <p>Become Seller</p>
            </div>
          </div>

          <div className="space-y-5">
            <p>Helpful</p>
            <div className="space-y-3 text-gray-400">
              <p>Flash Sale</p>
              <p>FAQ</p>
              <p>Support</p>
            </div>
          </div>
        </div>
        <div className="py-2">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-lg text-gray-400">
              <span>
                <FaInstagram />
              </span>
              <span>
                <FaFacebookF />
              </span>
              <span>
                <FaYoutube />
              </span>
            </div>
            <p className="text-base text-gray-400">
              &copy;{new Date().getFullYear()}{" "}
              <span className="text-black">OmniGlobex</span> All rights
              reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
