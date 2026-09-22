import { useSearchParams } from "react-router";
import { format } from "date-fns";
import { useBudgets } from "../hooks/use-budgets";
import { BudgetCard } from "../components/budget-card";
import { MonthStepper } from "../components/month-stepper";
import { PageHeader } from "@/components/layouts/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorMessage } from "@/components/common/error-message";
import { getErrorMessage } from "@/lib/errors";
import type { TransactionCategory } from "@/features/transactions/types/transactions.types";

const CATEGORY_ORDER: TransactionCategory[] = [
  "food",
  "transport",
  "rent",
  "utilities",
  "subscriptions",
  "income",
  "entertainment",
  "shopping",
  "other",
];

export function Budgets() {
  const [searchParams, setSearchParams] = useSearchParams();

  const month = searchParams.get("month") ?? format(new Date(), "yyyy-MM");

  const handleMonthChange = (next: string) => {
    setSearchParams((prev) => {
      prev.set("month", next);
      return prev;
    });
  };

  const { data, isLoading, isError, error } = useBudgets({ month });

  return (
    <div>
      <PageHeader
        title="Budgets"
        description="Set monthly limits per category"
        action={<MonthStepper value={month} onChange={handleMonthChange} />}
      />

      {isError ? (
        <ErrorMessage message={getErrorMessage(error)} />
      ) : isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORY_ORDER.map((category) => (
            <Skeleton key={category} className="h-28 w-full" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORY_ORDER.map((category) => (
            <BudgetCard
              key={category}
              category={category}
              budget={data?.find((b) => b.category === category)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
