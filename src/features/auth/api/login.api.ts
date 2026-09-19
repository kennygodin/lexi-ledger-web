import { apiClient } from "@/api/client.api";
import type { User } from "../types/auth.types";
import type { LoginFormValues } from "../schemas/login.schema";

interface ApiEnvelope<T> {
  success: boolean;
  statusCode: number;
  data: T;
}

interface LoginSuccessData {
  status: "SUCCESS";
  user: User;
  accessToken: string;
}

interface EmailNotVerifiedData {
  status: "EMAIL_NOT_VERIFIED";
}

export type LoginResult = LoginSuccessData | EmailNotVerifiedData;

export async function login(payload: LoginFormValues): Promise<LoginResult> {
  const { data } = await apiClient.post<ApiEnvelope<LoginResult>>(
    "/auth/login",
    {
      email: payload.email,
      password: payload.password,
    },
    { headers: { "X-Client-Type": "web" } },
  );

  return data.data;
}
