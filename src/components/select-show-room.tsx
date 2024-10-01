import { useNavigate } from "react-router-dom";
import { getAllCountries, ICountry } from "@/service/apis/countries-services";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useQuery } from "@tanstack/react-query";

export const SelectShowroom = () => {
  const {
    data: countries,
    isSuccess,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const response = await getAllCountries();
      if (response.status === 200) {
        return response.data.data as ICountry[];
      }
    },
  });

  const navigate = useNavigate();

  const handleSelectChange = (value: string) => {
    if (isSuccess) {
      const country = countries?.find(
        (country) => country.country_id === value
      )?.name;
      if (country) {
        navigate(`/show-room/?country=${country}`);
      }
    }
  };

  if(isLoading) return <div></div>
  if(isError) return <div></div>

  return (
    <Select onValueChange={handleSelectChange}>
      <SelectTrigger className="w-full h-10 md:h-8 lg:h-6 px-4 md:px-3 lg:px-2 text-sm md:text-xs bg-light border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500">
        <SelectValue placeholder="Select Showroom" />
      </SelectTrigger>
      <SelectContent className="bg-white shadow-lg rounded-md">
        {countries && countries.length > 0 ? (
          countries.map((country) => (
            <SelectItem key={country.country_id} value={country.country_id}>
              {country.name}
            </SelectItem>
          ))
        ) : (
          <SelectItem value="none" disabled>
            No countries available
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
};
