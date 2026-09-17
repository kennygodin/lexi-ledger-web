import { useMutation } from "@tanstack/react-query";
import { resendVerifyEmail } from "./verify-email.api";

export function useResendVerifyEmail() {
  return useMutation({
    mutationFn: resendVerifyEmail,
  });
}
