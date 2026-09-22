import { Link, useParams, useSearchParams } from "react-router";
import { useStatement } from "../hooks/use-statement";
import { useStatementStats } from "../hooks/use-statement-stats";
import { useStatementTransactions } from "../hooks/use-statement-transactions";
import { DataTable } from "@/components/common/data-table";
import { Pagination } from "@/components/common/pagination";
import { StatTile } from "@/components/common/stat-tile";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { formatNaira } from "@/lib/money";
import {
  Exchange01Icon,
  ArrowUp01Icon,
  ArrowDown01Icon,
  Wallet01Icon,
} from "@hugeicons/core-free-icons";
import { statementTransactionsColumns } from "../components/statement-transactions.column";

export function StatementDetails() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();

  const params = {
    page: Number(searchParams.get("page") ?? 1),
    limit: Number(searchParams.get("limit") ?? 20),
  };

  const { data: statement } = useStatement(id!);
  const { data: stats } = useStatementStats(id!);
  const { data, isLoading, isError } = useStatementTransactions(id!, params);

  return (
    <div>
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link to="/statements" />}>
              Statements
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {statement?.filename ?? "Statement details"}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile
          label="Transactions"
          value={stats ? String(stats.totalTransactions) : "—"}
          icon={Exchange01Icon}
        />
        <StatTile
          label="Total credit"
          value={stats ? formatNaira(stats.totalCredit) : "—"}
          icon={ArrowUp01Icon}
          iconClassName="bg-primary/10 text-primary"
        />
        <StatTile
          label="Total debit"
          value={stats ? formatNaira(stats.totalDebit) : "—"}
          icon={ArrowDown01Icon}
          iconClassName="bg-destructive/10 text-destructive"
        />
        <StatTile
          label="Net"
          value={stats ? formatNaira(stats.net) : "—"}
          icon={Wallet01Icon}
        />
      </div>

      <DataTable
        columns={statementTransactionsColumns}
        data={data?.transactions ?? []}
        isLoading={isLoading}
        isError={isError}
        noDataMessage="No transactions found for this statement."
      />
      {!isError && !isLoading && (
        <Pagination
          total={data?.meta.total ?? 0}
          perPageOptions={[10, 20, 50]}
        />
      )}
    </div>
  );
}
