import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  PencilEdit02Icon,
  Delete02Icon,
  Add01Icon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { SetBudgetDialog } from "./set-budget-dialog";
import { useDeleteBudget } from "../hooks/use-delete-budget";
import { getErrorMessage } from "@/lib/errors";
import { formatNaira } from "@/lib/money";
import { CATEGORY_LABELS } from "@/components/common/transaction-cells";
import type { Budget } from "../types/budgets.types";
import type { TransactionCategory } from "@/features/transactions/types/transactions.types";

function progressColor(percentUsed: number) {
  if (percentUsed >= 100) return "bg-destructive";
  if (percentUsed >= 70) return "bg-amber-500";
  return "bg-primary";
}

interface BudgetCardProps {
  category: TransactionCategory;
  budget?: Budget;
}

export function BudgetCard({ category, budget }: BudgetCardProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const deleteBudget = useDeleteBudget();

  if (!budget) {
    return (
      <div className="flex flex-col items-start justify-between gap-3 border border-dashed border-border p-4">
        <div>
          <p className="text-sm font-medium text-foreground">
            {CATEGORY_LABELS[category]}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">No budget set</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setEditOpen(true)}>
          <HugeiconsIcon icon={Add01Icon} className="size-3.5" />
          Set budget
        </Button>

        <SetBudgetDialog
          category={category}
          open={editOpen}
          onClose={() => setEditOpen(false)}
        />
      </div>
    );
  }

  const percent = Math.min(budget.percentUsed, 100);

  return (
    <div className="flex flex-col gap-3 border border-border p-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-medium text-foreground">
            {CATEGORY_LABELS[category]}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {formatNaira(budget.spent)} of {formatNaira(budget.monthlyLimit)}
          </p>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setEditOpen(true)}
            aria-label="Edit budget"
          >
            <HugeiconsIcon icon={PencilEdit02Icon} />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setDeleteOpen(true)}
            aria-label="Delete budget"
          >
            <HugeiconsIcon icon={Delete02Icon} />
          </Button>
        </div>
      </div>

      <div className="h-2 w-full overflow-hidden bg-muted">
        <div
          className={`h-full transition-all ${progressColor(budget.percentUsed)}`}
          style={{ width: `${percent}%` }}
        />
      </div>

      <p
        className={`text-xs ${
          budget.remaining < 0 ? "text-destructive" : "text-muted-foreground"
        }`}
      >
        {budget.remaining < 0
          ? `${formatNaira(Math.abs(budget.remaining))} over budget`
          : `${formatNaira(budget.remaining)} remaining`}
      </p>

      <SetBudgetDialog
        category={category}
        budget={budget}
        open={editOpen}
        onClose={() => setEditOpen(false)}
      />

      <ConfirmDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Delete budget"
        description={`Remove the ${CATEGORY_LABELS[category]} budget? This can't be undone.`}
        confirmLabel="Delete"
        variant="danger"
        mutation={deleteBudget}
        errorMessage={getErrorMessage(deleteBudget.error)}
        onConfirm={() =>
          deleteBudget.mutate(category, {
            onSuccess: () => setDeleteOpen(false),
          })
        }
      />
    </div>
  );
}
