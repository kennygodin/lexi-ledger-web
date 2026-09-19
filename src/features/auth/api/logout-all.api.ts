import { apiClient } from "@/api/client.api";

interface ApiEnvelope<T> {
  success: boolean;
  statusCode: number;
  data: T;
}

export async function logoutAll(): Promise<{ message: string }> {
  const { data } =
    await apiClient.post<ApiEnvelope<{ message: string }>>("/auth/logout-all");
  return data.data;
}
