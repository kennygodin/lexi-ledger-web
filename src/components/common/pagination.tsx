import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useSearchParams } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface PaginationProps {
  total: number;
  perPageOptions: number[];
  className?: string;
}

export function Pagination({
  total,
  className,
  perPageOptions,
}: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 10);

  const totalPages = Math.ceil(total / limit);

  const start = total === 0 ? 0 : (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;

  const updateParams = (newPage: number, newLimit = limit) => {
    setSearchParams((prev) => {
      prev.set("page", String(newPage));
      prev.set("limit", String(newLimit));
      return prev;
    });
  };

  const handlePrev = () => {
    if (!canGoPrev) return;
    updateParams(page - 1);
  };

  const handleNext = () => {
    if (!canGoNext) return;
    updateParams(page + 1);
  };

  const handleLimitChange = (value: string | null) => {
    if (!value) return;
    updateParams(1, Number(value));
  };

  return (
    <div
      className={cn("flex items-center justify-between gap-4 py-3", className)}
    >
      <div className="flex items-center gap-2 px-4 text-sm text-muted-foreground">
        <span>Items per page: </span>

        <Select value={String(limit)} onValueChange={handleLimitChange}>
          <SelectTrigger className="h-8 border-none shadow-none">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {perPageOptions.map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>
          {start} - {end} of {total}
        </span>

        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handlePrev}
            disabled={!canGoPrev}
            aria-label="Previous page"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleNext}
            disabled={!canGoNext}
            aria-label="Next page"
          >
            <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
