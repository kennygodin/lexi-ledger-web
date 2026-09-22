import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { cn } from "@/lib/utils";

interface StatTileProps {
  label: string;
  value: string;
  icon?: IconSvgElement;
  iconClassName?: string;
  className?: string;
}

export function StatTile({
  label,
  value,
  icon,
  iconClassName,
  className,
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
        <p className="mt-1 text-2xl font-semibold">{value}</p>
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
