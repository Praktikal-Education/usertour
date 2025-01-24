"use client";

import * as React from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@usertour-ui/table";
import { DataTablePagination } from "../components/data-table-pagination";
import { DataTableToolbar } from "../components/data-table-toolbar";
import { columns, columnsSystem } from "../components/columns";
import { useUserListContext } from "@/contexts/user-list-context";
import { Segment } from "@usertour-ui/types";
import { useAttributeListContext } from "@/contexts/attribute-list-context";
import { DataTableColumnHeader } from "./data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import { Flow } from "../data/schema";
import { useNavigate } from "react-router-dom";
import { isUndefined } from "@usertour-ui/shared-utils";

interface TableProps {
  published: boolean;
  segment: Segment;
}

export function DataTable({ segment }: TableProps) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [customColumns, setCustomColumns] =
    React.useState<typeof columns>(columns);
  const { setQuery, setPagination, pagination, pageCount, contents } =
    useUserListContext();
  const { attributeList } = useAttributeListContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    setQuery({ segmentId: segment.id });
  }, [segment]);

  React.useEffect(() => {
    const attrList = attributeList?.filter((attr) => attr.bizType == 1);
    if (attrList && attrList?.length > 0) {
      const _customColumns: ColumnDef<Flow>[] = [];
      const _columnVisibility: VisibilityState = {
        environmentId: false,
        id: false,
      };
      for (const attribute of attrList) {
        const displayName = attribute.displayName || attribute.codeName;
        _columnVisibility[attribute.codeName] =
          segment.columns && segment.columns[attribute.codeName] ? true : false;
        _customColumns.push({
          accessorKey: attribute.codeName,
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title={displayName} />
          ),
          cell: ({ row }) => (
            <div className="px-2">
              {!isUndefined(row.getValue(attribute.codeName))
                ? `${row.getValue(attribute.codeName)}`
                : ""}
            </div>
          ),
          enableSorting: false,
          enableHiding: true,
        });
      }
      setCustomColumns([...columns, ...columnsSystem, ..._customColumns]);
      setColumnVisibility({ ..._columnVisibility });
    }
  }, [attributeList, segment.columns]);

  const handlerOnClick = (environmentId: string, id: string) => {
    navigate(`/env/${environmentId}/user/${id}`);
  };

  const table = useReactTable({
    data: contents,
    columns: customColumns,
    pageCount,
    manualPagination: true,
    state: {
      sorting,
      pagination,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="space-y-2">
      <DataTableToolbar table={table} currentSegment={segment} />
      <div className="rounded-md border">
        <Table>
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
                  className="cursor-pointer"
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="leading-8"
                      onClick={() => {
                        if (cell.column.id != "select") {
                          handlerOnClick(
                            row.getValue("environmentId"),
                            row.getValue("id")
                          );
                        }
                      }}
                    >
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
                  colSpan={customColumns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
