import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface StatTileProps {
  label: string;
  value: string;
  icon?: IconSvgElement;
  iconClassName?: string;
  className?: string;
  isLoading?: boolean;
}

export function StatTile({
  label,
  value,
  icon,
  iconClassName,
  className,
  isLoading = false,
}: StatTileProps) {
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-3 border border-border p-4",
        className,
      )}
    >
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        {isLoading ? (
          <Skeleton className="mt-1 h-8 w-20" />
        ) : (
          <p className="mt-1 text-2xl">{value}</p>
        )}
      </div>

      {icon && (
        <div
          className={cn(
            "flex size-9 shrink-0 items-center justify-center bg-muted text-muted-foreground",
            iconClassName,
          )}
        >
          <HugeiconsIcon icon={icon} className="size-4.5" />
        </div>
      )}
    </div>
  );
}
