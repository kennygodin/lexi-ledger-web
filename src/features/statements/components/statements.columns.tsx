import { Link } from "react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import { EyeIcon } from "@hugeicons/core-free-icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
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
  const isActive = status === "pending" || status === "processing";

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-sm font-medium ${STATUS_STYLES[status]}`}
    >
      {isActive && <Spinner className="size-3" />}
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
          <p className="text-sm font-medium text-foreground">
            {statement.filename}
          </p>
          {statement.status === "failed" && statement.failureReason && (
            <p
              className="max-w-xs truncate text-sm text-destructive"
              title={statement.failureReason}
            >
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
  {
    id: "actions",
    header: "",
    cell: (props) => {
      const statement = props.row.original;
      const canView = statement.status === "parsed";

      if (!canView) {
        return (
          <Button
            variant="ghost"
            size="icon-sm"
            disabled
            title="Available once this statement has finished processing"
          >
            <HugeiconsIcon icon={EyeIcon} />
          </Button>
        );
      }

      return (
        <Link
          to={`/statements/${statement.id}`}
          className={buttonVariants({ variant: "ghost", size: "icon-sm" })}
          aria-label="View statement"
        >
          <HugeiconsIcon icon={EyeIcon} />
        </Link>
      );
    },
  },
];
