import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "./forgot-password.api";

export function useForgotPassword() {
  return useMutation({
    mutationFn: forgotPassword,
  });
}
