import { useEffect, useMemo, useState } from "react";
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { toast } from "react-toastify";
import type { TechnologyDTO } from "../../../../../dtos/models_dtos/TechnologyDTO";
import technologyService from "../../../../../service/technology_service";
import { DataTable } from "./data_table";


const ch = createColumnHelper<TechnologyDTO>();

const techColumns: ColumnDef<TechnologyDTO, any>[] = [
  ch.accessor("id", { header: "#", cell: (i) => i.getValue() }),
  ch.accessor("name", {
    header: "Name",
    cell: (i) => <span className="block max-w-[260px] truncate">{i.getValue()}</span>,
  }),
  ch.accessor("slug", {
    header: "Slug",
    cell: (i) => <span className="block max-w-[260px] truncate">{i.getValue()}</span>,
  }),
  ch.display({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 font-medium">
        <button
          onClick={(e) => {
            e.stopPropagation();
            // handleEdit(row.original.id);
          }}
          className="cursor-pointer rounded text-teal-400 hover:text-teal-300 px-2 py-1"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            // handleDelete(row.original.id);
          }}
          className="cursor-pointer rounded px-2 py-1 text-red-400 hover:text-red-500"
        >
          Delete
        </button>
      </div>
    ),
    enableSorting: false,
  }),
];

export function TechnologiesTable() {
  const [rows, setRows] = useState<TechnologyDTO[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    technologyService
      .allTechnologiesPage(pagination.pageIndex, pagination.pageSize)
      .then((res) => {
        setRows(res.content);
        const computed =
          (typeof res.totalPages === "number" && res.totalPages > 0
            ? res.totalPages
            : undefined) ??
          (typeof res.totalElements === "number"
            ? Math.max(1, Math.ceil(res.totalElements / pagination.pageSize))
            : 1);
        setPageCount(computed);
      })
      .catch((err) => toast.error(err?.response?.data ?? "Failed to load technologies"))
      .finally(() => setLoading(false));
  }, [pagination.pageIndex, pagination.pageSize]);

  return (
    <div className="w-full p-4 dark:text-white">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Technologies</h2>
        <button
          type="button"
          onClick={() => {}}
          className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Add Technology
        </button>
      </div>

      <DataTable<TechnologyDTO>
        columns={techColumns}
        rows={rows}
        pageCount={pageCount}
        pagination={pagination}
        setPagination={setPagination}
        loading={loading}
        emptyMessage="No technologies"
        enableSorting
        onRowClick={(row) => console.log("Row clicked:", row)}
        className="shadow-md"
      />
    </div>
  );
}
