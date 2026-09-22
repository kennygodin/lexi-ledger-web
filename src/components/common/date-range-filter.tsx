import { useEffect, useState } from "react";
import { format } from "date-fns";
import { HugeiconsIcon } from "@hugeicons/react";
import { FilterIcon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { DatePicker } from "@/components/common/date-picker";

export interface DateRangeValue {
  from?: string;
  to?: string;
}

interface DateRangeFilterProps {
  value: DateRangeValue;
  onApply: (value: DateRangeValue) => void;
}

export function DateRangeFilter({ value, onApply }: DateRangeFilterProps) {
  const [open, setOpen] = useState(false);
  const [from, setFrom] = useState<Date | undefined>();
  const [to, setTo] = useState<Date | undefined>();

  useEffect(() => {
    if (open) {
      setFrom(value.from ? new Date(value.from) : undefined);
      setTo(value.to ? new Date(value.to) : undefined);
    }
  }, [open, value.from, value.to]);

  const isActive = Boolean(value.from || value.to);

  const handleFilter = () => {
    onApply({
      from: from ? format(from, "yyyy-MM-dd") : undefined,
      to: to ? format(to, "yyyy-MM-dd") : undefined,
    });
    setOpen(false);
  };

  const handleClear = () => {
    setFrom(undefined);
    setTo(undefined);
    onApply({});
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant={isActive ? "default" : "outline"} size="icon-sm" />
        }
      >
        <HugeiconsIcon icon={FilterIcon} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Filter by date</DialogTitle>
          <DialogDescription>
            Choose a start and end date to filter your dashboard totals.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Field>
            <FieldLabel>Start date</FieldLabel>
            <DatePicker
              value={from}
              onChange={setFrom}
              placeholder="Select start date"
            />
          </Field>
          <Field>
            <FieldLabel>End date</FieldLabel>
            <DatePicker
              value={to}
              onChange={setTo}
              placeholder="Select end date"
            />
          </Field>
        </div>

        <DialogFooter>
          <Button variant="outline" size="sm" onClick={handleClear}>
            Clear
          </Button>
          <Button size="sm" onClick={handleFilter} disabled={!from}>
            Filter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
