import config from "@/config";
import api from "./api";

export const getAllUsers = async () => {
  if (!config.apiUrl) {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("snapmart_mock_users");
        if (stored) return { data: JSON.parse(stored) };
      } catch (err) {
        console.error("Mock getAllUsers error:", err);
      }
    }
    return { data: [] };
  }
  return await api.get(`/api/users`);
};

export const getUsersById = async (id) => {
  if (!config.apiUrl) {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("snapmart_mock_users");
        if (stored) {
          const users = JSON.parse(stored);
          const user = users.find((u) => u._id === id);
          return { data: user || null };
        }
      } catch (err) {
        console.error("Mock getUsersById error:", err);
      }
    }
    return { data: null };
  }
  return await api.get(`/api/users/${id}`);
};

export const updateUserRoles = async (id, roles) => {
  if (!config.apiUrl) {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("snapmart_mock_users");
        if (stored) {
          const users = JSON.parse(stored);
          const idx = users.findIndex((u) => u._id === id);
          if (idx !== -1) {
            users[idx].roles = roles;
            localStorage.setItem("snapmart_mock_users", JSON.stringify(users));
            return { data: users[idx] };
          }
        }
      } catch (err) {
        console.error("Mock updateUserRoles error:", err);
      }
    }
    return { data: {} };
  }
  return await api.patch(`/api/users/${id}/roles`, { roles });
};

export const updateUser = async (id, data) => {
  if (!config.apiUrl) {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("snapmart_mock_users");
        if (stored) {
          const users = JSON.parse(stored);
          const idx = users.findIndex((u) => u._id === id);
          if (idx !== -1) {
            // Don't overwrite password with empty string
            const { password, ...restData } = data;
            const updateData = password ? { ...restData, password } : restData;
            users[idx] = { ...users[idx], ...updateData };
            localStorage.setItem("snapmart_mock_users", JSON.stringify(users));
            return { data: users[idx] };
          }
        }
      } catch (err) {
        console.error("Mock updateUser error:", err);
      }
    }
    return { data: { ...data, _id: id } };
  }
  return await api.put(`/api/users/${id}`, data);
};

export const updateUserProfileImage = async (data) => {
  if (!config.apiUrl) {
    // Mock mode: update the user's profile image URL in localStorage
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("snapmart_mock_users");
        let users = stored ? JSON.parse(stored) : [];
        
        const auth = localStorage.getItem("zustand:auth-storage");
        let currentUser = null;
        if (auth) {
          const parsedAuth = JSON.parse(auth);
          currentUser = parsedAuth?.state?.user;
        }

        if (currentUser) {
          const idx = users.findIndex((u) => u._id === currentUser._id);
          // Use placeholder image for mock mode when file is uploaded
          const updatedUser = {
            ...currentUser,
            profileImageUrl: `https://picsum.photos/seed/snapmart-user-${currentUser._id}/200/200`,
          };
          if (idx !== -1) {
            users[idx] = updatedUser;
            localStorage.setItem("snapmart_mock_users", JSON.stringify(users));
          }
          return { data: updatedUser };
        }
      } catch (err) {
        console.error("Mock updateUserProfileImage error:", err);
      }
    }
    return { data: {} };
  }
  return await api.put(`/api/users/profile-image`, data);
};
