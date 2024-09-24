import { getBusinesses } from "@/service/apis/business-services";
import { useQuery } from "@tanstack/react-query";

const BusinessPage = () => {
  const { data, isError, isSuccess, isLoading, error } = useQuery({
    queryKey: ["business"],
    queryFn: async () => {
      const data = await getBusinesses();
      if (data.status === 200) {
        return data.data.data;
      }
    },
  });

  console.log(data);

  if (isLoading) return <div>Loading...</div>;
  if (isError)
    return (
      <div>
        <div>Error occured while retrieving business</div>
        <div>{error.message}</div>
      </div>
    );

  return <div>{isSuccess && <div>
        
    </div>}</div>;
};

export default BusinessPage;
