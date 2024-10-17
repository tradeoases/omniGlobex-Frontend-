import request from "../base.service";

export interface ICountry {
  country_id: string;
  name: string;
  alpha_2: string;
  alpha_3: string;
  phone_code: string;
  currency: string;
  currency_name: string;
  createdAt: Date;
  updatedAt: Date;
}

export const getAllCountries = async () => await request.get(`country`);

export const getOneCountry = async (country_id: string) =>
  await request.get(`country/${country_id}`);
export const getAllCountriesByContinent = async (continent: string) =>
  await request.get(`country/continent/${continent}`);

export const getAllShowrooms = async () => await request.get(`show-room/`);

export const getAllCurrencies = async () => await request.get(`currency/`);
