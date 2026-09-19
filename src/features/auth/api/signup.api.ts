import { apiClient } from "@/api/client.api";
import type { User } from "../types/auth.types";
import type { SignupFormValues } from "../schemas/signup.schema";

interface ApiEnvelope<T> {
  status: boolean;
  message: string;
  data: T;
}

export interface RegisterResponseData {
  message: string;
  user: User;
}

export async function signup(
  payload: SignupFormValues,
): Promise<RegisterResponseData> {
  const { data } = await apiClient.post<ApiEnvelope<RegisterResponseData>>(
    "/auth/register",
    {
      name: payload.name,
      email: payload.email,
      password: payload.password,
    },
  );

  return data.data;
}
