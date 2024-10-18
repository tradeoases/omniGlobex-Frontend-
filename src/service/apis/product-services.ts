/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICreateProduct } from "@/data/product-data";
import request from "../base.service";

const PATH = "/product/";
export interface IPage {
  page: number;
  pageSize: number;
}

export interface IProduct {
  product_id: string;
  name: string;
  product_price: number;
  price_currency: string;
  description: string;
  products: string;
  delivery_terms: string;
  productImages: {image_id: string; image_url: string; thumbnail_url:string}[]
  category_id: string;
  cover_image?: {
    image_url: string;
    thumbnail_url: string;
  };
  user_id: string;
  slug: string;
  tags: string;
  status: number;
  in_stock: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProductCategory {
  category_id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface SellerInfo {
  fullname: string;
  location: string;
  rating: number;
  totalProducts: number;
  categories: string[];
}

export const getAllProducts = async (params: string) => {
  return await request.get(`${PATH}${params}`);
};

export const getOneProduct = async (productId: string) =>
  await request.get(`${PATH}${productId}`);

export const getAllProductByUser = async () => await request.get(`${PATH}user`);

export const getAllProductCategories = async () =>
  await request.get(`/category`);

export const createProduct = async (data: ICreateProduct) =>
  await request.post(`/product/`, data);
export const updateProduct = async (productId: string, data: any) =>
  await request.put(`${PATH}${productId}`, data);
