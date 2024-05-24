"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  StringOrTemplateHeader,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Printer } from "lucide-react";

interface DataTableSearchField {
  key: string;
  placeholder?: string;
}

interface DataTableSearchConfig {
  searchFields: DataTableSearchField[];
}

interface PrintableConfig {
  pdf: boolean;
  orientation: "p" | "l";
}

interface DataTableProps<TData, TValue> {
  readonly columns: ColumnDef<TData, TValue>[];
  readonly data: TData[];
  readonly searchConfig: DataTableSearchConfig;
  readonly pageSize?: number;
  readonly printableConfig?: PrintableConfig;
  readonly id?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchConfig,
  pageSize = 20,
  printableConfig = { pdf: false, orientation: "p" },
  id,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize,
      },
    },
  });

  const handlePrintToPdf = () => {
    const doc = new jsPDF(printableConfig.orientation);
    doc.autoTable({ html: `#${id}` });
    doc.save(`${id}.pdf`);
  };

  return (
    <div>
      {searchConfig.searchFields.length > 0 && (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 py-4">
          {searchConfig.searchFields.map(({ key, placeholder }) => (
            <Input
              key={key}
              placeholder={placeholder ?? "Buscar ..."}
              value={(table.getColumn(key)?.getFilterValue() as string) ?? ""}
              onChange={(event) => {
                return table.getColumn(key)?.setFilterValue(() => {
                  return event.target.value;
                });
              }}
              className="max-w-sm"
            />
          ))}
        </div>
      )}
      {printableConfig.pdf && (
        <div className="flex flex-row justify-end py-4">
          <Button onClick={handlePrintToPdf} size="icon">
            <Printer className="w-4 h-4" />
          </Button>
        </div>
      )}
      <div className="rounded-md border">
        <Table id={id}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No hay registros.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
