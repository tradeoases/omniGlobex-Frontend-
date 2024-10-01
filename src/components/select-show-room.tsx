/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse, HttpStatusCode } from "axios";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCountries, ICountry } from "@/service/apis/countries-services";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { AllCountriesStore } from "@/store/country-store";

export const SelectShowroom = () => {
  const [countries, setCountries] = useRecoilState<ICountry[] | null>(
    AllCountriesStore
  );

  const navigate = useNavigate();

  const fetchAllCountries = async () => {
    try {
      const response: AxiosResponse<any, any> = await getAllCountries();
      if (response.status === HttpStatusCode.Ok) {
        setCountries(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!countries) fetchAllCountries();
  }, []);

  const handleSelectChange = (value: string) => {
    const country = countries?.find(
      (country) => country.country_id === value
    )?.name;
    if (country) {
      navigate(`/show-room/?country=${country}`);
    }
  };

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
