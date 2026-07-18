import z from "zod";

export const productSchema = z.object({
  name: z.string().trim().min(3).max(50),
  brand: z.string().optional(),
  category: z.string().trim().min(1).max(100),
  price: z.coerce.number().finite().min(1).max(1000000),
  stock: z.coerce.number().int().min(0).max(1000000).default(1),
  description: z.string().trim().max(5000).optional(),
}).strict();

export const productUpdateSchema = z.object({
  name: z.string().trim().min(3).max(50).optional(),
  brand: z.string().optional(),
  category: z.string().trim().min(1).max(100).optional(),
  price: z.coerce.number().finite().min(1).max(1000000).optional(),
  stock: z.coerce.number().int().min(0).max(1000000).optional(),
  description: z.string().trim().max(5000).optional(),
}).strict();
