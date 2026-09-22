import type { DataTableColumnDef } from "@/components/common/data-table";
import type { Transaction } from "@/features/transactions/types/transactions.types";
import {
  DateCell,
  TypeCell,
  AmountCell,
  CategoryCell,
} from "@/components/common/transaction-cells";

export const latestTransactionsColumns: DataTableColumnDef<Transaction>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: (props) => <DateCell transaction={props.row.original} />,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: (props) => (
      <span
        className="block max-w-32 truncate text-sm text-foreground"
        title={props.getValue<string>()}
      >
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
];
