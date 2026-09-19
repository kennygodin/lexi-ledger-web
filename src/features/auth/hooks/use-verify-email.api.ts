import { useMutation } from "@tanstack/react-query";
import { verifyEmail } from "../api/verify-email.api";

export function useVerifyEmail() {
  return useMutation({
    mutationFn: verifyEmail,
  });
}
