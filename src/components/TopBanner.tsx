import { Link } from "react-router-dom";
const TopBanner = () => {
  return (
    <div className="w-full text-xs border-b py-3">
      <div className="w-full px-4 md:w-10/12 xl:w-8/12 mx-auto flex items-center justify-between">
        <div className="flex items-center justify-start gap-4">
          <Link to="/signup" className="whitespace-nowrap">
            Account
          </Link>
          <Link to="/support" className="whitespace-nowrap">
            Support
          </Link>
        </div>

        
      </div>
    </div>
  );
};

export default TopBanner;
