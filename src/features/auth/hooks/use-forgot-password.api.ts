import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../api/forgot-password.api";

export function useForgotPassword() {
  return useMutation({
    mutationFn: forgotPassword,
  });
}
