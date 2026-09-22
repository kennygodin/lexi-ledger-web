import { useEffect } from "react";
import { refreshAccessToken } from "@/api/client.api";
import { useAuthStore } from "../auth.store";
import { getCurrentUser } from "@/features/profile/api/profile.api";

let bootstrapPromise: Promise<void> | null = null;

function bootstrapAuth(): Promise<void> {
  bootstrapPromise ??= refreshAccessToken()
    .then(() => getCurrentUser())
    .then((user) => {
      useAuthStore.getState().setUser(user);
    })
    .catch(() => {
      useAuthStore.getState().clear();
    })
    .finally(() => {
      bootstrapPromise = null;
    });

  return bootstrapPromise;
}

export function useAuthBootstrap() {
  useEffect(() => {
    if (useAuthStore.getState().status !== "loading") return;
    bootstrapAuth();
  }, []);
}
