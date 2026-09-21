import { useSearchParams } from "react-router";
import { useStatements } from "../hooks/use-statements";
import { DataTable } from "@/components/common/data-table";
import { statementsColumns } from "../components/statements.columns";
import { Pagination } from "@/components/common/pagination";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty";
import { HugeiconsIcon } from "@hugeicons/react";
import { File02Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layouts/page-header";

export function Statements() {
  const [searchParams] = useSearchParams();

  const params = {
    page: Number(searchParams.get("page") ?? 1),
    limit: Number(searchParams.get("limit") ?? 20),
  };

  const { data, isLoading, isError } = useStatements(params);

  const isEmpty = !isLoading && !isError && data?.statements.length === 0;

  return (
    <div>
      <PageHeader
        title="Statements"
        description="Upload and track your bank statements"
        action={!isEmpty && <Button size="lg">Upload statement</Button>}
      />

      {isEmpty ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon" className="size-12">
              <HugeiconsIcon icon={File02Icon} className="size-6" />
            </EmptyMedia>

            <EmptyTitle className="text-base">
              No statements uploaded yet
            </EmptyTitle>
            <EmptyDescription className="text-sm">
              Upload a bank statement to start tracking your transactions
              automatically.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button size="lg">Upload statement</Button>
          </EmptyContent>
        </Empty>
      ) : (
        <>
          <DataTable
            columns={statementsColumns}
            data={data?.statements ?? []}
            isLoading={isLoading}
            isError={isError}
            noDataMessage="No statement record match these filters."
          />
          {!isError && !isLoading && (
            <Pagination
              total={data?.meta.total ?? 0}
              perPageOptions={[5, 10, 20, 50]}
            />
          )}
        </>
      )}
    </div>
  );
}
