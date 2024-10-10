import { getOneCountry } from "@/service/apis/countries-services";
import { useQuery } from "@tanstack/react-query";
import { HttpStatusCode } from "axios";

const CountryHeader = ({ country_id }: { country_id: string }) => {
  // Use TanStack Query to fetch country data
  const { data, isLoading, isError } = useQuery({
    queryKey: ["fetchCountry", country_id],
    queryFn: async () => {
      const res = await getOneCountry(country_id);
      if (res.status === HttpStatusCode.Ok) {
        return res.data.data;
      }
    },
  });
  if (isLoading) return <div>Loading country details...</div>;

  if (isError) return <div>Failed to load country details</div>;

  return (
    <div className="bg-blue-600 text-white py-6 px-4 lg:px-12 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">
          Welcome to the {data?.name} showroom
        </h1>
      </div>
      <div>
        {/* Display the country flag if available */}
        {/* {data?.flagUrl && (
          <img
            src={data.flagUrl}
            alt={`${data.name} flag`}
            className="w-16 h-16 object-cover"
          />
        )} */}
      </div>
    </div>
  );
};

export default CountryHeader;
