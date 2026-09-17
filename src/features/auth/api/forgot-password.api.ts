import { apiClient } from "@/api/client.api";
import type { ForgotPasswordFormValues } from "../schemas/forgot-password.schema";

export interface RequestPasswordResetResult {
  sent: boolean;
  message: string;
}

export async function forgotPassword(
  payload: ForgotPasswordFormValues,
): Promise<RequestPasswordResetResult> {
  const { data } = await apiClient.post<{ message: string }>(
    "/auth/forgot-password",
    payload,
  );
  return { sent: true, message: data.message };
}
