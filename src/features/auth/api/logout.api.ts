import { apiClient } from "@/api/client.api";

export async function logout(): Promise<void> {
  await apiClient.post("/auth/logout", undefined, {
    headers: { "X-Client-Type": "web" },
  });
}
