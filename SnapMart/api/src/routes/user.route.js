import express from "express";

import userController from "../controllers/user.controller.js";
import { ROLE_ADMIN } from "../constants/roles.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";
import validateObjectId from "../middlewares/objectId.js";
import validate from "../middlewares/validator.js";
import { userSchema, userUpdateSchema, rolesUpdateSchema } from "../libs/schemas/user.schema.js";

const router = express.Router();

router.get("/", roleBasedAuth(ROLE_ADMIN), userController.getAllUsers);

router.put("/profile-image", userController.updateProfileImage);

router.get("/:id", validateObjectId(), userController.getById);

router.post("/", roleBasedAuth(ROLE_ADMIN), validate(userSchema), userController.createUser);

router.put("/:id", validateObjectId(), validate(userUpdateSchema), userController.updateUser);

router.delete("/:id", validateObjectId(), roleBasedAuth(ROLE_ADMIN), userController.deleteUser);

router.patch("/:id/roles", validateObjectId(), roleBasedAuth(ROLE_ADMIN), validate(rolesUpdateSchema), userController.updateUserRoles);

export default router;
