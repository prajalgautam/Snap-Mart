import config from "@/config";
import axios from "axios";
import api from "./api";
import { formatParams } from "@/helpers/params";
import {
  filterProducts,
  SAMPLE_PRODUCTS,
  SAMPLE_CATEGORIES,
  SAMPLE_BRANDS,
  getMockProducts,
  saveMockProducts,
} from "./mockData";

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
  const products = getMockProducts();
  const mockProduct = products.find((p) => p._id === id);
  if (!config.apiUrl) return mockProduct || null;

  try {
    const response = await http.get(`${config.apiUrl}/api/products/${id}`);
    return response.data;
  } catch {
    return mockProduct || null;
  }
};

export const addProduct = async (data) => {
  if (!config.apiUrl) {
    const products = getMockProducts();
    const parsed = {};
    if (typeof window !== "undefined" && window.FormData && data instanceof FormData) {
      parsed.name = data.get("name");
      parsed.brand = data.get("brand");
      parsed.category = data.get("category");
      parsed.price = Number(data.get("price"));
      parsed.stock = Number(data.get("stock"));
      parsed.description = data.get("description") || "";
    } else {
      Object.assign(parsed, data);
    }

    let createdBy = "mock-user-merchant";
    try {
      const auth = localStorage.getItem("zustand:auth-storage");
      if (auth) {
        const parsedAuth = JSON.parse(auth);
        if (parsedAuth?.state?.user?._id) {
          createdBy = parsedAuth.state.user._id;
        }
      }
    } catch {}

    const newProduct = {
      _id: `prod-${Date.now()}`,
      name: parsed.name,
      brand: parsed.brand,
      category: parsed.category,
      price: parsed.price,
      stock: parsed.stock,
      description: parsed.description,
      imageUrls: [
        `https://picsum.photos/seed/snapmart-${Math.random().toString(36).substring(7)}/400/300`
      ],
      createdAt: new Date().toISOString(),
      createdBy,
    };

    products.unshift(newProduct);
    saveMockProducts(products);
    return { data: newProduct };
  }

  return await api.post(`/api/products`, data);
};

export const updateProduct = async (id, data) => {
  if (!config.apiUrl) {
    const products = getMockProducts();
    const idx = products.findIndex((p) => p._id === id);
    if (idx !== -1) {
      const parsed = {};
      if (typeof window !== "undefined" && window.FormData && data instanceof FormData) {
        parsed.name = data.get("name");
        parsed.brand = data.get("brand");
        parsed.category = data.get("category");
        parsed.price = Number(data.get("price"));
        parsed.stock = Number(data.get("stock"));
        parsed.description = data.get("description") || "";
      } else {
        Object.assign(parsed, data);
      }

      products[idx] = {
        ...products[idx],
        ...parsed,
      };
      saveMockProducts(products);
      return { data: products[idx] };
    }
    return { data: null };
  }

  return await api.put(`/api/products/${id}`, data);
};

export const deleteProduct = async (id) => {
  if (!config.apiUrl) {
    const products = getMockProducts();
    const updated = products.filter((p) => p._id !== id);
    saveMockProducts(updated);
    return { data: { message: "Product deleted successfully." } };
  }

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
