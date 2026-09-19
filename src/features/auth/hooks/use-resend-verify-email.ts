import { useMutation } from "@tanstack/react-query";
import { resendVerifyEmail } from "../api/verify-email.api";

export function useResendVerifyEmail() {
  return useMutation({
    mutationFn: resendVerifyEmail,
  });
}
