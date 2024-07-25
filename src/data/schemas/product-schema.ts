import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "product name is required"),
  description: z.string().min(1, "the description is required"),
  category_id: z.string().min(1, "the category is required"),
  price: z.number().min(1, "price is required"),
  previous_price: z.number().min(1, "previous price is required"),
  currency: z.string().min(1, "the currency is required"),
});
