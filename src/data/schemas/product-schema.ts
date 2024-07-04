import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "product name is required"),
  description: z.string().min(1, "the description is required"),
  category_id: z.string().min(1, "the category is required"),
  //   image_url: z.string().min(1, "the image url  is required"),
  //   image_id: z.string().min(1, "the image id is required"),
});
