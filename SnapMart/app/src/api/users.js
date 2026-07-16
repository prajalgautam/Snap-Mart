import config from "@/config";
import api from "./api";

export const getAllUsers = async () => {
  if (!config.apiUrl) return { data: [] };
  return await api.get(`/api/users`);
};

export const getUsersById = async (id) => {
  if (!config.apiUrl) return { data: null };
  return await api.get(`/api/users/${id}`);
};

export const updateUserRoles = async (id, roles) => {
  if (!config.apiUrl) return { data: {} };
  return await api.patch(`/api/users/${id}/roles`, { roles });
};

export const updateUser = async (id, data) => {
  if (!config.apiUrl) return { data: { ...data, _id: id } };
  return await api.put(`/api/users/${id}`, data);
};

export const updateUserProfileImage = async (data) => {
  if (!config.apiUrl) return { data: {} };
  return await api.put(`/api/users/profile-image`, data);
};
