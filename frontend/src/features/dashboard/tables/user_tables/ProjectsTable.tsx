import { useEffect, useMemo, useState } from "react";
import {
  createColumnHelper,
  type ColumnDef,
} from "@tanstack/react-table";
import { BiPencil, BiPlus, BiTrash, BiX } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { ProjectStatus } from "../../../../shared/models/project/ProjectStatus";
import type { ProjectDTO } from "../../../feed/posts/models/ProjectDto";
import { useUser } from "../../../../shared/store/hooks";
import projectService from "../../../../shared/api/projectService";
import type { UpdateProjectDTO } from "../../shared/models/UpdateProjectDto";
import { StatusBadge } from "../../../../shared/utils/enum_ui";
import { Dialog } from "../../../../shared/ui/Dialog";
import { Modal } from "../../../../shared/ui/Modal";
import { toNormal, fmtDate } from "../../../../shared/utils/string_formats";
import { CreateProjectForm } from "../../shared/forms/create_project_form";




const ch = createColumnHelper<ProjectDTO>();

export function ProjectsTable() {

  const [pageCount, setPageCount] = useState(0);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const [modalOpen, setModalOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);


  const [editedProjectId, setEditedProjectId] = useState<number>(0);
  const [selectedProjectId, setSelectedProjectId] = useState<number>(0); // this is for deleting a row (project)
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus>();
  const [name, setName] = useState<string>('');

  const navigate = useNavigate();
  const user = useUser();

  
  const handleEditOpen = (id: number, currentName: string, currentStatus: ProjectStatus) => {
    setEditedProjectId(id);
    setName(currentName);
    setSelectedStatus(currentStatus);
  }


  const handleUpdate = () => {

    const dataToSend: UpdateProjectDTO = {
      projectId: editedProjectId,
      name: name,
      status: selectedStatus!
    }

    projectService.updateProject(dataToSend)
      .then(() => {
        // setRows(prev => prev.map(p =>
        //   p.id === editedProjectId ? { ...p, name, status: selectedStatus } : p
        // ));
        setEditedProjectId(0);
        toast.success("Project updated!");
      })
      .catch(err => {
        toast.error(err.response.data);
      })


  };

  // const handleDeleteProject = (id: number) => {

  //   projectService
  //     .deleteProject(id)
  //     .then(() => {
  //       setRows((prev) => prev.filter((p) => p.id !== id));
  //       toast.success("Project deleted");
  //     })
  //     .catch((err) => toast.error(err?.response?.data ?? "Delete failed"))
  //     .finally(() => setDialogOpen(false));

  // };

  const columns: ColumnDef<ProjectDTO, any>[] = useMemo(
    () => [
      ch.accessor("id", {
        header: "#",
        cell: (i) => <span>{i.getValue()}</span>,
      }),

      ch.accessor("name", {
        header: "Name",
        cell: (i) => {
          const projectId = i.row.original.id;
          const isEditing = projectId === editedProjectId;

          if (isEditing) {
            return (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-[260px] border rounded px-2 py-1"
              />
            );
          }

          return (
            <span
              className="block max-w-[260px] truncate"
              title={String(i.getValue())}
            >
              {i.getValue()}
            </span>
          );
        },
      }),


      ch.accessor("status", {
        header: "Status",
        cell: (ctx) => {
          const projectId = ctx.row.original.id;
          const current = ctx.getValue() as ProjectStatus;
          const isEditing = projectId === editedProjectId;

          if (!isEditing) return <StatusBadge status={current} />;

          return (
            <select
              key={projectId}
              value={selectedStatus ?? current}
              onChange={(e) => setSelectedStatus(e.target.value as ProjectStatus)}
              className="border rounded px-2 py-1 bg-slate-800 text-white"
            >
              {Object.values(ProjectStatus).map((s) => (
                <option key={s} value={s}>
                  {toNormal(s)}
                </option>
              ))}
            </select>
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
            className="cursor-pointer hover:underline"
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
          <section className="flex items-center gap-2 font-medium">
            {editedProjectId === row.original.id ? (
              <div className="flex items-center gap-3">
                <button onClick={handleUpdate} className="inline-flex gap-1 items-center text-green-600 rounded px-2 py-1 hover:underline">
                  <BiPencil size={20} /><span>Save</span>
                </button>
                <button type="button" onClick={() => setEditedProjectId(0)} className="inline-flex items-center gap-1 text-gray-400 rounded px-2 py-1 hover:underline">
                  <BiX size={20} /><span>Cancel</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleEditOpen(row.original.id, row.original.name, row.original.status)}
                  className="cursor-pointer inline-flex gap-1 items-center rounded px-2 py-1 hover:underline"
                >
                  <BiPencil size={20} /><span>Edit</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProjectId(row.original.id);
                    setDialogOpen(true);
                  }}
                  className="cursor-pointer inline-flex items-center gap-1 text-rose-600 bg-red-800/20 rounded px-2 py-1 hover:underline"
                >
                  <BiTrash size={20} /><span>Delete</span>
                </button>
              </div>
            )}
          </section>
        ),
        enableSorting: false,
      }),
    ],
    [editedProjectId, name, selectedStatus, navigate, user.sub]
  );

  return (
    <main className="w-full p-4 dark:text-white">

      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Projects</h2>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="cursor-pointer inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
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

      {/* <DataTable<ProjectDTO>
        columns={columns}
        rows={rows}
        pageCount={pageCount}
        pagination={pagination}
        setPagination={setPagination}
        loading={loading}
        emptyMessage="No projects"
        enableSorting
        className="shadow-md"
      /> */}

      {/* {dialogOpen && (
        <Dialog
          open={dialogOpen}
          message={"Are you sure you want to delete?"}
          onClose={() => setDialogOpen(false)}
          onConfirm={() => handleDeleteProject(editedProjectId)} type={"danger"} />
      )} */}
    </main>
  );
}
