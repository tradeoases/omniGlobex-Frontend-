export interface ICreateProduct {
  name?: string;
  description?: string;
  category_id?: string;
  image_url?: string;
  image_id?: string;
  showRooms: string[];
}

export const productDetailNavs = [`Description`, `Reviews`, `Seller Info`];
