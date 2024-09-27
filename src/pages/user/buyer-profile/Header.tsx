import { IoNotificationsCircleOutline } from "react-icons/io5";

const BuyerHeader = () => (
    <div className="flex justify-between items-center p-4 shadow">
      <div className="text-xl font-bold">Buyer Dashboard</div>
      <input type="text" placeholder="Search products/services..." className="border p-2 rounded" />
      <div className="flex items-center space-x-4">
        {/* <span className="relative">
          <IoNotificationsCircleOutline />
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">3</span>
        </span> */}
        {/* <ProfileIcon /> */}
      </div>
    </div>
  );

  export default BuyerHeader;
  