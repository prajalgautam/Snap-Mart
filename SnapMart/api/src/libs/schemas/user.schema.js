import z from "zod";

import { emailRegex, passwordRegex } from "../../constants/regex.js";
import {
  ROLE_ADMIN,
  ROLE_CUSTOMER,
  ROLE_MERCHANT,
  ROLE_SUPER_ADMIN,
} from "../../constants/roles.js";

export const userSchema = z.object({
  name: z.string().trim().min(3).max(50),
  email: z
    .string()
    .min(3)
    .regex(emailRegex, { message: "Invalid email address." }),
  phone: z.string().min(5).max(15),
  password: z
    .string()
    .min(6)
    .regex(passwordRegex, {
      message:
        "Password must contain uppercase, lowercase, number and special characters.",
    }),
  isActive: z.boolean().default(true),
  roles: z
    .array(z.enum([ROLE_CUSTOMER, ROLE_MERCHANT, ROLE_ADMIN, ROLE_SUPER_ADMIN]))
    .default([ROLE_CUSTOMER]),
  address: z.object({
    city: z.string(),
    province: z.string().optional(),
    street: z.string().optional(),
    country: z.string().default("Nepal"),
  }),
  shopName: z.string().optional(),
  shopCategory: z.string().optional(),
});
