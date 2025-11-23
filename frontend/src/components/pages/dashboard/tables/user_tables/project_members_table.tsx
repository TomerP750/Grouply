import { useEffect, useState } from "react";
import { BiCheck, BiEdit, BiTrash, BiX } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ProjectRole } from "../../../../../dtos/enums/ProjectRole";
import type { ProjectMemberDTO } from "../../../../../dtos/models_dtos/project_member_dto";
import projectMemberService from "../../../../../service/project_member_service";
import { Dialog } from "../../../../elements/Dialog";
import { DataTable } from "../admin_tables/data_table";
import { usePagination } from "../../../../../util/helper_hooks";
import { extractPageCount } from "../../../../../util/pagination_helper";
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";

export interface ChangeUserRoleDTO {
  memberId: number;
  projectId: number;
  role: ProjectRole;
}

const buttonStyle =
  "inline-flex items-center gap-1 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50";
const ch = createColumnHelper<ProjectMemberDTO>();

export function ProjectMembersTable() {

  const params = useParams();
  const projectId = Number(params.id);

  const [selectedRole, setSelectedRole] = useState<ProjectRole>();
  const [editedMemberId, setEditedMemberId] = useState<number | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);

  const [rows, setRows] = useState<ProjectMemberDTO[]>([]);

  const { pagination, setPagination, pageCount, setPageCount } = usePagination();

  // ───────────────────────────────── Columns ─────────────────────────────────

  const columns: ColumnDef<ProjectMemberDTO, any>[] = [
    
    // #
    ch.accessor("id", {
      header: "#",
      cell: (info) => <span>{info.getValue()}</span>,
    }),

    // First name
    ch.accessor(
      (row) => row.user.firstName,
      {
        id: "firstName",
        header: "First Name",
        cell: (info) => <span>{info.getValue()}</span>,
      }
    ),

    // Last name
    ch.accessor(
      (row) => row.user.lastName,
      {
        id: "lastName",
        header: "Last Name",
        cell: (info) => <span>{info.getValue()}</span>,
      }
    ),

    // Username
    ch.accessor(
      (row) => row.user.username,
      {
        id: "username",
        header: "Username",
        cell: (info) => {
          const value = info.getValue() as string;
          return (
            <span
              className="block max-w-[260px] truncate"
              title={value}
            >
              {value}
            </span>
          );
        },
      }
    ),

    // Position
    ch.accessor("projectPosition", {
      header: "Position",
      cell: (info) => <span>{String(info.getValue())}</span>,
      sortingFn: "alphanumeric",
    }),

    // Role 
    ch.accessor("projectRole", {
      header: "Role",
      cell: (info) => {
        const member = info.row.original;
        const role = info.getValue() as ProjectRole;
        const isEditing = editedMemberId === member.id;

        const currentValue =
          isEditing && selectedRole !== undefined ? selectedRole : role;

        if (isEditing) {
          return (
            <select
              value={currentValue}
              onChange={(e) =>
                setSelectedRole(e.target.value as ProjectRole)
              }
              className="border rounded px-2 py-1  text-sm"
            >
              {Object.values(ProjectRole).map((r) => (
                <option key={r} value={r} className="dark:bg-slate-700 dark:even:bg-slate-800">
                  {r}
                </option>
              ))}
            </select>
          );
        }

        return (
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ${getRoleStyle(
              role
            )}`}
          >
            {role}
          </span>
        );
      },
      sortingFn: "alphanumeric",
    }),

    // Actions
    ch.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const member = row.original;
        const isEditing = editedMemberId === member.id;

        return (
          <div className="flex items-center gap-3">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={() => handleEdit(member.id, projectId)}
                  className={`${buttonStyle} text-emerald-500`}
                  disabled={!selectedRole}
                >
                  <BiCheck size={18} />
                  <span>Save</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditedMemberId(undefined);
                    setSelectedRole(undefined);
                  }}
                  className={`${buttonStyle} text-slate-400`}
                >
                  <BiX size={18} />
                  <span>Cancel</span>
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => handleOpenEdit(member)}
                  className={`${buttonStyle} dark:text-gray-200`}
                >
                  <BiEdit size={18} />
                  <span>Edit role</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedMemberId(member.id);
                    setDialogOpen(true);
                  }}
                  className={`${buttonStyle} text-red-500`}
                >
                  <BiTrash size={18} />
                  <span>Remove</span>
                </button>
              </>
            )}
          </div>
        );
      },
      enableSorting: false,
    }),
  ];

  // ─────────────────────────────── Data fetch ────────────────────────────────

  useEffect(() => {
    setLoading(true);
    projectMemberService
      .allMembersPagination(
        projectId,
        pagination.pageIndex,
        pagination.pageSize
      )
      .then((res) => {
        setRows(res.content);
        setPageCount(extractPageCount(res, pagination.pageSize));
      })
      .catch((err) => {
        toast.error(err.response?.data);
      })
      .finally(() => setLoading(false));
  }, [projectId, pagination.pageIndex, pagination.pageSize, setPageCount]);

  // ─────────────────────────────── Handlers ────────────────────────────────

  const handleOpenEdit = (member: ProjectMemberDTO) => {
    setEditedMemberId(member.id);
    setSelectedRole(member.projectRole);
  };

  const handleEdit = (memberId: number, projectId: number) => {
    if (!selectedRole) return;

    const data: ChangeUserRoleDTO = {
      memberId,
      projectId,
      role: selectedRole,
    };

    projectMemberService
      .changeMemberRole(data)
      .then(() => {
        toast.success("Changed role");
        setRows((prev) =>
          prev.map((m) =>
            m.id === memberId ? { ...m, projectRole: selectedRole } : m
          )
        );
      })
      .catch((err) => {
        toast.error(err.response?.data ?? "Failed to change role");
      })
      .finally(() => {
        setEditedMemberId(undefined);
        setSelectedRole(undefined);
      });
  };

  const handleRemove = (memberId: number, projectId: number) => {
    projectMemberService
      .removeMemberFromProject(memberId, projectId)
      .then(() => {
        toast.success("Removed member");
        setRows((prev) => prev.filter((m) => m.id !== memberId));
        setDialogOpen(false);
        setSelectedMemberId(null);
      })
      .catch((err) => {
        toast.error(err.response?.data ?? "Failed to remove member");
      });
  };

  // ───────────────────────────────── Render ─────────────────────────────────

  return (
    <main>
      <DataTable<ProjectMemberDTO>
        columns={columns}
        rows={rows}
        pageCount={pageCount}
        pagination={pagination}
        setPagination={setPagination}
        loading={loading}
        emptyMessage="No members"
        enableSorting
        className="shadow-md dark:text-white p-5"
      />

      {dialogOpen && (
        <Dialog
          open={dialogOpen}
          message={"Are you sure you want to remove this member?"}
          onClose={() => {
            setDialogOpen(false);
            setSelectedMemberId(null);
          }}
          onConfirm={() => {
            if (selectedMemberId != null) {
              handleRemove(selectedMemberId, projectId);
            }
          }}
        />
      )}
    </main>
  );
}

// ────────────────────────────── Role styling ───────────────────────────────

const getRoleStyle = (role: ProjectRole) => {
  switch (role) {
    case ProjectRole.OWNER:
      return "bg-amber-500/10 text-amber-400 ring-amber-400/25";
    case ProjectRole.MODERATOR:
      return "bg-violet-500/10 text-violet-400 ring-violet-400/25";
    case ProjectRole.MEMBER:
      return "bg-slate-700/40 text-slate-300 ring-slate-500/20";
    default:
      return "bg-slate-800/60 text-slate-300 ring-white/10";
  }
};
