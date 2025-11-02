import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { BiChevronLeft, BiChevronRight, BiChevronUp, BiChevronDown, BiLoaderAlt } from "react-icons/bi";

type PaginationState = { pageIndex: number; pageSize: number };

type DataTableProps<T> = {
  columns: ColumnDef<T, any>[];
  rows: T[];
  pageCount: number;                           // total pages from server
  pagination: PaginationState;                
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  loading?: boolean;
  emptyMessage?: string;
  enableSorting?: boolean;                     // defaults true
  onRowClick?: (row: T) => void;
  className?: string;
  pageSizeOptions?: number[];                  // defaults [5, 10, 20, 50]
};

export function DataTable<T>({
  columns,
  rows,
  pageCount,
  pagination,
  setPagination,
  loading = false,
  emptyMessage = "No data",
  enableSorting = true,
  onRowClick,
  className = "",
  pageSizeOptions = [5, 10, 20, 50],
}: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: rows,
    columns,
    state: { pagination, sorting },
    onPaginationChange: setPagination,
    onSortingChange: enableSorting ? setSorting : undefined,
    manualPagination: true,              // server pagination
    pageCount,                           // total pages from server
    getCoreRowModel: getCoreRowModel(),
    ...(enableSorting ? { getSortedRowModel: getSortedRowModel() } : {}),
  });

  const canPrev = pagination.pageIndex > 0;
  const canNext = pagination.pageIndex + 1 < pageCount;


  const tableWrapperCls = useMemo(
    () =>
      `overflow-x-auto rounded-xl border border-slate-300 dark:border-slate-700 shadow-md ${className}`.trim(),
    [className]
  );

  if (loading) {
    return (
      <div className="p-4 text-sm opacity-75">
        <BiLoaderAlt size={30} className="animate-spin dark:text-white" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className={tableWrapperCls}>
        <table className="w-full border-collapse text-left text-sm">
          <thead className="sticky top-0 z-10 bg-slate-100 dark:bg-slate-800/80 backdrop-blur">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((h) => {
                  const canSort = enableSorting && h.column.getCanSort();
                  const dir = enableSorting ? h.column.getIsSorted() : false;
                  return (
                    <th
                      key={h.id}
                      onClick={canSort ? h.column.getToggleSortingHandler() : undefined}
                      className={`px-3 py-2 border-b font-bold border-slate-300 dark:border-slate-700 select-none ${
                        canSort ? "cursor-pointer" : ""
                      }`}
                      title={canSort ? "Click to sort" : undefined}
                    >
                      <div className="inline-flex items-center gap-1">
                        {flexRender(h.column.columnDef.header, h.getContext())}
                        {dir === "asc" && <BiChevronUp className="inline-block" />}
                        {dir === "desc" && <BiChevronDown className="inline-block" />}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row, i) => (
                <tr
                  key={row.id}
                  onClick={onRowClick ? () => onRowClick(row.original) : undefined}
                  className={`transition-colors ${
                    i % 2 === 0
                      ? "bg-slate-50 dark:bg-slate-900/80"
                      : "bg-slate-200/40 dark:bg-slate-800/60"
                  } hover:bg-slate-100 dark:hover:bg-slate-700/70 ${
                    onRowClick ? "cursor-pointer" : ""
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-3 py-2 border-b border-slate-300 dark:border-slate-700"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={table.getAllLeafColumns().length}
                  className="px-3 py-8 text-center text-sm opacity-70"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-3 flex items-center gap-2">
        <button
          className="cursor-pointer py-1 disabled:opacity-50"
          onClick={() => table.previousPage()}
          disabled={!canPrev}
        >
          <BiChevronLeft size={30} />
        </button>
        <button
          className="cursor-pointer py-1 disabled:opacity-50"
          onClick={() => table.nextPage()}
          disabled={!canNext}
        >
          <BiChevronRight size={30} />
        </button>

        <span className="ml-2 text-sm">
          Page {pagination.pageIndex + 1} of {pageCount || 1}
        </span>

        <select
          className="ml-2 px-2 py-1 border rounded text-sm bg-white dark:bg-slate-900"
          value={pagination.pageSize}
          onChange={(e) =>
            setPagination((p) => ({ ...p, pageSize: Number(e.target.value), pageIndex: 0 }))
          }
        >
          {pageSizeOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
