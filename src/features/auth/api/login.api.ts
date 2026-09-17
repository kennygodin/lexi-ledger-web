import { apiClient } from "@/api/client.api";
import type { AuthTokens, AuthUser } from "../types/auth.types";
import type { LoginFormValues } from "../schemas/login.schema";

export interface AuthSession {
  user: AuthUser;
  tokens: AuthTokens;
}

export type LoginResult =
  | { twoFactorRequired: true; verificationToken: string }
  | { twoFactorRequired: false; session: AuthSession };

interface ApiEnvelope<T> {
  status: boolean;
  message: string;
  data: T;
}

interface LoginResponseData {
  twoFactorRequired: boolean;
  verificationToken?: string;
  authentication?: {
    accessToken: string;
    tokenType: string;
    expiresInSeconds: number;
    user: AuthUser;
  };
}

export async function login(payload: LoginFormValues): Promise<LoginResult> {
  const { data } = await apiClient.post<ApiEnvelope<LoginResponseData>>(
    "/auth/login",
    {
      username: payload.email,
      password: payload.password,
    },
  );

  const result = data.data;

  if (!result.authentication) {
    return {
      twoFactorRequired: true,
      verificationToken: result.verificationToken ?? "",
    };
  }

  const { accessToken, user } = result.authentication;
  return {
    twoFactorRequired: false,
    session: { user, tokens: { accessToken } },
  };
}
