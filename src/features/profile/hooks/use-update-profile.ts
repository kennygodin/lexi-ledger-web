import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../api/profile.api";
import { useAuthStore } from "@/features/auth/auth.store";

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: (name: string) => updateProfile(name),
    onSuccess: (user) => {
      setUser(user);
      queryClient.invalidateQueries({ queryKey: ["profile", "me"] });
    },
  });
}
