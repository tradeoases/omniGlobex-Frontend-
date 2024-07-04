import { IUser, userStore } from "@/store/user-store";
import { FaShippingFast } from "react-icons/fa";
import { FaCartArrowDown, FaUserGear } from "react-icons/fa6";
import { useRecoilValue } from "recoil";

export const Overview = () => {
  const userData = useRecoilValue<IUser | null>(userStore);
  return (
    <div className="col-span-3 space-y-6">
      <div>
        <p className="text-base">Hello, {userData?.fullname.split(" ")[0]}</p>
        <p className="text-xl font-semibold">Welcome to your Profile</p>
      </div>

      <div className="grid mx-auto w-full grid-cols-3 gap-x-2 md:gap-x-8">
        {newOrderData.map((order, i) => (
          <NewOrderBoard key={i} {...order} />
        ))}
      </div>

      <div className="w-full bg-gray-50 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-5 lg:p-8">
        <div className="space-y-4 md:space-y-12">
          <p className="text-xl font-semibold">Personal Information</p>

          <div className="space-y-4">
            {personalInfo.map((info, i) => (
              <div className="text-base grid grid-cols-4" key={i}>
                <span className="text-gray-400 col-span-1">{info.key}:</span>
                <span className="col-span-3">{info.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 md:space-y-12">
          <p className="text-xl font-semibold">Shop Info</p>

          <div className="space-y-4">
            {personalInfo.map((info, i) => (
              <div className="text-base grid grid-cols-4" key={i}>
                <span className="text-gray-400 col-span-1">{info.key}:</span>
                <span className="col-span-3">{info.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;

interface INewOrder {
  title: string;
  count: number;
  icon: JSX.Element;
}
const NewOrderBoard: React.FC<INewOrder> = ({ count, title, icon }) => {
  return (
    <div className="bg-black hover:bg-main hover:text-black xl:w-52 hover:rounded text-white space-y-4 p-2 md:p-8 transition-colors duration-300 ease-in-out">
      <div className="xl:w-16 lg:w-16 h-20 rounded text-main bg-white flex items-center justify-center text-4xl">
        {icon}
      </div>
      <p className="text-sm md:text-xl">{title}</p>
      <p className="text-2xl text-center md:text-5xl font-bold">{count}</p>
    </div>
  );
};

const newOrderData: INewOrder[] = [
  { title: "New Order", count: 654, icon: <FaCartArrowDown /> },
  { title: "New Order", count: 654, icon: <FaShippingFast /> },
  { title: "New Order", count: 654, icon: <FaUserGear /> },
];

const personalInfo = [
  { key: "Name", value: "Shuvo Khan" },
  { key: "Email", value: "nabiwembo@gmail.com" },
  { key: "Phone", value: "01239301920" },
  { key: "City", value: "Kampala" },
  { key: "Zip", value: "4040" },
];
