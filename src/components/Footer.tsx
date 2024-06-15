import React from "react";
import DiscountBanner from "./DiscountBanner";
import { Logo } from "./TopBar";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa6";

const Footer = () => {
  return (
    <div>
      <DiscountBanner />

      <div className="flex items-center justify-center h-32 lg:h-40">
        <Logo />
      </div>

      <div className="w-10/12 xl:w-8/12 mx-auto text-base">
        <div className="border-t border-b py-14 grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-5">
            <p>About</p>
            <p className="w-3/4 text-gray-400">
              We know there are a lot of threa developers our but we pride into
              a firm in the industry.
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
              <span className="text-black">Campany Name</span> All rights
              reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
