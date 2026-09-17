import { useMutation } from "@tanstack/react-query";
import { login } from "./login.api";

export function useLogin() {
  return useMutation({
    mutationFn: login,
  });
}
