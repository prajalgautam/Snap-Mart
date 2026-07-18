import express from "express";

import productController from "../controllers/product.controller.js";
import logger from "../middlewares/logger.js";
import auth from "../middlewares/auth.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import { ROLE_ADMIN, ROLE_MERCHANT } from "../constants/roles.js";
import validate from "../middlewares/validator.js";
import { productSchema, productUpdateSchema } from "../libs/schemas/product.schema.js";
import validateObjectId from "../middlewares/objectId.js";

const router = express.Router();

router.get("/", productController.getAllProducts);

router.get("/brands", productController.getBrands);

router.get("/categories", productController.getCategories);

router.get("/count", productController.getTotalCount);

// Dynamic route (:param)
router.get("/:id", validateObjectId(), productController.getProductById);

router.post(
  "/",
  auth,
  roleBasedAuth(ROLE_MERCHANT, ROLE_ADMIN),
  validate(productSchema),
  productController.createProduct,
);

router.put(
  "/:id",
  auth,
  validateObjectId(),
  roleBasedAuth(ROLE_MERCHANT, ROLE_ADMIN),
  validate(productUpdateSchema),
  productController.updateProduct,
);

router.delete(
  "/:id",
  auth,
  validateObjectId(),
  roleBasedAuth(ROLE_MERCHANT, ROLE_ADMIN),
  productController.deleteProduct,
);

export default router;
