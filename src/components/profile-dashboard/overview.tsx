import { IUser } from "@/store/user-store";
import { INewOrder } from "@/store/order-store";
// import { FaShippingFast } from "react-icons/fa";
// import { FaCartArrowDown, FaUserGear } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/service/apis/user-services";

interface Props {
  userData: IUser | null;
  newOrderData: INewOrder[];
}
export const Overview: React.FC<Props> = () => {
  const {
    data: personalInfo,
    isLoading: personalInfoLoading,
    isSuccess: isSuccessPersonal,
    isError: personalInfoErrored,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const response = await getUserInfo();
      if (response.status === 200) {
        const finalUserData = response.data.data;
        console.log({finalUserData})
        const personalInfo = [
          { key: "Name", value: finalUserData?.fullname || "N/A" },
          { key: "Email", value: finalUserData?.email || "N/A" },
          { key: "Phone", value: finalUserData?.phonenumber || "N/A" },
          { key: "City", value: finalUserData?.city || "N/A" },
          { key: "Address", value: finalUserData?.address || "N/A" },
        ];
        return personalInfo;
      }
    },
  });

  // const newOrders: INewOrder[] = [
  //   { title: "New Order", count: 654, icon: <FaCartArrowDown /> },
  //   { title: "New Order", count: 654, icon: <FaShippingFast /> },
  //   { title: "New Order", count: 654, icon: <FaUserGear /> },
  // ];

  return (
    <div className="col-span-3 space-y-6">
      <div>
        {/* <p className="text-base">Hello, {personalInfo?.Name}</p> */}
        <p className="text-xl font-semibold">Welcome to your Profile</p>
      </div>

      <div className="grid mx-auto w-full grid-cols-3 gap-x-2 md:gap-x-8">
        {/* {newOrders.map((order, i) => (
          <NewOrderBoard key={i} {...order} />
        ))} */}
      </div>

      <div className="w-full bg-gray-50 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-5 lg:p-8">
        <div className="space-y-4 md:space-y-12">
          <p className="text-xl font-semibold">Personal Information</p>

          <div className="space-y-4">
            {personalInfoLoading && <div>Personal Information loading...</div>}
            {personalInfoErrored && <div>Failed to load persoanl information</div>}
            {isSuccessPersonal &&
              personalInfo?.map((info, i) => (
                <div className="text-base grid grid-cols-4" key={i}>
                  <span className="text-gray-400 col-span-1">{info.key}:</span>
                  <span className="col-span-3">{info.value}</span>
                </div>
              ))}
              {}
          </div>
        </div>

        <div className="space-y-4 md:space-y-12">
          <p className="text-xl font-semibold">Business Information</p>

          <div className="space-y-4">
            {isSuccessPersonal &&
              personalInfo?.map((info, i) => (
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

// const NewOrderBoard: React.FC<INewOrder> = ({ count, title, icon }) => {
//   return (
//     <div className="bg-black hover:bg-main hover:text-black xl:w-52 hover:rounded text-white space-y-4 p-2 md:p-8 transition-colors duration-300 ease-in-out">
//       <div className="xl:w-16 lg:w-16 h-20 rounded text-main bg-white flex items-center justify-center text-4xl">
//         {icon}
//       </div>
//       <p className="text-sm md:text-xl">{title}</p>
//       <p className="text-2xl text-center md:text-5xl font-bold">{count}</p>
//     </div>
//   );
// };
