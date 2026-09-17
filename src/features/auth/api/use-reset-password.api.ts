import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/toast";
import { resetPassword } from "./reset-password.api";

export function useResetPassword() {
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: (result) => {
      toast.add({
        type: "success",
        description: result.message,
      });
    },
  });
}
