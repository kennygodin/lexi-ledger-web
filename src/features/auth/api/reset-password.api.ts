import { apiClient } from "@/api/client.api";

interface ApiEnvelope<T> {
  success: boolean;
  statusCode: number;
  data: T;
}

interface MessageResponseData {
  message: string;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

export async function resetPassword(
  payload: ResetPasswordPayload,
): Promise<MessageResponseData> {
  const { data } = await apiClient.post<ApiEnvelope<MessageResponseData>>(
    "/auth/reset-password",
    payload,
  );
  return data.data;
}
