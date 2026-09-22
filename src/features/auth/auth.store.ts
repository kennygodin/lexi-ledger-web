import { create } from "zustand";
import type { User } from "./types/auth.types";
import { queryClient } from "@/api/query-client.api";

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  status: AuthStatus;
  setSession: (user: User, accessToken: string) => void;
  setAccessToken: (accessToken: string) => void;
  setUser: (user: User) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  accessToken: null,
  status: "loading",
  setSession: (user, accessToken) =>
    set({ user, accessToken, status: "authenticated" }),
  setAccessToken: (accessToken) =>
    set({ accessToken, status: "authenticated" }),
  setUser: (user) => set({ user }),
  clear: () => {
    queryClient.clear();
    set({ user: null, accessToken: null, status: "unauthenticated" });
  },
}));
