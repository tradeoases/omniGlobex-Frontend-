import request from "../base.service";

const   PATH = "order/";

export interface ICreateOrder {
  product_id: string;
  status: string;
  quantity: number;
  image_url: string;
  name: string;
  description: string;
}

export const createOrder = async (data: ICreateOrder) => {
    request.post(PATH+"create", data);
}