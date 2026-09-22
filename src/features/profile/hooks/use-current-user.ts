import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../api/profile.api";

export function useCurrentUser() {
  return useQuery({
    queryKey: ["profile", "me"],
    queryFn: getCurrentUser,
  });
}
