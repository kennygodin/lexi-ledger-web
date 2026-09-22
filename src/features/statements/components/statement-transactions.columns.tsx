import type { DataTableColumnDef } from "@/components/common/data-table";
import type { Transaction } from "@/features/transactions/types/transactions.types";
import {
  DateCell,
  TypeCell,
  AmountCell,
  CategoryCell,
  ConfidenceCell,
  TransactionActionsCell,
} from "@/components/common/transaction-cells";

export const statementTransactionsColumns: DataTableColumnDef<Transaction>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: (props) => <DateCell transaction={props.row.original} />,
  },
  {
    accessorKey: "description",
    header: "Description",
    meta: { className: "w-full" },
    cell: (props) => (
      <span className="text-sm text-foreground">
        {props.getValue<string>()}
      </span>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: (props) => <TypeCell transaction={props.row.original} />,
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: (props) => <AmountCell transaction={props.row.original} />,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: (props) => <CategoryCell transaction={props.row.original} />,
  },
  {
    accessorKey: "confidence",
    header: "Confidence",
    cell: (props) => <ConfidenceCell transaction={props.row.original} />,
  },
  {
    id: "actions",
    header: "",
    cell: (props) => (
      <TransactionActionsCell transaction={props.row.original} />
    ),
  },
];
