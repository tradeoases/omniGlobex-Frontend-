import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";

const TopBanner = () => {
  return (
    <div className="w-full border-b py-3">
      <div className="w-10/12 xl:w-8/12 mx-auto flex items-center justify-between">
        <div className="flex items-center justify-start gap-4">
          <Link to="/track-order">Track Order</Link>
          <Link to="/signup">Account</Link>
          <Link to="/support">Support</Link>
        </div>

        <div className="hidden md:flex items-center justify-end gap-4">
          <p className="flex items-center gap-2">
            <span>United State</span>
            <MdOutlineKeyboardArrowDown />
          </p>
          <p className="flex items-center gap-2">
            <span>USD</span>
            <MdOutlineKeyboardArrowDown />
          </p>
          <p className="flex items-center gap-2">
            <span>English</span>
            <MdOutlineKeyboardArrowDown />
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
