import { create } from "zustand";
import { persist } from "zustand/middleware";

const usePreferenceStore = create(
  persist(
    (set) => ({
      theme: "light",

      toggleTheme: () => {
        set((state) => ({
          theme: state.theme == "light" ? "dark" : "light",
        }));
      },
    }),
    { name: "zustand:preference-storage", skipHydration: true },
  ),
);

export default usePreferenceStore;
