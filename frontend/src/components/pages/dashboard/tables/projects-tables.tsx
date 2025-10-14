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
import { BiChevronLeft, BiChevronRight, BiLoaderAlt, BiPencil, BiPlus, BiTrash } from "react-icons/bi";
import { toast } from "react-toastify";
import { ProjectStatus } from "../../../../dtos/enums/ProjectStatus";
import type { ProjectDTO } from "../../../../dtos/models_dtos/ProjectDTO";
import type { ProjectMemberDTO } from "../../../../dtos/models_dtos/ProjectMemberDTO";
import projectService from "../../../../service/ProjectService";
import { fmtDate, toNormal } from "../../../../util/util_functions";
import { Avatar } from "../../../elements/Avatar";
import { Dialog } from "../../../elements/Dialog";
import { NavLink, useNavigate } from "react-router-dom";
import projectMemberService from "../../../../service/ProjectMemberService";
import { useUser } from "../../../../redux/hooks";
import { Modal } from "../../../elements/Modal";
import { CreateProjectForm } from "../forms/create_project_form";


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
    return <span className={`text-xs px-2 py-1 rounded-full font-medium ${styles}`}>{toNormal(status)}</span>;
}


const ch = createColumnHelper<ProjectDTO>();

export function ProjectsTable() {

    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const navigate = useNavigate();
    const user = useUser();

    const [rows, setRows] = useState<ProjectDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [sorting, setSorting] = useState<SortingState>([]);

    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [selectedProjectId, setSelectedProejctId] = useState<number>(0);


    const [pageCount, setPageCount] = useState(0);
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

    useEffect(() => {
        projectService
            .getUserOwnedProjectsPagination(pagination.pageIndex, pagination.pageSize)
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

        projectService.deleteProject(id)
            .then(() => {
                setRows((prev) => prev.filter(p => p.id !== id));
                toast.success(`Project Deleted!`);
            })
            .catch(err => {
                toast.error(err.response.data);
            })
        setDialogOpen(false);
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
                return (
                    <div className="flex items-center gap-2 min-w-[140px] cursor-pointer">
                        <div className="flex -space-x-2">
                            <button className="cursor-pointer hover:underline" onClick={() => navigate(`/dashboard/${user.sub}/project-members/${row.original.id}`)}>View Members</button>
                        </div>
                    </div>
                );
            },
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
                        className="inline-flex gap-1 items-center cursor-pointer rounded px-2 py-1 hover:underline"
                    >
                        <span><BiPencil size={20}/></span>
                        <span>Edit</span> 
                    </button>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            setDialogOpen(true);
                            setSelectedProejctId(row.original.id)
                        }}
                        className="inline-flex items-center gap-1 cursor-pointer rounded px-2 py-1 text-red-600 hover:underline "
                    >
                        <span><BiTrash size={20}/></span>
                        <span>Delete</span>
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
        getSortedRowModel: getSortedRowModel(), // keep if you want client sort on current page
        getPaginationRowModel: getPaginationRowModel(),
    });



    if (loading) return <div className="p-4 text-sm opacity-75"><BiLoaderAlt size={30} className="animate-spin dark:text-white" /></div>;

    return (
        <div className="w-full p-4 dark:text-white">
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex justify-end mb-2">
                    <button
                        onClick={() => setModalOpen(true)}
                        className="px-2 py-1 bg-teal-500 font-medium mr-2 inline-flex items-center gap-1 cursor-pointer hover:bg-teal-600"><BiPlus size={20} />
                        Create Project
                    </button>
                    {
                        modalOpen &&
                        <Modal className="dark:bg-gradient-to-br dark:from-slate-900 via-teal-950 to-slate-800"   open={modalOpen}
                            onClose={() => setModalOpen(false)}>
                            <CreateProjectForm onClose={() => setModalOpen(false)} />
                        </Modal>
                    }
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
                                className="even:bg-slate-50/60 dark:even:bg-slate-500/30  transition-colors"
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
                    className="ml-2 px-4 py-1 border rounded text-sm bg-white dark:bg-slate-900 appearance-none"
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
            {dialogOpen && <Dialog open={dialogOpen}
                message={"Are you sure you want to delete"}
                onClose={() => setDialogOpen(false)}
                onConfirm={() => handleDeleteProject(selectedProjectId)} />}


        </div>
    );
}
