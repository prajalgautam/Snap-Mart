import bcrypt from "bcrypt";
import { ROLE_ADMIN, ROLE_SUPER_ADMIN } from "../constants/roles.js";
import User from "../models/User.js";
import uploadFile from "../utils/fileUploader.js";
import authService from "./auth.service.js";

const getAll = async (query) => {
  const sort = query.sort ? JSON.parse(query.sort) : {};
  const limit = query.limit ?? 10;
  const offset = query.offset ?? 0;

  const filters = {};

  const { name, email, phone } = query;

  if (name) filters.name = { $regex: name, $options: "i" };
  if (email) filters.email = { $regex: email, $options: "i" };
  if (phone) filters.phone = { $regex: phone, $options: "i" };

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

  const updateFields = {
    name: data?.name,
    phone: data?.phone,
    address: data?.address,
    isActive: data?.isActive,
    shopName: data?.shopName,
    shopCategory: data?.shopCategory,
  };

  // If password is provided, hash it before saving
  if (data?.password) {
    const salt = bcrypt.genSaltSync(10);
    updateFields.password = bcrypt.hashSync(data.password, salt);
  }

  return await User.findByIdAndUpdate(id, updateFields, {
    returnDocument: "after",
  });
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
