import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ErrorMessage } from "@/components/common/error-message";
import { getErrorMessage } from "@/lib/errors";
import { toast } from "@/components/ui/toast";
import { koboToNaira, nairaToKobo } from "@/lib/money";
import { useUpsertBudget } from "../hooks/use-upsert-budget";
import type { Budget } from "../types/budgets.types";
import { CATEGORY_LABELS } from "@/components/common/transaction-cells";
import type { TransactionCategory } from "@/features/transactions/types/transactions.types";

interface SetBudgetDialogProps {
  category: TransactionCategory;
  budget?: Budget;
  open: boolean;
  onClose: () => void;
}

export function SetBudgetDialog({
  category,
  budget,
  open,
  onClose,
}: SetBudgetDialogProps) {
  const [amount, setAmount] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const upsertBudget = useUpsertBudget();

  useEffect(() => {
    if (open) {
      setAmount(budget ? String(koboToNaira(budget.monthlyLimit)) : "");
      setValidationError(null);
      upsertBudget.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, budget]);

  const handleClose = () => {
    if (upsertBudget.isPending) return;
    onClose();
  };

  const handleSave = () => {
    const naira = Number(amount);

    if (!amount || Number.isNaN(naira) || naira <= 0) {
      setValidationError("Enter a monthly limit greater than 0.");
      return;
    }

    setValidationError(null);

    upsertBudget.mutate(
      { category, monthlyLimit: nairaToKobo(naira) },
      {
        onSuccess: () => {
          toast.add({ type: "success", description: "Budget saved." });
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
          <DialogTitle>
            {budget ? "Edit" : "Set"} budget — {CATEGORY_LABELS[category]}
          </DialogTitle>
          <DialogDescription>
            Set a monthly spending limit for this category.
          </DialogDescription>
        </DialogHeader>

        <Field>
          <FieldLabel htmlFor="monthlyLimit">Monthly limit (₦)</FieldLabel>
          <Input
            id="monthlyLimit"
            type="number"
            min="1"
            step="1"
            placeholder="e.g. 50000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={upsertBudget.isPending}
            aria-invalid={!!validationError}
          />
          {validationError && (
            <FieldError errors={[{ message: validationError }]} />
          )}
        </Field>

        {upsertBudget.isError && (
          <ErrorMessage message={getErrorMessage(upsertBudget.error)} />
        )}

        <DialogFooter>
          <Button
            variant="outline"
            size="sm"
            onClick={handleClose}
            disabled={upsertBudget.isPending}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            disabled={upsertBudget.isPending}
          >
            {upsertBudget.isPending ? (
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
