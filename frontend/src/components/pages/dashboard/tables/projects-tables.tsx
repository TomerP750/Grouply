import { useEffect, useMemo, useState } from "react";
import {
  createColumnHelper,
  type ColumnDef,
} from "@tanstack/react-table";
import { BiPencil, BiPlus, BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { ProjectStatus } from "../../../../dtos/enums/ProjectStatus";
import type { ProjectDTO } from "../../../../dtos/models_dtos/ProjectDTO";
import { useUser } from "../../../../redux/hooks";
import projectService from "../../../../service/ProjectService";
import { fmtDate, toNormal } from "../../../../util/util_functions";
import { Dialog } from "../../../elements/Dialog";
import { Modal } from "../../../elements/Modal";
import { CreateProjectForm } from "../forms/create_project_form";
import { DataTable } from "./admin_tables/data_table";

function StatusBadge({ status }: { status: ProjectStatus }) {
  let styles = "bg-slate-500/15 text-slate-400";
  switch (status) {
    case ProjectStatus.IN_PROGRESS:
      styles = "bg-teal-600/15 text-teal-500";
      break;
    case ProjectStatus.PREPARATION:
      styles = "bg-amber-500/15 text-amber-500";
      break;
    case ProjectStatus.COMPLETED:
      styles = "bg-green-500/15 text-green-500";
      break;
  }
  return (
    <span className={`text-xs px-2 py-1 rounded-full font-medium ${styles}`}>
      {toNormal(status)}
    </span>
  );
}

const ch = createColumnHelper<ProjectDTO>();

export function ProjectsTable() {
  const [modalOpen, setModalOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [rows, setRows] = useState<ProjectDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const [editedProjectId, setEditedProjectId] = useState<number>(0);
  const [selectedProjectId, setSelectedProjectId] = useState<number>(0);

  const [pageCount, setPageCount] = useState(0);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const navigate = useNavigate();
  const user = useUser();

  useEffect(() => {
    setLoading(true);
    projectService
      .getUserOwnedProjectsPagination(pagination.pageIndex, pagination.pageSize)
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
      .catch((err) =>
        toast.error(err?.response?.data ?? "Failed to load projects")
      )
      .finally(() => setLoading(false));
  }, [pagination.pageIndex, pagination.pageSize]);

  const handleStatusChange = (projectId: number, next: ProjectStatus) => {
    // optimistic UI
    setRows((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, status: next } : p))
    );

    projectService
      .updateProjectStatus(projectId, next) 
      .then(() => {
        toast.success("Status updated");
        setEditedProjectId(0);
      })
      .catch((err) => {
        
        setRows((prev) =>
          prev.map((p) =>
            p.id === projectId ? { ...p, status: prev.find(x => x.id === projectId)?.status! } : p
          )
        );
        toast.error(err?.response?.data ?? "Failed to update status");
      });
  };

  const handleDeleteProject = (id: number) => {
    projectService
      .deleteProject(id)
      .then(() => {
        setRows((prev) => prev.filter((p) => p.id !== id));
        toast.success("Project deleted");
      })
      .catch((err) => toast.error(err?.response?.data ?? "Delete failed"))
      .finally(() => setDialogOpen(false));
  };

  const columns: ColumnDef<ProjectDTO, any>[] = useMemo(
    () => [
      ch.accessor("id", {
        header: "#",
        cell: (i) => <span>{i.getValue()}</span>,
      }),

      ch.accessor("name", {
        header: "Name",
        cell: (i) => (
          <span
            className="block max-w-[260px] truncate"
            title={String(i.getValue())}
          >
            {i.getValue()}
          </span>
        ),
      }),

      ch.accessor("status", {
        header: "Status",
        cell: (i) => {
          const projectId = i.row.original.id;
          const status = i.getValue();
          const isEditing = projectId === editedProjectId;

          return isEditing ? (
            <select
              value={status}
              onChange={(e) =>
                handleStatusChange(projectId, e.target.value as ProjectStatus)
              }
              onBlur={() => setEditedProjectId(0)}
              className="border rounded px-2 py-1 bg-slate-800 text-white"
            >
              <option value="PREPARATION">Preparation</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
          ) : (
            <StatusBadge status={status} />
          );
        },
        sortingFn: "alphanumeric",
      }),

      ch.accessor("createdAt", {
        header: "Created",
        cell: (i) => fmtDate(i.getValue()),
        sortingFn: "datetime",
      }),

      ch.display({
        id: "members",
        header: "Members",
        cell: ({ row }) => (
          <button
            className="cursor-pointer hover:underline min-w-[140px]"
            onClick={(e) => {
              e.stopPropagation();
              navigate(
                `/dashboard/${user.sub}/project-members/${row.original.id}`
              );
            }}
          >
            View Members
          </button>
        ),
        enableSorting: false,
      }),

      ch.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 font-medium">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setEditedProjectId(row.original.id);
              }}
              className="inline-flex gap-1 items-center cursor-pointer rounded px-2 py-1 hover:underline"
            >
              <BiPencil size={20} />
              <span>Edit</span>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedProjectId(row.original.id);
                setDialogOpen(true);
              }}
              className="inline-flex items-center gap-1 cursor-pointer rounded px-2 py-1 text-red-600 hover:underline"
            >
              <BiTrash size={20} />
              <span>Delete</span>
            </button>
          </div>
        ),
        enableSorting: false,
      }),
    ],
    [editedProjectId, navigate, user.sub]
  );

  return (
    <div className="w-full p-4 dark:text-white">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Projects</h2>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <BiPlus size={20} />
          Create Project
        </button>
      </div>

      {modalOpen && (
        <Modal
          className="dark:bg-gradient-to-br dark:from-slate-900 via-teal-950 to-slate-800"
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        >
          <CreateProjectForm onClose={() => setModalOpen(false)} />
        </Modal>
      )}

      <DataTable<ProjectDTO>
        columns={columns}
        rows={rows}
        pageCount={pageCount}
        pagination={pagination}
        setPagination={setPagination}
        loading={loading}
        emptyMessage="No projects"
        enableSorting
        onRowClick={(row) => {
          // optional: navigate to a project details page
          // navigate(`/dashboard/${user.sub}/projects/${row.id}`)
          // or do nothing:
          return;
        }}
        className="shadow-md"
      />

      {dialogOpen && (
        <Dialog
          open={dialogOpen}
          message={"Are you sure you want to delete?"}
          onClose={() => setDialogOpen(false)}
          onConfirm={() => handleDeleteProject(selectedProjectId)}
        />
      )}
    </div>
  );
}
