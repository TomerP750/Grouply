import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { BiEdit, BiTrash, BiX } from "react-icons/bi";
import { toast } from "react-toastify";
import type { TechnologyDTO } from "../../../../../dtos/models_dtos/TechnologyDTO";
import technologyService from "../../../../../service/technology_service";
import { usePagination } from "../../../../../util/helper_hooks";
import { extractPageCount } from "../../../../../util/pagination_helper";
import { Dialog } from "../../../../elements/Dialog";
import { DataTable } from "./data_table";

const ch = createColumnHelper<TechnologyDTO>();

export function TechnologiesTable() {
  // States
  const [technologies, setTechnologies] = useState<TechnologyDTO[]>([]);

  const { pageCount, setPageCount, pagination ,setPagination } = usePagination(10);

  const [loading, setLoading] = useState(true);

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const [editedTechId, setEditedTechId] = useState<number | undefined>();
  const [selectedTechId, setSelectedTechId] = useState<number | undefined>();
  const [techName, setTechName] = useState<string>('');

  // UseEffects
  useEffect(() => {
    setLoading(true);
    technologyService
      .allTechnologiesPage(pagination.pageIndex, pagination.pageSize)
      .then((res) => {
        setTechnologies(res.content);
        setPageCount(extractPageCount(res, pagination.pageSize));
      })
      .catch((err) =>
        toast.error(err?.response?.data ?? "Failed to load technologies")
      )
      .finally(() => setLoading(false));
  }, [pagination.pageIndex, pagination.pageSize]);

  // Functions
  const handleEditOpen = (id: number) => {
    setEditedTechId(id);
  };

  const handleDelete = (id: number) => {
    technologyService.deleteTechnology(id)
    .then(() => {
      setTechnologies(prev => prev.filter(t => t.id !== id))
      setDialogOpen(false)
    })
    .catch(err => {
      toast.error(err.response.data);
    })
  }


  // Columns

  const techColumns: ColumnDef<TechnologyDTO, any>[] = [
    ch.accessor("id", { header: "#", cell: (i) => i.getValue() }),

    ch.accessor("name", {
      header: "Name",
      cell: (ctx) => {
        const { id, name } = ctx.row.original;
        const isEditing = id === editedTechId;

        return isEditing ? (
          <input
            type="text"
            className="block w-[260px] rounded-md bg-slate-800 px-2 py-1 text-slate-100 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
            value={name}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <span className="block max-w-[260px] truncate">{ctx.getValue()}</span>
        );
      },
    }),

    ch.accessor("slug", {
      header: "Slug",
      cell: (i) => (
        <span className="block max-w-[260px] truncate">{i.getValue()}</span>
      ),
    }),

    ch.accessor("color", {
      header: "Color",
      cell: (ctx) => {
        const { id, color } = ctx.row.original;
        const isEditing = id === editedTechId;

        return isEditing ? (
          <input
            type="text"
            className="block w-[160px] rounded-md bg-slate-800 px-2 py-1 text-slate-100 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
            value={color}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <span className="block max-w-[260px] truncate">{ctx.getValue()}</span>
        );
      },
    }),

    ch.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const techId = row.original.id;
        const isEditing = techId === editedTechId;

        return isEditing ? (
          <div className="flex items-center gap-2 font-medium">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEditOpen(row.original.id);
              }}
              className="cursor-pointer inline-flex gap-1 text-green-600 hover:text-green-500 items-center rounded px-2 py-1"
            >
              <BiEdit size={18} />
              <span>Save</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setEditedTechId(undefined);
              }}
              className="cursor-pointer inline-flex items-center gap-1 rounded text-gray-300"
            >
              <BiX size={22} />
              <span>Cancel</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 font-medium">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEditOpen(row.original.id);
              }}
              className="cursor-pointer inline-flex gap-1 hover:text-gray-300 items-center rounded px-2 py-1"
            >
              <BiEdit size={18} />
              <span>Edit</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedTechId(techId);
                setTechName(row.original.name)
                setDialogOpen(true);
              }}
              className="cursor-pointer inline-flex gap-1 rounded px-2 py-1 text-red-400 hover:text-red-500"
            >
              <BiTrash size={18} />
              <span>Delete</span>
            </button>
          </div>
        );
      },
      enableSorting: false,
    }),
  ];

  return (
    <div className="w-full p-4 dark:text-white">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Technologies</h2>
        <button
          type="button"
          onClick={() => { }}
          className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Add Technology
        </button>
      </div>

      <DataTable<TechnologyDTO>
        columns={techColumns}
        rows={technologies}
        pageCount={pageCount}
        pagination={pagination}
        setPagination={setPagination}
        loading={loading}
        emptyMessage="No technologies"
        enableSorting
        className="shadow-md"
      />

      {dialogOpen && (
        <Dialog
          title="Delete Technology"
          message={`Are you sure you want to delete ${techName} ?`}
          open={dialogOpen}
          onConfirm={() => handleDelete(selectedTechId!)}
          onClose={() => setDialogOpen(false)}
        />
      )}
    </div>
  );
}
