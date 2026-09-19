import { apiClient } from "@/api/client.api";
import type { ForgotPasswordFormValues } from "../schemas/forgot-password.schema";

interface ApiEnvelope<T> {
  success: boolean;
  statusCode: number;
  data: T;
}

interface MessageResponseData {
  message: string;
}

export async function forgotPassword(
  payload: ForgotPasswordFormValues,
): Promise<MessageResponseData> {
  const { data } = await apiClient.post<ApiEnvelope<MessageResponseData>>(
    "/auth/forgot-password",
    payload,
  );
  return data.data;
}
