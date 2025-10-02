import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    useReactTable,
    type SortingState,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import type { ProjectDTO } from "../../../dtos/models_dtos/ProjectDTO";
import { ProjectStatus } from "../../../dtos/enums/ProjectStatus";
import projectService from "../../../service/ProjectService";
import { toast } from "react-toastify";
import { BiChevronLeft, BiChevronRight, BiLoaderAlt, BiPlus } from "react-icons/bi";
import type { ProjectMemberDTO } from "../../../dtos/models_dtos/ProjectMemberDTO";
import { Avatar } from "../../elements/Avatar";


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
    return <span className={`text-xs px-2 py-1 rounded-full font-medium ${styles}`}>{status}</span>;
}

function fmtDate(v: unknown) {
    const d = v instanceof Date ? v : new Date(String(v));
    return isNaN(d.getTime()) ? "-" : d.toLocaleDateString();
}

const ch = createColumnHelper<ProjectDTO>();

export function ProjectsTable() {
    const [membersByProject, setMembersByProject] = useState<Record<number, ProjectMemberDTO[]>>({});
    const [rows, setRows] = useState<ProjectDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => {
        projectService
            .getUserOwnedProjects()
            .then((res) => {
                setRows(res);
            })
            .catch((err) => toast.error(err?.response?.data ?? "Failed to load projects"))
            .finally(() => setLoading(false));
    }, []);

    const handleEditProject = () => {

    };

    const handleDeleteProject = (id: number) => {
        const confirm = window.confirm("are you sure you want to delete?");
        if (confirm) {
            projectService.deleteProject(id)
                .then(() => {
                    setRows((prev) => prev.filter(p => p.id !== id));
                    toast.success(`Project Deleted!`);
                })
                .catch(err => {
                    toast.error(err.response.data);
                })
        }
    };

    const columns = useMemo(() => [

        ch.accessor("id", {
            header: "#",
            cell: (i) => i.getValue(),
            enableSorting: true,
        }),

        ch.accessor("name", {
            header: "Name",
            cell: (i) => (
                <span className="block max-w-[260px] truncate" title={String(i.getValue())}>
                    {i.getValue()}
                </span>
            ),
            enableSorting: true,
        }),

        ch.accessor("status", {
            header: "Status",
            cell: (i) => <StatusBadge status={i.getValue()} />,
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
            cell: ({ row }) => {
                const list = membersByProject[row.original.id] ?? []; // ProjectMemberDTO[]
                return (
                    <div className="flex items-center gap-2">
                        <ul className="flex -space-x-2">
                            {list.slice(0, 5).map((m) =>
                                m.user.avatarUrl ? (
                                    <img
                                        key={m.id}
                                        src={m.user.avatarUrl}
                                        alt={m.user.username}
                                        title={m.user.username}
                                        className="h-6 w-6 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover"
                                    />
                                ) : (
                                    <Avatar user={m.user}/>
                                )
                            )}
                        </ul>

                    </div>
                );
            },
        }),

        ch.display({
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            console.log("edit", row.original.id);
                        }}
                        className="rounded border px-2 py-1 text-xs hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                        Edit
                    </button>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteProject(row.original.id);
                        }}
                        className="rounded border border-red-300 px-2 py-1 text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
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
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    });

    useEffect(() => {
        table.setPageSize(10);
    }, [table]);

    if (loading) return <div className="p-4 text-sm opacity-75"><BiLoaderAlt size={30} className="animate-spin dark:text-white" /></div>;

    return (
        <div className="w-full p-4 dark:text-white">
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex justify-end mb-2">
                    <button className="px-2 py-1 bg-teal-500 font-medium mr-2 inline-flex items-center gap-1 cursor-pointer hover:bg-teal-600"><BiPlus size={20} /> Create Project</button>
                </div>
                <table className="w-full border-collapse text-left text-sm">
                    {/* sticky header (light/dark) */}
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
                                            className={`px-3 py-2 border-b border-slate-200 dark:border-slate-800 font-medium select-none ${canSort ? "cursor-pointer" : ""
                                                }`}
                                            title={canSort ? "Click to sort" : undefined}
                                        >
                                            <div className="inline-flex items-center gap-1">
                                                {flexRender(h.column.columnDef.header, h.getContext())}
                                                {dir === "asc" && <span>▲</span>}
                                                {dir === "desc" && <span>▼</span>}
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
                                className="even:bg-slate-50/60 dark:even:bg-slate-800/30 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
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

            {/* Prev / Next */}
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
