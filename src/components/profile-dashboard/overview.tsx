import { FaShippingFast } from "react-icons/fa";
import { FaCartArrowDown, FaUserGear } from "react-icons/fa6";

export const Overview = () => {
  return (
    <div className="col-span-3 space-y-6">
      <div>
        <p className="text-base">Hello, Shevo</p>
        <p className="text-xl font-semibold">Welcome to your Profile</p>
      </div>

      <div className="grid mx-auto w-full grid-cols-3 gap-x-8">
        {newOrderData.map((order, i) => (
          <NewOrderBoard key={i} {...order} />
        ))}
      </div>

      <div className="w-full bg-gray-50 grid grid-cols-2 gap-x-5 p-8">
        <div className="space-y-12">
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

        <div className="space-y-12">
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
    <div className="bg-black hover:bg-main hover:text-black w-64 h-60 hover:rounded text-white space-y-4 p-8 transition-colors duration-300 ease-in-out">
      <div className="w-20 h-20 rounded text-main bg-white flex items-center justify-center text-4xl">
        {icon}
      </div>
      <p className="text-xl">{title}</p>
      <p className="text-5xl font-bold">{count}</p>
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
