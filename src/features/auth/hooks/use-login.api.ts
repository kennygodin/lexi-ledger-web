import { useMutation } from "@tanstack/react-query";
import { login } from "../api/login.api";

export function useLogin() {
  return useMutation({
    mutationFn: login,
  });
}
