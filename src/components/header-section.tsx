import { HiArrowSmallDown, HiChevronRight } from "react-icons/hi2";
import { LiaTelegram } from "react-icons/lia";
import { MdOutlineArrowOutward } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

interface Props {
  onScroll: () => void;
}

export const HeaderSection: React.FC<Props> = ({ onScroll }) => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-main py-10 px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* Hero Section */}
      <div className="col-span-3 flex flex-col bg-cover bg-center text-white p-12 rounded-xl shadow-lg transition-transform hover:scale-105 relative bg-header-bg-2">
        <div className="space-y-6 mb-8 lg:mb-14">
          <h1 className="text-3xl lg:text-6xl font-bold leading-tight">
            Discover the Future <br /> with Our Products
          </h1>
          <p className="lg:text-lg font-light text-gray-200">
            <Link
              to="/"
              className="flex items-center gap-2 text-white hover:underline"
            >
              Shop Now <HiChevronRight />
            </Link>
          </p>
        </div>

        <div className="flex items-center justify-between w-full">
          <Link
            to="/all-products"
            className="py-3 px-6 bg-yellow-500 hover:bg-yellow-600 text-black rounded-full font-semibold shadow-lg transition-colors"
          >
            Browse Products
          </Link>
          <button
            onClick={onScroll}
            className="w-12 h-12 lg:w-16 lg:h-16 bg-main hover:bg-yellow-600 text-black rounded-full border-1 flex items-center justify-center transition-all"
          >
            <HiArrowSmallDown className="text-2xl lg:text-4xl" />
          </button>
        </div>

        {/* Promo badge */}
        <div className="absolute top-4 right-4 bg-red-500 px-3 py-1 rounded-full text-xs lg:text-sm">
          <span>Up to 50% off!</span>
        </div>
      </div>

      {/* Sidebar Links */}
      <div className="col-span-2 grid grid-cols-2 lg:grid-cols-1 gap-6">
        {/* First Card */}
        <div
          onClick={() => navigate("/blogs")}
          className="bg-gray-900 cursor-pointer p-6 lg:p-8 rounded-xl shadow-xl transition-transform hover:scale-105 relative"
          style={{ backgroundColor: "#1F1F1F" }}
        >
          <h2 className="text-lg lg:text-4xl font-bold text-white">
            Explore Our <br /> Blogs
          </h2>
          <MdOutlineArrowOutward className="text-xl lg:text-3xl text-white" />
        </div>

        {/* Second Card */}
        <div
          onClick={() => navigate("/contact")}
          className="bg-gray-900 cursor-pointer p-6 lg:p-8 rounded-xl shadow-xl transition-transform hover:scale-105 relative z-10"
          style={{ backgroundColor: "#1F1F1F" }}
        >
          <div className="flex justify-between items-center text-white">
            <span className="text-sm lg:text-lg">Need Help?</span>
            <LiaTelegram className="text-xl lg:text-3xl" />
          </div>
          <p className="text-xl lg:text-4xl font-semibold text-white">
            Contact Us
          </p>
        </div>
      </div>
    </div>
  );
};
