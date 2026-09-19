import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { AlertDialogShell } from "./alert-dialog-shell";
import { useLogout } from "@/features/auth/hooks/use-logout.api";
import { useLogoutAll } from "@/features/auth/hooks/use-logout-all.api";
import { useAuthStore } from "@/features/auth/auth.store";
import { getErrorMessage } from "@/lib/errors";

interface LogoutDialogProps {
  open: boolean;
  onClose: () => void;
}

export function LogoutDialog({ open, onClose }: LogoutDialogProps) {
  const navigate = useNavigate();
  const clear = useAuthStore((state) => state.clear);
  const logout = useLogout();
  const logoutAll = useLogoutAll();

  const isPending = logout.isPending || logoutAll.isPending;

  const handleClose = () => {
    if (isPending) return;
    logout.reset();
    logoutAll.reset();
    onClose();
  };

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSettled: () => {
        clear();
        onClose();
        navigate("/login", { replace: true });
      },
    });
  };

  const handleLogoutAll = () => {
    logoutAll.mutate(undefined, {
      onSuccess: () => {
        clear();
        onClose();
        navigate("/login", { replace: true });
      },
    });
  };

  return (
    <AlertDialogShell
      open={open}
      onOpenChange={(o) => !o && handleClose()}
      title="Log out"
      description="Choose whether to sign out of this device only, or every device you're signed in on."
      variant="danger"
      isError={logoutAll.isError}
      errorMessage={getErrorMessage(logoutAll.error)}
      footerClassName="flex-col sm:flex-col"
    >
      <Button
        variant="outline"
        size="sm"
        onClick={handleLogout}
        disabled={isPending}
        className="w-full h-9"
      >
        {logout.isPending ? (
          <span className="flex items-center gap-2">
            <Spinner className="size-3.5" />
            Logging out...
          </span>
        ) : (
          "Log out"
        )}
      </Button>
      <Button
        variant="destructive"
        size="sm"
        onClick={handleLogoutAll}
        disabled={isPending}
        className="w-full h-9"
      >
        {logoutAll.isPending ? (
          <span className="flex items-center gap-2">
            <Spinner className="size-3.5" />
            Please wait...
          </span>
        ) : (
          "Log out of all devices"
        )}
      </Button>
    </AlertDialogShell>
  );
}
