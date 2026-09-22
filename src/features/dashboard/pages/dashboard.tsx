import { Link, useSearchParams } from "react-router";
import { useDashboardOverview } from "../hooks/use-dashboard-overview";
import { useTransactions } from "@/features/transactions/hooks/use-transactions";
import { PageHeader } from "@/components/layouts/page-header";
import { StatTile } from "@/components/common/stat-tile";
import { DataTable } from "@/components/common/data-table";
import { buttonVariants } from "@/components/ui/button";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty";
import { formatNaira } from "@/lib/money";
import {
  Exchange01Icon,
  ArrowUp01Icon,
  ArrowDown01Icon,
  Wallet01Icon,
  File02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { latestTransactionsColumns } from "../components/latest-transactions.column";
import { CategoryBreakdownChart } from "../components/category-breakdown-chart";
import {
  DateRangeFilter,
  type DateRangeValue,
} from "../components/date-range-filter";

export function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();

  const dateRange: DateRangeValue = {
    from: searchParams.get("from") ?? undefined,
    to: searchParams.get("to") ?? undefined,
  };

  const handleApplyDateRange = (next: DateRangeValue) => {
    setSearchParams((prev) => {
      if (next.from) prev.set("from", next.from);
      else prev.delete("from");
      if (next.to) prev.set("to", next.to);
      else prev.delete("to");
      return prev;
    });
  };

  const {
    data,
    isLoading: overviewLoading,
    isError: overviewError,
  } = useDashboardOverview(dateRange);
  const {
    data: latest,
    isLoading: transactionsLoading,
    isError: transactionsError,
  } = useTransactions({ page: 1, limit: 5 });

  const isEmpty =
    !overviewLoading && !overviewError && data?.totalTransactions === 0;

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Your spending at a glance"
        action={
          <DateRangeFilter value={dateRange} onApply={handleApplyDateRange} />
        }
      />

      {isEmpty ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon" className="size-12">
              <HugeiconsIcon icon={File02Icon} className="size-6" />
            </EmptyMedia>
            <EmptyTitle className="text-base">No data yet</EmptyTitle>
            <EmptyDescription className="text-sm">
              Upload your first bank statement to see your spending come to life
              here.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Link to="/statements" className={buttonVariants({ size: "lg" })}>
              Upload statement
            </Link>
          </EmptyContent>
        </Empty>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatTile
              label="Transactions"
              value={data ? String(data.totalTransactions) : ""}
              icon={Exchange01Icon}
              isLoading={overviewLoading}
            />
            <StatTile
              label="Total credit"
              value={data ? formatNaira(data.totalCredit) : ""}
              icon={ArrowUp01Icon}
              iconClassName="bg-primary/10 text-primary"
              isLoading={overviewLoading}
            />
            <StatTile
              label="Total debit"
              value={data ? formatNaira(data.totalDebit) : ""}
              icon={ArrowDown01Icon}
              iconClassName="bg-destructive/10 text-destructive"
              isLoading={overviewLoading}
            />
            <StatTile
              label="Net"
              value={data ? formatNaira(data.net) : ""}
              icon={Wallet01Icon}
              isLoading={overviewLoading}
            />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="border border-border p-4 lg:col-span-2">
              <p className="mb-4 text-base font-medium text-foreground">
                Latest transactions
              </p>
              <DataTable
                columns={latestTransactionsColumns}
                data={latest?.transactions ?? []}
                isLoading={transactionsLoading}
                isError={transactionsError}
                noDataMessage="No transactions yet."
              />
            </div>

            <div className="border border-border p-4 lg:col-span-1">
              <p className="mb-4 text-base font-medium text-foreground">
                Spend by category
              </p>
              <CategoryBreakdownChart data={data?.categoryBreakdown ?? []} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
