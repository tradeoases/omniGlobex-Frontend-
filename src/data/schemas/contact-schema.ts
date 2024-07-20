import { z } from "zod";

export const getInTouchSchema = z
  .object({
    name: z.string().min(1, { message: `name required` }),
    email: z.string().min(1, { message: `email required` }),
    subject: z.string().min(1, { message: `subject required` }),
    message: z.string().min(1, { message: `message required` }),
  })
  .required();
