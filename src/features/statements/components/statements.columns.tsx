import type { DataTableColumnDef } from "@/components/common/data-table";
import type { Statement, StatementStatus } from "../types/statements.types";

const STATUS_STYLES: Record<StatementStatus, string> = {
  pending: "bg-muted text-muted-foreground",
  processing: "bg-amber-500/10 text-amber-600",
  parsed: "bg-primary/10 text-primary",
  failed: "bg-destructive/10 text-destructive",
};

const STATUS_LABELS: Record<StatementStatus, string> = {
  pending: "Pending",
  processing: "Processing",
  parsed: "Parsed",
  failed: "Failed",
};

function StatementStatusBadge({ status }: { status: StatementStatus }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-sm font-medium ${STATUS_STYLES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

function formatUploadedAt(value: string) {
  return new Intl.DateTimeFormat("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export const statementsColumns: DataTableColumnDef<Statement>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: (props) => (
      <span className="font-mono text-sm text-muted-foreground">
        {props.getValue<string>().slice(0, 8)}
      </span>
    ),
  },
  {
    accessorKey: "filename",
    header: "Bank Statement",
    cell: (props) => {
      const statement = props.row.original;
      return (
        <div>
          <p className="text-foreground text-sm">{statement.filename}</p>
          {statement.status === "failed" && statement.failureReason && (
            <p className="text-sm text-destructive">
              {statement.failureReason}
            </p>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (props) => (
      <StatementStatusBadge status={props.getValue<StatementStatus>()} />
    ),
  },
  {
    accessorKey: "uploadedAt",
    header: "Uploaded",
    cell: (props) => (
      <span className="text-foreground text-sm">
        {formatUploadedAt(props.getValue<string>())}
      </span>
    ),
  },
];
