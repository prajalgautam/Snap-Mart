import api from "./api";
import { formatParams } from "@/helpers/params";

export const getProducts = async (searchParams = {}) => {
  const query = formatParams({
    ...searchParams,
    limit: searchParams?.limit || 100,
  });

  const response = await api.get(`/api/products?${query}`);
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/api/products/${id}`);
  return response.data;
};

export const addProduct = async (data) => {
  return await api.post(`/api/products`, data);
};

export const updateProduct = async (id, data) => {
  return await api.put(`/api/products/${id}`, data);
};

export const deleteProduct = async (id) => {
  return await api.delete(`/api/products/${id}`);
};

export const getCategories = async () => {
  const response = await api.get(`/api/products/categories`);
  return response.data;
};

export const getBrands = async () => {
  const response = await api.get(`/api/products/brands`);
  return response.data;
};
