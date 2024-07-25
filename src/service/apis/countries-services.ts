import request from "../base.service";

export interface ICountry {
  country_id: string;
  name: string;
  alpha_2: string;
  alpha_3: string;
  phone_code: string;
  createdAt: Date;
  updatedAt: Date;
}

export const getAllCountries = async () => await request.get(`country`);

export const getOneCountry = async (country_id: string) =>
  await request.get(`country/${country_id}`);
