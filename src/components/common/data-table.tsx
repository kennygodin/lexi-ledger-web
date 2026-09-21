import { flexRender, useTable, type ColumnDef } from "@tanstack/react-table";
import {
  tableFeatures,
  stockFeatures,
  type RowData,
} from "@tanstack/table-core";
import { HugeiconsIcon } from "@hugeicons/react";
import { AlertCircleIcon } from "@hugeicons/core-free-icons";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const dataTableFeatures = tableFeatures({
  ...stockFeatures,
});

export type DataTableColumnDef<
  TData extends RowData,
  TValue = unknown,
> = ColumnDef<typeof dataTableFeatures, TData, TValue>;

interface DataTableProps<TData extends RowData> {
  columns: DataTableColumnDef<TData>[];
  data: TData[];
  isLoading?: boolean;
  isError: boolean;
  noDataMessage?: string;
  onSelectionChange?: (rows: TData[]) => void;
}

export function DataTable<TData extends RowData>({
  columns,
  data,
  isLoading = false,
  isError,
  noDataMessage = "No data available.",
  onSelectionChange,
}: DataTableProps<TData>) {
  const [rowSelection, setRowSelection] = useState({});

  const table = useTable({
    features: dataTableFeatures,
    data,
    columns,
    state: {
      rowSelection,
    },
    onRowSelectionChange: (updater) => {
      const updated =
        typeof updater === "function" ? updater(rowSelection) : updater;

      setRowSelection(updated);

      if (onSelectionChange) {
        const selectedRows = Object.keys(updated)
          .map((key) => data[Number(key)])
          .filter(Boolean);

        onSelectionChange(selectedRows);
      }
    },
  });

  if (isLoading) {
    return <DataTableSkeleton columns={columns.length} rows={5} />;
  }

  if (isError) {
    return (
      <div className="my-4 flex flex-col items-center justify-center gap-3 border border-destructive/20 bg-destructive/5 p-6 text-center">
        <HugeiconsIcon
          icon={AlertCircleIcon}
          className="size-8 text-destructive"
        />

        <div>
          <p className="text-sm font-medium text-destructive">
            Something went wrong
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            We couldn't load this data. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <Table>
        <TableHeader className="">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border-b-0 text-sm">
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {data.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="border-b-0">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className="border-b-0">
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {noDataMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

interface DataTableSkeletonProps {
  columns?: number;
  rows?: number;
}

function DataTableSkeleton({ columns = 4, rows = 5 }: DataTableSkeletonProps) {
  return (
    <div className="mt-4 overflow-hidden">
      <Table>
        <TableHeader className="bg-muted">
          <TableRow className="border-b-0 hover:bg-muted">
            {Array.from({ length: columns }).map((_, index) => (
              <TableHead className="p-4" key={index}>
                <Skeleton className="h-4 w-24" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={rowIndex} className="border-b-0">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <TableCell className="p-4" key={colIndex}>
                  <Skeleton className="h-4 w-full max-w-37.5" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
