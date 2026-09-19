import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { AlertDialogShell, type AlertVariant } from "./alert-dialog-shell";

type MutationError = Error & { details?: string[] };

interface ConfirmMutation {
  isPending: boolean;
  isError: boolean;
  error?: MutationError | null;
  reset?: () => void;
}

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  variant?: AlertVariant;
  mutation?: ConfirmMutation;
  onConfirm: () => void;
  errorMessage?: string | null;
}

const confirmButtonVariant: Record<AlertVariant, "destructive" | "default"> = {
  danger: "destructive",
  warning: "default",
};

export function ConfirmDialog({
  open,
  onClose,
  title,
  description,
  confirmLabel = "Confirm",
  variant = "warning",
  mutation,
  onConfirm,
  errorMessage,
}: ConfirmDialogProps) {
  const isPending = mutation?.isPending;

  const handleClose = () => {
    if (isPending) return;
    mutation?.reset?.();
    onClose();
  };

  return (
    <AlertDialogShell
      open={open}
      onOpenChange={(o) => !o && handleClose()}
      title={title}
      description={description}
      variant={variant}
      isError={mutation?.isError}
      errorMessage={errorMessage}
    >
      <Button
        variant="outline"
        size="sm"
        onClick={handleClose}
        disabled={isPending}
      >
        Cancel
      </Button>
      <Button
        variant={confirmButtonVariant[variant]}
        size="sm"
        onClick={onConfirm}
        disabled={isPending}
        className="min-w-24"
      >
        {isPending ? (
          <span className="flex items-center gap-2">
            <Spinner className="size-3.5" />
            Please wait...
          </span>
        ) : (
          confirmLabel
        )}
      </Button>
    </AlertDialogShell>
  );
}
