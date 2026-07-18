import z from "zod";

import { userSchema } from "./user.schema.js";
import { emailRegex, passwordRegex } from "../../constants/regex.js";

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
}).strict();

export const resetPasswordSchema = z.object({
  password: z.string().min(6).regex(passwordRegex, { message: "Password must contain uppercase, lowercase, number and special characters." }),
  userId: z.string().regex(/^[a-f\d]{24}$/i, "Invalid user id."),
  token: z.string().uuid(),
}).strict();
