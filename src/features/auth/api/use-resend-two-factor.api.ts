import { useMutation } from "@tanstack/react-query";
import { resendTwoFactor } from "./two-factor.api";

export function useResendTwoFactor() {
  return useMutation({
    mutationFn: resendTwoFactor,
  });
}
