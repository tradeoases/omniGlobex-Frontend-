import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "The description is required"),
  categoryId: z.string().min(1, "The category is required"),
  productPrice: z.string().min(1, "Price is required"),
  priceCurrency: z.string().min(1, "The currency is required"),
  deliveryTerms: z
    .string()
    .min(1, "You are required to enter the delivery terms"),
  // showRooms: z.array(z.string().uuid("Must be a valid UUID")).optional(),
  // brandId: z.string().uuid().optional(),
});
