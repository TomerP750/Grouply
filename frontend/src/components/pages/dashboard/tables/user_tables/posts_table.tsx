import {
    createColumnHelper,
    type ColumnDef,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import type { PostDTO } from "../../../../../dtos/models_dtos/post_dto";
import { useUser } from "../../../../../redux/hooks";
import postService from "../../../../../service/post_service";
import { usePagination } from "../../../../../util/helper_hooks";
import { extractPageCount } from "../../../../../util/pagination_helper";
import { fmtDate } from "../../../../../util/util_functions";
import { Dialog } from "../../../../elements/Dialog";
import { DataTable } from "../admin_tables/data_table";

const ch = createColumnHelper<PostDTO>();

export function PostsTable() {
    const { pagination, setPageCount, pageCount, setPagination } = usePagination();
    const [rows, setRows] = useState<PostDTO[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const navigate = useNavigate();
    const user = useUser();

    useEffect(() => {
        setLoading(true);
        postService
            .allPostsWhereUserIsOwner(pagination.pageIndex, pagination.pageSize)
            .then((res) => {
                setRows(res.content);
                setPageCount(extractPageCount(res, pagination.pageSize));
            })
            .catch((err) =>
                toast.error(err?.response?.data ?? "Failed to load posts")
            )
            .finally(() => setLoading(false));
    }, [pagination.pageIndex, pagination.pageSize]);

    const columns: ColumnDef<PostDTO, any>[] = useMemo(
        () => [
            ch.accessor("id", {
                id: "id",
                header: "#",
                cell: (i) => <span>{i.getValue()}</span>,
            }),
            ch.accessor("title", {
                id: "title",
                header: "Title",
                cell: (i) => <span>{i.getValue()}</span>,
                sortingFn: "alphanumeric",
            }),
            ch.accessor("postedAt", {
                id: "postedAt",
                header: "Posted At",
                cell: (i) => fmtDate(i.getValue()),
                sortingFn: "datetime",
            }),
            ch.display({
                id: "requests",
                header: "Join Requests",
                cell: ({ row }) => (
                    <section className="flex items-center gap-2 font-medium">
                        <button
                            className="cursor-pointer hover:underline"
                            onClick={() => navigate(`/dashboard/${user.sub}/posts/${row.original.id}/requests`)}
                        >
                            View Join Requests
                        </button>
                    </section>
                ),
                enableSorting: false,
            }),
        ],
        [navigate, user.sub]
    );

    return (
        <main className="w-full p-4 dark:text-white">

            <h2 className="text-lg font-semibold ">Posts</h2>

            <DataTable<PostDTO>
                columns={columns}
                rows={rows}
                pageCount={pageCount}
                pagination={pagination}
                setPagination={setPagination}
                loading={loading}
                emptyMessage="No posts"
                enableSorting
                className="shadow-md"
            />

            {dialogOpen && (
                <Dialog
                    open={dialogOpen}
                    message="Are you sure you want to delete?"
                    onClose={() => setDialogOpen(false)}
                    onConfirm={() => { }}
                />
            )}
        </main>
    );
}
