import { useEffect, useMemo, useState } from "react";
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { DataTable } from "./data_table";
import { Role } from "../../../../../dtos/enums/Role";
import type { UserDTO } from "../../../../../dtos/models_dtos/UserDTO";
import { useUser } from "../../../../../redux/hooks";
import userService from "../../../../../service/UserService";

function RoleBadge({ role }: { role: Role }) {
  let styles = "bg-slate-500/15 text-slate-400";
  switch (role) {
    case Role.USER:
      styles = "bg-teal-600/15 text-teal-500";
      break;
    case Role.ADMIN:
      styles = "bg-amber-500/15 text-amber-500";
      break;
    case Role.RECRUITER:
      styles = "bg-purple-500/15 text-purple-400";
      break;
  }
  return <span className={`text-xs px-2 py-1 rounded-full font-medium ${styles}`}>{role}</span>;
}

const ch = createColumnHelper<UserDTO>();

const userColumns: ColumnDef<UserDTO, any>[] = [
  ch.accessor("id", { header: "#", cell: (i) => i.getValue() }),
  ch.accessor("firstName", {
    header: "First name",
    cell: (i) => <span className="block max-w-[260px] truncate">{i.getValue()}</span>,
  }),
  ch.accessor("lastName", {
    header: "Last name",
    cell: (i) => <span className="block max-w-[260px] truncate">{i.getValue()}</span>,
  }),
  ch.accessor("role", {
    header: "Role",
    cell: (i) => <RoleBadge role={i.getValue()} />,
    sortingFn: "alphanumeric",
  }),
  ch.accessor("email", {
    header: "Email",
    cell: (i) => <span className="block max-w-[260px] truncate">{i.getValue()}</span>,
  }),
  ch.accessor("username", {
    header: "Username",
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
            handleEdit(row.original.id);
          }}
          className="cursor-pointer rounded text-teal-400 hover:text-teal-300 px-2 py-1"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(row.original.id);
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

const handleEdit = (id: number) => {

}

const handleDelete = (id: number) => {

}

export function UsersTable() {
  const [rows, setRows] = useState<UserDTO[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [loading, setLoading] = useState(true);

  const user = useUser();
  const navigate = useNavigate();

  
  useEffect(() => {
    if (user?.role !== Role.ADMIN) navigate("/not-found");
    
  }, [user?.role]);

  useEffect(() => {
    setLoading(true);
    userService
      .getAllUsers(pagination.pageIndex, pagination.pageSize)
      .then((res) => {
        setRows(res.content);
        const computed =
          (typeof res.totalPages === "number" && res.totalPages > 0 ? res.totalPages : undefined) ??
          (typeof res.totalElements === "number"
            ? Math.max(1, Math.ceil(res.totalElements / pagination.pageSize))
            : 1);
        setPageCount(computed);
      })
      .catch((err) => toast.error(err?.response?.data ?? "Failed to load users"))
      .finally(() => setLoading(false));
  }, [pagination.pageIndex, pagination.pageSize]);

  const columns = useMemo(() => userColumns, []);

  return (
    <div className="w-full p-4 dark:text-white">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Users</h2>
      </div>

      <DataTable<UserDTO>
        columns={columns}
        rows={rows}
        pageCount={pageCount}
        pagination={pagination}
        setPagination={setPagination}
        loading={loading}
        emptyMessage="No users"
        enableSorting
        onRowClick={(row) => console.log("Row clicked:", row)}
        className="shadow-md"
      />
    </div>
  );
}
