/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { LuChevronRight } from "react-icons/lu";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse, HttpStatusCode } from "axios";
import { getAllCountries } from "@/service/apis/countries-services";

export const GameSectionSidebar = () => {
  const {
    data: countries,
    isError: isCountryError,
    error: countryError,
    isLoading: countryLoading,
    isSuccess: countrySuccess,
  } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const response: AxiosResponse<any, any> = await getAllCountries();
      if (response.status === HttpStatusCode.Ok) {
        return response.data.data;
      }
    },
  });

  console.log({ countries });

  return (
    <div className="w-full p-8 rounded-xl shadow bg-gray-900">
      <div className="space-y-6">
        <p className="text-base text-white font-bold">Mobile & Tablet</p>

        <div className="space-y-4">
          {countrySuccess &&
            countries?.splice(0, 5).map((country: any) => (
              <Link
                to={`/products/?country=${country.country_id}`}
                key={country.country_id}
                className="text-gray-400 hover:underline block"
              >
                {country.name}
              </Link>
            ))}
          {countryLoading && <div>Loading country showrooms...</div>}
          {isCountryError && (
            <div>
              <h1>An error occured while loading showrooms</h1>
              <h3>{countryError.message}</h3>
            </div>
          )}
          <p className="font-bold text-white flex items-center gap-4">
            <span>Shop Now </span>
            <LuChevronRight />
          </p>
        </div>
      </div>
    </div>
  );
};
