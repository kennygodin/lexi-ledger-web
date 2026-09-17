import { apiClient } from "@/api/client.api";
import type { AuthUser } from "../types/auth.types";
import type { SignupFormValues } from "../schemas/signup.schema";

interface ApiEnvelope<T> {
  status: boolean;
  message: string;
  data: T;
}

export interface SignupResponseData {
  user: AuthUser;
  message: string;
}

export async function signup(
  payload: SignupFormValues,
): Promise<SignupResponseData> {
  const { data } = await apiClient.post<ApiEnvelope<AuthUser>>(
    "/auth/register",
    {
      name: payload.name,
      email: payload.email,
      password: payload.password,
    },
  );

  return { user: data.data, message: data.message };
}
