import bcrypt from "bcrypt";
import { ROLE_ADMIN, ROLE_SUPER_ADMIN } from "../constants/roles.js";
import User from "../models/User.js";
import uploadFile from "../utils/fileUploader.js";
import authService from "./auth.service.js";

const getAll = async (query) => {
  const permittedSortFields = new Set(["name", "email", "phone", "createdAt"]);
  const requestedSort = query.sort ? JSON.parse(query.sort) : {};
  const sort = Object.fromEntries(Object.entries(requestedSort).filter(([field, direction]) => permittedSortFields.has(field) && (direction === 1 || direction === -1)));
  const limit = Math.min(Math.max(Number.parseInt(query.limit, 10) || 10, 1), 100);
  const offset = Math.max(Number.parseInt(query.offset, 10) || 0, 0);

  const filters = {};

  const { name, email, phone } = query;

  const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  if (name) filters.name = { $regex: escapeRegex(name), $options: "i" };
  if (email) filters.email = { $regex: escapeRegex(email), $options: "i" };
  if (phone) filters.phone = { $regex: escapeRegex(phone), $options: "i" };

  return await User.find(filters).sort(sort).limit(limit).skip(offset);
};

const getById = async (id, authUser) => {
  if (authUser._id !== id && !authUser.roles.includes(ROLE_ADMIN)) {
    throw {
      status: 403,
      message: "Access denied.",
    };
  }

  return await User.findById(id);
};

const createUser = async (data) => {
  return await authService.register(data);
};

const updateUser = async (id, data, authUser) => {
  if (authUser._id !== id && !authUser.roles.includes(ROLE_ADMIN)) {
    throw {
      status: 403,
      message: "Access denied.",
    };
  }

  const updateFields = Object.fromEntries(Object.entries({ name: data?.name, phone: data?.phone, address: data?.address, isActive: data?.isActive, shopName: data?.shopName, shopCategory: data?.shopCategory }).filter(([, value]) => value !== undefined));

  // If password is provided, hash it before saving
  if (data?.password) {
    const salt = bcrypt.genSaltSync(10);
    updateFields.password = bcrypt.hashSync(data.password, salt);
  }

  const user = await User.findByIdAndUpdate(id, updateFields, { new: true, runValidators: true });
  if (!user) throw { status: 404, message: "User not found." };

  return {
    _id: user._id, name: user.name, email: user.email, phone: user.phone,
    address: user.address, isActive: user.isActive, roles: user.roles,
    profileImageUrl: user.profileImageUrl, shopName: user.shopName,
    shopCategory: user.shopCategory,
  };
};

const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);

  return "User deleted successfully.";
};

const updateProfileImage = async (id, file) => {
  const uploadedFiles = await uploadFile([file]);

  return await User.findByIdAndUpdate(
    id,
    {
      profileImageUrl: uploadedFiles[0].url,
    },
    { returnDocument: "after" },
  );
};

const updateUserRoles = async (id, roles, authUser) => {
  if (
    (roles.includes(ROLE_ADMIN) || roles.includes(ROLE_SUPER_ADMIN)) &&
    !authUser.roles.includes(ROLE_SUPER_ADMIN)
  ) {
    throw {
      status: 403,
      message: "Access denied.",
    };
  }

  return await User.findByIdAndUpdate(
    id,
    { roles },
    { returnDocument: "after" },
  );
};

export default {
  createUser,
  getAll,
  getById,
  updateUser,
  deleteUser,
  updateProfileImage,
  updateUserRoles,
};
