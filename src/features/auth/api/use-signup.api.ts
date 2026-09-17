import { useMutation } from "@tanstack/react-query";
import { signup } from "./signup.api";

export function useSignup() {
  return useMutation({
    mutationFn: signup,
  });
}
