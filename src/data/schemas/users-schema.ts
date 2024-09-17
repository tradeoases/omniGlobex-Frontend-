import { z } from "zod";

export const createSellerSchema = z
  .object({
    fullname: z.string().min(2, {
      message: "first name must be at least 2 characters.",
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
  email: z
    .string()
    .email({ message: "Invalid email" })
    .min(1, "Email required"),
  password: z.string().min(1, "Password is required"),
});

export const signupSchema = z
  .object({
    fullname: z.string().min(2, {
      message: "first name must be at least 2 characters.",
    }),

    terms: z.boolean().default(false).optional(),

    country_id: z.string().uuid({ message: "invalid" }),

    address: z.string().min(2, {
      message: "address must be at least 2 characters.",
    }),

    city: z.string().min(2, {
      message: "city must be at least 2 characters.",
    }),

    phonenumber: z.string().min(10, {
      message: "phone number must be at least 10 characters.",
    }),

    email: z.string().email("Invalid email"),

    password: z.string().min(8, "Password must be at least 8 characters"),

    confirmPassword: z
      .string()
      .min(8, "password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const personalInfoSchema = z.object({
  firstname: z.string().min(2, {
    message: "first name must be at least 2 characters.",
  }),
  lastname: z.string().min(2, {
    message: "last name must be at least 2 characters.",
  }),
  country_id: z.string().min(1, "country is required"),
  email: z.string().email("Invalid email"),
  phonenumber: z.string().min(10, {
    message: "phone number must be at least 10 characters.",
  }),
  address: z.string().min(2, {
    message: "address must be at least 2 characters.",
  }),
  town: z.string().min(2, {
    message: "town must be at least 2 characters.",
  }),

  postCode: z.string().min(2, {
    message: "pos code must be at least 2 characters.",
  }),
});

export const passwordResetSchema = z.object({
  oldPassword: z.string().min(1, "Old Password is required"),
  newPassword: z.string().min(1, "New Password is required"),
  confirmPassword: z.string().min(1, "Confirm Password is required"),
});
