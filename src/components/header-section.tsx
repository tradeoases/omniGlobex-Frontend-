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
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
      <div className="col-span-3 flex w-full flex-col text-white items-start justify-between bg-header-bg-2 bg-cover p-12 rounded-[50px]">
        <div className="space-y-10 mb-10 lg:space-y-20">
          <p className="text-2xl lg:text-5xl font-medium">
            The simple <br /> product
          </p>
          <p className="lg:text-lg  font-light hover:text-white text-gray-400">
            <Link to="/" className="flex  items-center gap-2">
              open product <HiChevronRight />
            </Link>
          </p>
        </div>

        <div className="w-full flex items-center justify-between">
          <Link
            to="/all-products"
            className="py-2 lg:py-4 border px-4 rounded-full"
          >
            All Products
          </Link>
          <p
            onClick={onScroll}
            className="w-10 cursor-pointer lg:w-16 h-10 lg:h-16 border-white rounded-full border-2 flex items-center justify-center "
          >
            <HiArrowSmallDown className="text-2xl lg:text-5xl" />
          </p>
        </div>
      </div>

      <div className="col-span-2 grid grid-cols-2 lg:grid-cols-1 gap-6 lg:gap-0 lg:space-y-5">
        <div
          onClick={() => navigate("/blogs")}
          className="bg-header-bg cursor-pointer bg-cover flex items-start justify-between flex-col rounded-[50px] p-6 lg:p-12 h-[20vh] lg:h-[35vh]"
        >
          <p className="text-md lg:text-5xl font-medium">
            See All
            <br /> Blogs
          </p>

          <MdOutlineArrowOutward className="text-2xl lg:text-5xl" />
        </div>

        <div
          onClick={() => navigate("/contact")}
          className="bg-main cursor-pointer flex justify-between items-start flex-col relative rounded-[50px] lg:h-[35vh] p-6 h-[20vh] lg:p-12"
        >
          <div className="flex w-full items-center justify-between">
            <span className="text-xs lg:text-md font-light">
              Have some <br /> questions
            </span>
            <LiaTelegram className="text-2xl lg:text-5xl" />
          </div>
          <div className="lg:text-5xl font-medium">Contact Us</div>
        </div>
      </div>
    </div>
  );
};