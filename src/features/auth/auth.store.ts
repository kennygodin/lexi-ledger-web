import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "./types/auth.types";
import { queryClient } from "@/api/query-client.api";

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  status: AuthStatus;
  setSession: (user: User, accessToken: string) => void;
  setAccessToken: (accessToken: string) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      status: "loading",
      setSession: (user, accessToken) =>
        set({ user, accessToken, status: "authenticated" }),
      setAccessToken: (accessToken) =>
        set({ accessToken, status: "authenticated" }),
      clear: () => {
        queryClient.clear();
        set({ user: null, accessToken: null, status: "unauthenticated" });
      },
    }),
    {
      name: "auth",
      partialize: (state) => ({ user: state.user }),
    },
  ),
);
