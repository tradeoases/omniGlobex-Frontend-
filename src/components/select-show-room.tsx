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
    !countries && fetchAllCountries();
  }, []);

  const handleSelectChange = (value: string) => {
    const country = countries?.filter(
      (country) => country.country_id === value
    )[0].name;
    navigate(`/show-room/?country=${country}`);
  };
  return (
    <Select onValueChange={handleSelectChange}>
      <SelectTrigger className="w-full h-4 shadow-none px-0 focus:ring-0 focus:ring-offset-0 rounded-none border-none bg-light gap-x-1 text-xs focus-visible:ring-offset-0 focus-visible:border-none focus-visible:ring-0">
        <SelectValue placeholder="SHOWROOM" />
      </SelectTrigger>
      <SelectContent className="border-none rounded-none">
        {countries &&
          countries.map((country) => (
            <SelectItem key={country.country_id} value={country.country_id}>
              {country.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};
