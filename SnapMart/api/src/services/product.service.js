import { PRODUCT_DESCRIPTION_PROMPT } from "../constants/prompt.js";
import { ROLE_ADMIN } from "../constants/roles.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import promptAI from "../utils/ai.js";
import uploadFile from "../utils/fileUploader.js";

const createUniqueSlug = async (name, excludeId) => {
  const base = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || "product";
  const matches = await Product.find({
    slug: { $regex: `^${base}(?:-\\d+)?$`, $options: "i" },
    ...(excludeId && { _id: { $ne: excludeId } }),
  }).select("slug").lean();
  const used = new Set(matches.map((product) => product.slug));
  if (!used.has(base)) return base;
  let suffix = 2;
  while (used.has(`${base}-${suffix}`)) suffix += 1;
  return `${base}-${suffix}`;
};

const getAllProducts = async (query) => {
  const permittedSortFields = new Set(["name", "price", "stock", "createdAt"]);
  const requestedSort = query?.sort ? JSON.parse(query.sort) : {};
  const sort = Object.fromEntries(Object.entries(requestedSort).filter(([field, direction]) => permittedSortFields.has(field) && (direction === 1 || direction === -1)));
  const limit = Math.min(Math.max(Number.parseInt(query?.limit, 10) || 10, 1), 100);
  const offset = Math.max(Number.parseInt(query?.offset, 10) || 0, 0);

  const filters = {};

  const { category, brands, name, min, max, createdBy } = query;

  if (category) filters.category = category;
  if (brands) filters.brand = { $in: brands.split(",") };
  if (name) filters.name = { $regex: name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), $options: "i" };
  if (min) filters.price = { $gte: min };
  if (max) filters.price = { ...filters.price, $lte: max };
  if (createdBy) filters.createdBy = createdBy;

  const products = await Product.find(filters)
    .sort(sort)
    .limit(limit)
    .skip(offset);

  return products;
};

const getProductById = async (id) => {
  const product = await Product.findById(id);

  return product;
};

const createProduct = async (data, files, userId) => {
  const uploadedFiles = await uploadFile(files);

  const promptMessage = PRODUCT_DESCRIPTION_PROMPT.replace("%s", data.name)
    .replace("%s", data.category)
    .replace("%s", data.brand);

  let description = data.description;
  if (!description) {
    try {
      description = await promptAI(promptMessage);
    } catch (error) {
      console.warn("AI product description generation failed; creating product without it.", error.message);
    }
  }

  return await Product.create({
    ...data,
    slug: await createUniqueSlug(data.name),
    description,
    imageUrls: uploadedFiles.map((file) => file.url),
    createdBy: userId,
  });
};

const assertProductOwner = async (id, authUser) => {
  const product = await getProductById(id);
  if (!product) throw { status: 404, message: "Product not found." };
  if (authUser._id.toString() !== product.createdBy.toString() && !authUser.roles.includes(ROLE_ADMIN)) throw { status: 403, message: "Access denied." };
  return product;
};

const updateProduct = async (id, input, files, authUser) => {
  await assertProductOwner(id, authUser);
  const updateData = { ...input };
  if (input.name) updateData.slug = await createUniqueSlug(input.name, id);

  if (files && files.length > 0) {
    const uploadedFiles = await uploadFile(files);

    updateData.imageUrls = uploadedFiles.map((file) => file.url);
  }

  return await Product.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
};

const deleteProduct = async (id, authUser) => {
  await assertProductOwner(id, authUser);

  if (await Order.exists({ "orderItems.product": id })) {
    throw { status: 409, message: "Products with existing orders cannot be deleted." };
  }

  await Product.findByIdAndDelete(id);
};

const getBrands = async () => {
  return await Product.distinct("brand");
};

const getCategories = async () => {
  return await Product.distinct("category");
};

const getTotalCount = async () => {
  return await Product.countDocuments();
};

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getBrands,
  getCategories,
  getTotalCount,
};
