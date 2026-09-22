import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  MoreVerticalIcon,
  PencilEdit02Icon,
  HistoryIcon,
  AlertDiamondIcon,
} from "@hugeicons/core-free-icons";
import type {
  Transaction,
  TransactionCategory,
} from "@/features/transactions/types/transactions.types";
import { formatNaira } from "@/lib/money";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { ErrorMessage } from "@/components/common/error-message";
import { getErrorMessage } from "@/lib/errors";
import { toast } from "@/components/ui/toast";
import { useUpdateTransactionCategory } from "@/features/transactions/hooks/use-update-transaction-category";

export const CATEGORY_LABELS: Record<TransactionCategory, string> = {
  food: "Food",
  transport: "Transport",
  rent: "Rent",
  utilities: "Utilities",
  subscriptions: "Subscriptions",
  shopping: "Shopping",
  entertainment: "Entertainment",
  income: "Income",
  other: "Other",
};

export const CATEGORY_OPTIONS = Object.entries(CATEGORY_LABELS) as [
  TransactionCategory,
  string,
][];

export const LOW_CONFIDENCE_THRESHOLD = 0.7;

export function formatTransactionDate(value: string) {
  return new Intl.DateTimeFormat("en-NG", { dateStyle: "medium" }).format(
    new Date(value),
  );
}

export function DateCell({ transaction }: { transaction: Transaction }) {
  return (
    <span className="text-sm text-muted-foreground">
      {formatTransactionDate(transaction.date)}
    </span>
  );
}

export function TypeCell({ transaction }: { transaction: Transaction }) {
  const isCredit = transaction.type === "credit";
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-sm font-medium ${
        isCredit ? "bg-primary/10 text-primary" : "bg-muted text-foreground"
      }`}
    >
      {isCredit ? "Credit" : "Debit"}
    </span>
  );
}

export function AmountCell({ transaction }: { transaction: Transaction }) {
  const isCredit = transaction.type === "credit";
  return (
    <span
      className={`text-sm font-medium ${isCredit ? "text-primary" : "text-foreground"}`}
    >
      {isCredit ? "+" : "-"}
      {formatNaira(transaction.amount)}
    </span>
  );
}

export function CategoryCell({ transaction }: { transaction: Transaction }) {
  return (
    <span className="inline-flex items-center bg-muted px-2 py-0.5 text-sm font-medium text-foreground">
      {CATEGORY_LABELS[transaction.category]}
    </span>
  );
}

export function ConfidenceCell({ transaction }: { transaction: Transaction }) {
  const isLow = transaction.confidence < LOW_CONFIDENCE_THRESHOLD;
  return (
    <span
      className={`inline-flex items-center gap-1 text-sm ${
        isLow ? "text-amber-600" : "text-muted-foreground"
      }`}
    >
      {isLow && <HugeiconsIcon icon={AlertDiamondIcon} className="size-3.5" />}
      {Math.round(transaction.confidence * 100)}%
    </span>
  );
}

function CorrectCategoryDialog({
  transaction,
  open,
  onClose,
}: {
  transaction: Transaction;
  open: boolean;
  onClose: () => void;
}) {
  const [category, setCategory] = useState<TransactionCategory>(
    transaction.category,
  );
  const updateCategory = useUpdateTransactionCategory();

  const handleClose = () => {
    if (updateCategory.isPending) return;
    updateCategory.reset();
    onClose();
  };

  const handleSave = () => {
    if (category === transaction.category) {
      handleClose();
      return;
    }

    updateCategory.mutate(
      { id: transaction.id, category },
      {
        onSuccess: () => {
          toast.add({ type: "success", description: "Category updated." });
          handleClose();
        },
      },
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => !o && handleClose()}
      disablePointerDismissal
    >
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Correct category</DialogTitle>
          <DialogDescription>
            Update the AI-assigned category for &quot;{transaction.description}
            &quot;.
          </DialogDescription>
        </DialogHeader>

        <Select
          value={category}
          onValueChange={(value) =>
            value && setCategory(value as TransactionCategory)
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CATEGORY_OPTIONS.map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {updateCategory.isError && (
          <ErrorMessage message={getErrorMessage(updateCategory.error)} />
        )}

        <DialogFooter>
          <Button
            variant="outline"
            size="sm"
            onClick={handleClose}
            disabled={updateCategory.isPending}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            disabled={updateCategory.isPending}
          >
            {updateCategory.isPending ? (
              <span className="flex items-center gap-2">
                <Spinner className="size-3.5" /> Saving…
              </span>
            ) : (
              "Save"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function TransactionActionsCell({
  transaction,
}: {
  transaction: Transaction;
}) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [correctOpen, setCorrectOpen] = useState(false);

  return (
    <>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger render={<Button variant="ghost" size="icon-sm" />}>
          <HugeiconsIcon icon={MoreVerticalIcon} />
        </PopoverTrigger>
        <PopoverContent align="end" className="w-44 p-1">
          <button
            type="button"
            onClick={() => {
              setPopoverOpen(false);
              setCorrectOpen(true);
            }}
            className="flex w-full items-center gap-2 px-2 py-1.5 text-left text-xs hover:bg-accent hover:text-accent-foreground"
          >
            <HugeiconsIcon icon={PencilEdit02Icon} className="size-3.5" />
            Correct
          </button>
          <button
            type="button"
            disabled
            className="flex w-full items-center gap-2 px-2 py-1.5 text-left text-xs text-muted-foreground opacity-50"
          >
            <HugeiconsIcon icon={HistoryIcon} className="size-3.5" />
            Audit history
          </button>
        </PopoverContent>
      </Popover>

      <CorrectCategoryDialog
        transaction={transaction}
        open={correctOpen}
        onClose={() => setCorrectOpen(false)}
      />
    </>
  );
}
