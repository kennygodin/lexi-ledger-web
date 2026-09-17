import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthTokens, AuthUser } from "./types/auth.types";

interface AuthState {
  user: AuthUser | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  setSession: (user: AuthUser, tokens: AuthTokens) => void;
  setTokens: (tokens: AuthTokens) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      tokens: null,
      isAuthenticated: false,
      setSession: (user, tokens) =>
        set({ user, tokens, isAuthenticated: true }),
      setTokens: (tokens) => set({ tokens }),
      clear: () => set({ user: null, tokens: null, isAuthenticated: false }),
    }),
    { name: "auth" },
  ),
);
