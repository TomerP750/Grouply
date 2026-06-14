import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import type { UserDTO } from "../../../../../shared/models/UserDto";
import { RoleBadge } from "../../../../../shared/utils/enum_ui";

const ch = createColumnHelper<UserDTO>();

export const userColumns: ColumnDef<UserDTO, any>[] = [
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
            // handleEdit(row.original.id);
          }}
          className="cursor-pointer rounded px-2 py-1"
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