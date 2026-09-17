import { useMutation } from "@tanstack/react-query";
import { verifyTwoFactor } from "@/features/auth/api/two-factor.api";

export function useVerifyEmail() {
  return useMutation({
    mutationFn: verifyTwoFactor,
  });
}
