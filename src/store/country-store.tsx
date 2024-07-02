import { ICountry } from "@/service/apis/countries-services";
import { RecoilState, atom } from "recoil";

export const AllCountriesStore: RecoilState<ICountry[] | null> = atom<
  ICountry[] | null
>({
  key: "all-countries-store",
  default: null,
});
