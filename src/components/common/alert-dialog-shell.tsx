import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { Alert02Icon, AlertCircleIcon } from "@hugeicons/core-free-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ErrorMessage } from "./error-message";

export type AlertVariant = "warning" | "danger";

const variantStyles: Record<
  AlertVariant,
  { iconWrap: string; icon: string; Icon: IconSvgElement }
> = {
  danger: {
    iconWrap: "bg-destructive/10",
    icon: "text-destructive",
    Icon: AlertCircleIcon,
  },
  warning: {
    iconWrap: "bg-amber-500/10",
    icon: "text-amber-600",
    Icon: Alert02Icon,
  },
};

interface AlertDialogShellProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  variant?: AlertVariant;
  isError?: boolean;
  errorMessage?: string | null;
  footerClassName?: string;
  children: React.ReactNode;
}

export function AlertDialogShell({
  open,
  onOpenChange,
  title,
  description,
  variant = "warning",
  isError,
  errorMessage,
  footerClassName,
  children,
}: AlertDialogShellProps) {
  const style = variantStyles[variant];

  return (
    <Dialog open={open} onOpenChange={onOpenChange} disablePointerDismissal>
      <DialogContent className="overflow-hidden p-0 sm:max-w-md">
        <div className="flex items-start gap-3 p-6 pb-3">
          <div
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-none",
              style.iconWrap,
            )}
          >
            <HugeiconsIcon
              icon={style.Icon}
              className={cn("size-5", style.icon)}
            />
          </div>
          <div className="flex-1">
            <DialogHeader className="space-y-1 p-0">
              <DialogTitle className="text-base leading-none font-semibold">
                {title}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                {description}
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>

        {isError && (
          <div className="px-6 pb-3">
            <ErrorMessage message={errorMessage} />
          </div>
        )}

        <DialogFooter
          className={cn(
            "flex flex-row justify-end gap-2 p-6 pt-2 sm:justify-end",
            footerClassName,
          )}
        >
          {children}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
