import z from "zod";

import { userSchema } from "./user.schema.js";
import { emailRegex } from "../../constants/regex.js";

export const loginSchema = z
  .object({
    email: z
      .string()
      .regex(emailRegex, { message: "Invalid email address." })
      .optional(),
    phone: z.string().optional(),
    password: z.string(),
  })
  .refine((data) => data.email || data.phone, {
    message: "Either email or phone is required.",
    path: ["email", "phone"],
  });

export const registerSchema = userSchema;

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .regex(emailRegex, { message: "Invalid email address." }),
});

export const resetPasswordSchema = z.object({
  password: z.string(),
  userId: z.string(),
  token: z.string(),
});
