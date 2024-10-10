import { getOneCountry } from "@/service/apis/countries-services";
import { useQuery } from "@tanstack/react-query";

const CountryHeader = ({ country_id }) => {
  // Use TanStack Query to fetch country data
  const { data, isLoading, isError } = useQuery({
    queryKey: ["fetchCountry", country_id],
    queryFn: () => getOneCountry(country_id), // Pass country_id to the function
  });
  console.log({ data });
  // Handle loading state
  if (isLoading) return <div>Loading country details...</div>;

  // Handle error state
  if (isError) return <div>Failed to load country details</div>;

  // Render country-specific data once fetched
  return (
    <div className="bg-blue-600 text-white py-6 px-4 lg:px-12 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">{data?.data}</h1>
        <p className="mt-2">Welcome to the {data?.name} showroom</p>
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