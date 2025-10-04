import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type SortingState
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { BiChevronDown, BiChevronLeft, BiChevronRight, BiChevronUp, BiLoaderAlt, BiPlus } from "react-icons/bi";
import { toast } from "react-toastify";
import { Role } from "../../../../dtos/enums/Role";
import type { UserDTO } from "../../../../dtos/models_dtos/UserDTO";
import userService from "../../../../service/UserService";


function RoleBadge({ role }: { role: Role }) {
    let styles = "bg-slate-500/15 text-slate-400";
    switch (role) {
        case Role.USER:
            styles = "bg-teal-600/15 text-teal-500";
            break;
        case Role.ADMIN:
            styles = "bg-amber-500/15 text-amber-500";
            break; 
    }
    return <span className={`text-xs px-2 py-1 rounded-full font-medium ${styles}`}>{role}</span>;
}


const ch = createColumnHelper<UserDTO>();

export function UsersTable() {

    const [rows, setRows] = useState<UserDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pageCount, setPageCount] = useState(0);
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

    useEffect(() => {
        userService
            .getAllUsers(pagination.pageIndex, pagination.pageSize)
            .then((res) => {
                setRows(res.content);
                setPageCount(res.totalPages);
            })
            .catch((err) => toast.error(err?.response?.data ?? "Failed to load projects"))
            .finally(() => setLoading(false));

    }, [pagination.pageIndex, pagination.pageSize]);


    const handleEditProject = () => {

    };

    const handleDeleteProject = (id: number) => {
        
    };

    const columns = useMemo(() => [

        ch.accessor("id", {
            header: "#",
            cell: (i) => i.getValue(),
            enableSorting: true,
        }),

        ch.accessor("firstName", {
            header: "First name",
            cell: (i) => (
                <span className="block max-w-[260px] truncate" title={String(i.getValue())}>
                    {i.getValue()}
                </span>
            ),
            enableSorting: true,
        }),

        ch.accessor("lastName", {
            header: "Last name",
            cell: (i) => (
                <span className="block max-w-[260px] truncate" title={String(i.getValue())}>
                    {i.getValue()}
                </span>
            ),
            enableSorting: true,
        }),

        ch.accessor("role", {
            header: "Role",
            cell: (i) => <RoleBadge role={i.getValue()} />,
            sortingFn: "alphanumeric",
        }),

        ch.accessor("email", {
            header: "Email",
            cell: (i) => (
                <span className="block max-w-[260px] truncate" title={String(i.getValue())}>
                    {i.getValue()}
                </span>
            ),
            enableSorting: true,
        }),

        ch.accessor("username", {
            header: "username",
            cell: (i) => (
                <span className="block max-w-[260px] truncate" title={String(i.getValue())}>
                    {i.getValue()}
                </span>
            ),
            enableSorting: true,
        }),

        ch.display({
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex items-center gap-2 font-medium">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        className="cursor-pointer rounded text-teal-400 hover:text-teal-300  px-2 py-1"
                    >
                        Edit
                    </button>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteProject(row.original.id);
                        }}
                        className="cursor-pointer rounded px-2 py-1 text-red-400 hover:text-red-500 "
                    >
                        Delete
                    </button>
                </div>
            ),
        }),
    ],
        []
    );

    const table = useReactTable({
        data: rows,
        columns,
        state: { sorting, pagination },
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        manualPagination: true,
        pageCount, 
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(), 
        getPaginationRowModel: getPaginationRowModel(),
    });

    
    
    if (loading) return <div className="p-4 text-sm opacity-75"><BiLoaderAlt size={30} className="animate-spin dark:text-white" /></div>;

    return (
        <div className="w-full p-4 dark:text-white">
            
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                
                <table className="w-full border-collapse text-left text-sm">
                   
                    <thead className="sticky top-0 z-10 bg-slate-50/80 backdrop-blur dark:bg-slate-900/60">
                        {table.getHeaderGroups().map((hg) => (
                            <tr key={hg.id}>
                                {hg.headers.map((h) => {
                                    const canSort = h.column.getCanSort();
                                    const dir = h.column.getIsSorted(); // false | 'asc' | 'desc'
                                    return (
                                        <th
                                            key={h.id}
                                            onClick={canSort ? h.column.getToggleSortingHandler() : undefined}
                                            className={`px-3 py-2 border-b font-bold border-slate-200 dark:border-slate-800 select-none ${canSort ? "cursor-pointer" : ""
                                                }`}
                                            title={canSort ? "Click to sort" : undefined}
                                        >
                                            <div className="inline-flex items-center gap-1">
                                                {flexRender(h.column.columnDef.header, h.getContext())}
                                                {dir === "asc" && <span><BiChevronUp/></span>}
                                                {dir === "desc" && <span><BiChevronDown/></span>}
                                            </div>
                                        </th>
                                    );
                                })}
                            </tr>
                        ))}
                    </thead>

                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr
                                key={row.id}
                                className="text-gray-300 even:bg-slate-50/60 dark:even:bg-slate-800/30 hover:bg-slate-100 dark:hover:bg-slate-600/50 transition-colors"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="px-3 py-2 border-b border-slate-200 dark:border-slate-800">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}

                        {table.getRowModel().rows.length === 0 && (
                            <tr>
                                <td
                                    colSpan={table.getAllLeafColumns().length}
                                    className="px-3 py-8 text-center text-sm opacity-70"
                                >
                                    No projects
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Sort and page buttons */}
            <div className="mt-3 flex items-center gap-2">
                <button
                    className="cursor-pointer  py-1 disabled:opacity-50"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <BiChevronLeft size={30} />
                </button>
                <button
                    className="cursor-pointer  py-1  disabled:opacity-50"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <BiChevronRight size={30} />
                </button>
                <span className="ml-2 text-sm">
                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount() || 1}
                </span>
                <select
                    className="ml-2 px-2 py-1 border rounded text-sm bg-white dark:bg-slate-900"
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => table.setPageSize(Number(e.target.value))}
                >
                    {[5, 10, 20, 50].map((s) => (
                        <option key={s} value={s}>
                            {s}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
