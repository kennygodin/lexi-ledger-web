import { apiClient } from "@/api/client.api";
import type { AuthUser } from "../types/auth.types";
import type { AuthSession } from "./login.api";
import type { VerifyEmailFormValues } from "../schemas/verify-email.schema";

export interface VerifyEmailPayload extends VerifyEmailFormValues {
  token: string;
}

interface ApiEnvelope<T> {
  status: boolean;
  message: string;
  data: T;
}

interface VerifyEmailResponseData {
  accessToken: string;
  tokenType: string;
  expiresInSeconds: number;
  user: AuthUser;
}

export async function verifyEmail(
  payload: VerifyEmailPayload,
): Promise<AuthSession> {
  const { data } = await apiClient.post<ApiEnvelope<VerifyEmailResponseData>>(
    "/auth/verify-email",
    {
      token: payload.token,
      otp: payload.otp,
    },
  );

  const { accessToken, user } = data.data;
  return { user, tokens: { accessToken } };
}

export async function resendVerifyEmail(token: string): Promise<void> {
  await apiClient.post("/auth/resend-verify-email", { token: token });
}
