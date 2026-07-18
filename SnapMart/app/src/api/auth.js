import api from "./api";

export const login = async (data) => {
  return await api.post(`/api/auth/login`, data);
};

export const signup = async (data) => {
  return await api.post(`/api/auth/register`, data);
};

export const forgotPassword = async (data) => {
  return await api.post(`/api/auth/forgot-password`, data);
};

export const resetPassword = async (data) => {
  return await api.post(`/api/auth/reset-password`, data);
};
