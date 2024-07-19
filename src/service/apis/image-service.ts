import request from "../base.service";

const PATH = "image/";

export const PRODUCT_FOLDER = "/product";
export const PROFILE_FOLDER = "/profile";

export interface ICreateImage {
  images: string[];
  folder: string;
}

export const uploadImages = async (data: ICreateImage[]) =>
  await request.post(`${PATH}upload`, data);
