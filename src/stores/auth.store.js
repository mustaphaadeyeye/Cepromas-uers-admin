import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: (user, token) =>
        set((state) => ({
          user, // This now contains user.role from the backend
          token: token != null ? token : state.token,
          isAuthenticated: true,
        })),

      logout: () => set({ user: null, token: null, isAuthenticated: false }),

      // Helper to check role without manual parsing
      isAgent: () => get().user?.role === "AGENT",
      isUser: () => get().user?.role === "USER",
    }),
    { name: "auth-storage" },
  ),
);
