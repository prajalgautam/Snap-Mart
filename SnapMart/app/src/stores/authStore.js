import { create } from "zustand";
import { persist } from "zustand/middleware";
import useCartStore from "./cartStore";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      loginUser: ({ user }) => {
        // A cart belongs to the active account; never carry it to another one.
        useCartStore.getState().clearCart();
        set({
          user,
          isAuthenticated: true,
        });

        localStorage.setItem("authToken", user.token);
      },

      registerUser: ({ user }) => {
        useCartStore.getState().clearCart();
        set({
          user,
          isAuthenticated: true,
        });

        localStorage.setItem("authToken", user.token);
      },

      setUser: ({ user }) => {
        set({ user });
      },

      logout: () => {
        useCartStore.getState().clearCart();
        localStorage.removeItem("authToken");
        set({
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    { name: "zustand:auth-storage" },
  ),
);

export default useAuthStore;
