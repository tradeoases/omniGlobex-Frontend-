import { getSingleShowrooms } from "@/service/apis/countries-services";
import { useQuery } from "@tanstack/react-query";
import { HttpStatusCode } from "axios";

const CountryHeader = ({ country_id }: { country_id: string }) => {
  // Use TanStack Query to fetch country data
  const { data, isLoading, isError } = useQuery({
    queryKey: ["single-showroom", country_id],
    queryFn: async () => {
      const res = await getSingleShowrooms(country_id);
      if (res.status === HttpStatusCode.Ok) {
        return res.data.data;
      }
    },
  });

  if (isLoading) return <div>Loading country details...</div>;

  if (isError) return <div>Failed to load country details</div>;

  // Generate the CSS gradient from the flag colors
  const gradientColors = data?.flagColours
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ?.map((flag:any) => flag.colour.toLowerCase())
    .join(", ");

  return (
    <div
      className="py-6 px-4 lg:px-12 flex items-center justify-between"
      style={{
        background: `linear-gradient(to right, ${gradientColors})`, // Apply the gradient as background
      }}
    >
      <div>
        <h1 className="text-3xl font-bold text-white">
          Welcome to the {data?.showroom_name} showroom
        </h1>
      </div>
    </div>
  );
};

export default CountryHeader;
