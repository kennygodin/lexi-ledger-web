import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertDiamondIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface ErrorMessageProps {
  message?: string | null;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <Alert
      variant="destructive"
      className="flex h-10 items-center gap-2 px-3 py-0 text-sm"
    >
      <HugeiconsIcon icon={AlertDiamondIcon} className="size-4 shrink-0" />
      <AlertDescription className="text-sm leading-none">
        {message}
      </AlertDescription>
    </Alert>
  );
}
