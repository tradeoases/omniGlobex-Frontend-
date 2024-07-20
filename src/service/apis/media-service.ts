import request from "../base.service";

const PATH = "/image/";

export interface IUPloadFile {
  images: string[];
  folder: string;
}

export const uploadFile = async (data: IUPloadFile) =>
  await request.post(`${PATH}upload`, data);
