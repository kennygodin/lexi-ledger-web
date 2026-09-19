import { useEffect } from "react";
import { refreshAccessToken } from "@/api/client.api";
import { useAuthStore } from "../auth.store";

export function useAuthBootstrap() {
  useEffect(() => {
    if (useAuthStore.getState().status !== "loading") return;

    refreshAccessToken()
      .then((accessToken) => {
        useAuthStore.getState().setAccessToken(accessToken);
      })
      .catch(() => {
        useAuthStore.getState().clear();
      });
  }, []);
}
