export interface ICreateProduct {
  name: string;
  description: string;
  categoryId: string;
  productPrice: string;
  priceCurrency: string;
  showRooms?: string[];
  brandId?: string;
  productImages?: string[];
  coverImage?: string;
}

export const productDetailNavs = [`Description`, `Reviews`, `Seller Info`];
