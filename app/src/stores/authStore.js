import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      loginUser: ({ user }) => {
        set({
          user,
          isAuthenticated: true,
        });

        localStorage.setItem("authToken", user.token);
      },

      registerUser: ({ user }) => {
        set({
          user,
          isAuthenticated: true,
        });

        localStorage.setItem("authToken", user.token);
      },

      setUser: ({ user }) => {
        set({ user });
      },

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),
    }),
    // Rehydrate after the first client render so persisted authentication
    // cannot differ from the HTML generated on the server.
    { name: "zustand:auth-storage", skipHydration: true },
  ),
);

export default useAuthStore;
