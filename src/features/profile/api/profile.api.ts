import { apiClient } from "@/api/client.api";
import type { ApiEnvelope } from "./types";
import type { User } from "@/features/auth/types/auth.types";

export async function getCurrentUser() {
  const { data } = await apiClient.get<ApiEnvelope<User>>("/users/me");
  return data.data;
}

export async function updateProfile(name: string) {
  const { data } = await apiClient.patch<ApiEnvelope<User>>("/users/me", {
    name,
  });
  return data.data;
}
