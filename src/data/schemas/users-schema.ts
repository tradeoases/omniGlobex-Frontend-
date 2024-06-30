import { z } from "zod";

export const createSellerSchema = z
  .object({
    firstname: z.string().min(2, {
      message: "first name must be at least 2 characters.",
    }),

    lastname: z.string().min(2, {
      message: "last name must be at least 2 characters.",
    }),

    country_id: z.string().uuid({ message: "invalid" }),

    email: z.string().email("Invalid email"),

    address: z.string().min(2, {
      message: "address must be at least 2 characters.",
    }),

    city: z.string().min(2, {
      message: "city must be at least 2 characters.",
    }),

    phonenumber: z.string().min(10, {
      message: "phone number must be at least 10 characters.",
    }),
    shopName: z.string().min(3, {
      message: "Shop name must be at least 3 characters.",
    }),
    shopAddress: z.string().min(2, {
      message: "Shop address must be at least 2 characters.",
    }),

    password: z.string().min(8, "Password must be at least 8 characters"),

    confirmPassword: z
      .string()
      .min(8, "password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string(),
});
