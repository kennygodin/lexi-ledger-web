import { useMutation } from "@tanstack/react-query";
import { logout } from "../api/logout.api";

export function useLogout() {
  return useMutation({ mutationFn: logout });
}
