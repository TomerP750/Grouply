import {
    createColumnHelper,
    type ColumnDef,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../../../shared/store/hooks";
import { fmtDate } from "../../../../../shared/utils/string_formats";
import type { PostDTO } from "../../../../feed/shared/models/PostDto";


const ch = createColumnHelper<PostDTO>();

export function PostsTable() {
    const [rows, setRows] = useState<PostDTO[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const navigate = useNavigate();
    const user = useUser();

    

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

            {/* <DataTable<PostDTO>
                columns={columns}
                rows={rows}
                pageCount={pageCount}
                pagination={pagination}
                setPagination={setPagination}
                loading={loading}
                emptyMessage="No posts"
                enableSorting
                className="shadow-md"
            /> */}

            {/* {dialogOpen && (
                <Dialog
                    open={dialogOpen}
                    message="Are you sure you want to delete?"
                    onClose={() => setDialogOpen(false)}
                    onConfirm={() => { }}
                />
            )} */}
        </main>
    );
}
