import request from "../base.service";

export interface IPage {
  page: number;
  pageSize: number;
}

export interface IProduct {
  product_id: string;
  name: string;
  description: string;
  category_id: string;
  image_url: string;
  image_id: string;
  user_id: string;
  slug: string;
  tags: string;
  status: number;
  in_stock: number;
  createdAt: Date;
  updatedAt: Date;
}

export const getAllProducts = async (params?: string) =>
  await request.get(`product/${params}`);

export const getOneProduct = async (productId: string) =>
  await request.get(`product/${productId}`);
