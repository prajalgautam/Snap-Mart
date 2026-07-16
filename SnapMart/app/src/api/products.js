import config from "@/config";
import axios from "axios";
import api from "./api";
import { formatParams } from "@/helpers/params";
import { filterProducts, SAMPLE_PRODUCTS, SAMPLE_CATEGORIES, SAMPLE_BRANDS } from "./mockData";

const http = axios.create({ timeout: 3000 });

export const getProducts = async (searchParams = {}) => {
  // If no API URL, use mock data instantly
  if (!config.apiUrl) {
    return filterProducts(searchParams);
  }

  const query = formatParams({
    ...searchParams,
    limit: searchParams?.limit || 100,
  });

  try {
    const response = await http.get(`${config.apiUrl}/api/products?${query}`);
    return response.data;
  } catch {
    return filterProducts(searchParams);
  }
};

export const getProductById = async (id) => {
  // Check mock data first
  const mockProduct = SAMPLE_PRODUCTS.find((p) => p._id === id);
  if (!config.apiUrl) return mockProduct || null;

  try {
    const response = await http.get(`${config.apiUrl}/api/products/${id}`);
    return response.data;
  } catch {
    return mockProduct || null;
  }
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
  if (!config.apiUrl) return SAMPLE_CATEGORIES;

  try {
    const response = await http.get(`${config.apiUrl}/api/products/categories`);
    return response.data;
  } catch {
    return SAMPLE_CATEGORIES;
  }
};

export const getBrands = async () => {
  if (!config.apiUrl) return SAMPLE_BRANDS;

  try {
    const response = await http.get(`${config.apiUrl}/api/products/brands`);
    return response.data;
  } catch {
    return SAMPLE_BRANDS;
  }
};
