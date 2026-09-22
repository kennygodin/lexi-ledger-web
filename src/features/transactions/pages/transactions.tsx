import { useSearchParams } from "react-router";
import { useTransactions } from "../hooks/use-transactions";
import { DataTable } from "@/components/common/data-table";
import { Pagination } from "@/components/common/pagination";

import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";
import { HugeiconsIcon } from "@hugeicons/react";
import { Exchange01Icon } from "@hugeicons/core-free-icons";
import { PageHeader } from "@/components/layouts/page-header";
import { transactionsColumns } from "../components/transactions.column";
import {
  DateRangeFilter,
  type DateRangeValue,
} from "@/components/common/date-range-filter";

export function Transactions() {
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

  const params = {
    page: Number(searchParams.get("page") ?? 1),
    limit: Number(searchParams.get("limit") ?? 20),
    ...dateRange,
  };

  const { data, isLoading, isError } = useTransactions(params);

  const isEmpty = !isLoading && !isError && data?.transactions.length === 0;

  return (
    <div>
      <PageHeader
        title="Transactions"
        description="View and categorize your transactions"
        action={
          <DateRangeFilter value={dateRange} onApply={handleApplyDateRange} />
        }
      />

      {isEmpty ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon" className="size-12">
              <HugeiconsIcon icon={Exchange01Icon} className="size-6" />
            </EmptyMedia>
            <EmptyTitle className="text-base">No transactions yet</EmptyTitle>
            <EmptyDescription className="text-sm">
              Upload a bank statement to see your transactions appear here
              automatically.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <>
          <DataTable
            columns={transactionsColumns}
            data={data?.transactions ?? []}
            isLoading={isLoading}
            isError={isError}
            noDataMessage="No transactions match these filters."
          />
          {!isError && !isLoading && (
            <Pagination
              total={data?.meta.total ?? 0}
              perPageOptions={[10, 20, 50, 100]}
            />
          )}
        </>
      )}
    </div>
  );
}
