import { useMutation } from "@tanstack/react-query";
import { resendTwoFactor } from "../api/two-factor.api";

export function useResendTwoFactor() {
  return useMutation({
    mutationFn: resendTwoFactor,
  });
}
