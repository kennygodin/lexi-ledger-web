import { addMonths, format, parse, subMonths } from "date-fns";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";

interface MonthStepperProps {
  value: string; // YYYY-MM
  onChange: (value: string) => void;
}

export function MonthStepper({ value, onChange }: MonthStepperProps) {
  const date = parse(value, "yyyy-MM", new Date());

  const goPrev = () => onChange(format(subMonths(date, 1), "yyyy-MM"));
  const goNext = () => onChange(format(addMonths(date, 1), "yyyy-MM"));

  return (
    <div className="flex items-center gap-1 border border-border">
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={goPrev}
        aria-label="Previous month"
      >
        <HugeiconsIcon icon={ArrowLeft01Icon} />
      </Button>
      <span className="min-w-28 text-center text-sm font-medium">
        {format(date, "MMMM yyyy")}
      </span>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={goNext}
        aria-label="Next month"
      >
        <HugeiconsIcon icon={ArrowRight01Icon} />
      </Button>
    </div>
  );
}
