import { apiClient } from "@/api/client.api";

export interface ResetPasswordPayload {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordResult {
  reset: boolean;
  message: string;
}

export async function resetPassword(
  payload: ResetPasswordPayload,
): Promise<ResetPasswordResult> {
  const { data } = await apiClient.post<{ message: string }>(
    "/auth/reset-password",
    payload,
  );
  return { reset: true, message: data.message };
}
