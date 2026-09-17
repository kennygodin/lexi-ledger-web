import { apiClient } from "@/api/client.api";
import type { VerifyTwoFactorFormValues } from "../schemas/verify-two-factor.schema";
import type { AuthUser } from "../types/auth.types";
import type { AuthSession } from "./login.api";

export interface VerifyTwoFactorPayload extends VerifyTwoFactorFormValues {
  token: string;
}

interface ApiEnvelope<T> {
  status: boolean;
  message: string;
  data: T;
}

interface VerifyTwoFactorResponseData {
  accessToken: string;
  tokenType: string;
  expiresInSeconds: number;
  user: AuthUser;
}

export async function verifyTwoFactor(
  payload: VerifyTwoFactorPayload,
): Promise<AuthSession> {
  const { data } = await apiClient.post<
    ApiEnvelope<VerifyTwoFactorResponseData>
  >("/auth/verify-two-factor", {
    token: payload.token,
    otp: payload.otp,
  });

  const { accessToken, user } = data.data;
  return { user, tokens: { accessToken } };
}

export async function resendTwoFactor(token: string): Promise<void> {
  await apiClient.post("/auth/resend-two-factor", { token: token });
}
