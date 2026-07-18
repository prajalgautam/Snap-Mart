import express from "express";
import orderController from "../controllers/order.controller.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import {
  ROLE_ADMIN,
  ROLE_CUSTOMER,
  ROLE_MERCHANT,
} from "../constants/roles.js";
import validate from "../middlewares/validator.js";
import validateObjectId from "../middlewares/objectId.js";
import { createOrderSchema, orderStatusSchema, paymentConfirmationSchema } from "../libs/schemas/order.schema.js";

const router = express.Router();

router.get("/", roleBasedAuth(ROLE_ADMIN), orderController.getOrders);

router.get(
  "/user",
  roleBasedAuth(ROLE_CUSTOMER),
  orderController.getOrdersByUser,
);

router.get(
  "/merchant",
  roleBasedAuth(ROLE_MERCHANT),
  orderController.getOrdersByMerchant,
);

router.get("/:id", validateObjectId(), orderController.getOrderById);

router.post("/", roleBasedAuth(ROLE_CUSTOMER), validate(createOrderSchema), orderController.createOrder);

router.put(
  "/:id/status",
  validateObjectId(),
  roleBasedAuth(ROLE_ADMIN, ROLE_MERCHANT),
  validate(orderStatusSchema),
  orderController.updateOrderStatus,
);

router.patch(
  "/:id/cancel",
  validateObjectId(),
  roleBasedAuth(ROLE_CUSTOMER),
  orderController.cancelOrder,
);

router.put(
  "/:id/confirm",
  validateObjectId(),
  roleBasedAuth(ROLE_CUSTOMER),
  validate(paymentConfirmationSchema),
  orderController.confirmOrder,
);

router.put(
  "/:id/payment/cash",
  validateObjectId(),
  roleBasedAuth(ROLE_CUSTOMER),
  orderController.orderPaymentViaCash,
);

router.put(
  "/:id/payment/khalti",
  validateObjectId(),
  roleBasedAuth(ROLE_CUSTOMER),
  orderController.orderPaymentViaKhalti,
);

router.delete("/:id", validateObjectId(), roleBasedAuth(ROLE_ADMIN), orderController.deleteOrder);

export default router;
