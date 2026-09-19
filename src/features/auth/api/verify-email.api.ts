import { apiClient } from "@/api/client.api";
import type { VerifyEmailFormValues } from "../schemas/verify-email.schema";

export interface VerifyEmailPayload extends VerifyEmailFormValues {
  token: string;
}

interface ApiEnvelope<T> {
  status: boolean;
  message: string;
  data: T;
}

interface MessageResponseData {
  message: string;
}

export async function verifyEmail(token: string): Promise<MessageResponseData> {
  const { data } = await apiClient.post<ApiEnvelope<MessageResponseData>>(
    "/auth/verify-email",
    { token },
  );

  return data.data;
}

export async function resendVerifyEmail(
  email: string,
): Promise<MessageResponseData> {
  const { data } = await apiClient.post<ApiEnvelope<MessageResponseData>>(
    "/auth/resend-verification",
    { email },
  );

  return data.data;
}
