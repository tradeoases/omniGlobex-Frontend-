import { UnderConstruction } from "@/components/under-construction";
import { getUserInfo } from "@/service/apis/user-services";
import { IUser } from "@/store/user-store";
import { useQuery } from "@tanstack/react-query";
import { HttpStatusCode } from "axios";

const StoreFrontPreview = () => {
  const {
    data: user,
    isSuccess: isUserSuccess,
    error: userError,
    isLoading: userLoading,
    isError: isUserError,
  } = useQuery({
    queryKey: ["personal"],
    queryFn: async () => {
      const res = await getUserInfo();
      if (res.status === HttpStatusCode.Ok) {
        return res.data.data as IUser;
      }
    },
  });

  console.log({
    data: user,
    isSuccess: isUserSuccess,
    error: userError,
    isLoading: userLoading,
    isError: isUserError,
  });

  return (
    <div className="h-full w-full ">
      {isUserSuccess && (
        <>
          <div className="p-0 m-0 bg-slate-300 z-0 h-64 w-full">
            <img
              className="m-0 p-0 h-full w-full"
              src={
                user?.profileImages.find((r) => r.image_for === "LOGO")
                  ?.image_url
              }
              alt={`${user?.business_name} - LOGO`}
            />
          </div>
          <div className="h-24 w-24 rounded-full p-0 z-10 bg-slate-400 -m-12 mx-4">
            <img
              src={
                user?.profileImages.find((pi) => pi.image_for === "PROFILE")
                  ?.image_url
              }
              className="p-0 w-full h-full rounded-full"
            />
          </div>
          <div className="p-0 m-0 bg-transparent mt-14 z-0 w-full">
            <div className="m-0 p-0 bg-slate-100 py-2">
              <h1 className="text-2xl font-bold">{user?.business_name}</h1>
              <h3 className="text-lg font-bold">
                {user?.profile.address} - {user?.profile.city}, {}
              </h3>
              <h4 className="font-bold">
                Number of Employees: {user?.profile.number_of_employees}
              </h4>
            </div>
            <div className="mt-8">
              <h1 className="text-2xl font-bold">Contact Details</h1>
              <h4>Phone number: {user?.profile.phonenumber}</h4>
              <h4>Email: {user?.email}</h4>
            </div>
            <div className="p-0 m-0 bg-slate-100 bg-transparent mt-14 z-0 w-full">
              <h1 className="text-2xl font-bold">Consortiums</h1>
              <UnderConstruction />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Products</h1>
              <UnderConstruction />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StoreFrontPreview;
