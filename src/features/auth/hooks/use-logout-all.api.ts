import { useMutation } from "@tanstack/react-query";
import { logoutAll } from "../api/logout-all.api";

export function useLogoutAll() {
  return useMutation({ mutationFn: logoutAll });
}
