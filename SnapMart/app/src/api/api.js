"use client";

import config from "@/config";
import axios from "axios";

const api = axios.create({
  baseURL: config.apiUrl,
  timeout: 5000,
});

api.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("authToken");

    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
