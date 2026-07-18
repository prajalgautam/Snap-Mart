import z from "zod";

export const createOrderSchema = z.object({
  orderItems: z.array(z.object({ product: z.string().regex(/^[a-f\d]{24}$/i, "Invalid product id."), quantity: z.coerce.number().int().min(1).max(100) })).min(1),
  shippingAddress: z.object({ city: z.string().trim().min(1).max(100), province: z.string().trim().max(100).optional(), street: z.string().trim().max(200).optional(), country: z.string().trim().max(100).optional() }).optional(),
}).strict();

export const orderStatusSchema = z.object({ status: z.enum(["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"]) }).strict();

export const paymentConfirmationSchema = z.object({ status: z.string().max(30).optional() }).strict();
