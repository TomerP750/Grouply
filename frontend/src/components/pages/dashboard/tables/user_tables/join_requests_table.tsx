import {
    createColumnHelper,
    type ColumnDef,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import type { JoinRequestDTO } from "../../../../../dtos/models_dtos/request_dto/JoinRequestDTO";
import { useUser } from "../../../../../redux/hooks";
import joinRequestService from "../../../../../service/JoinRequestService";
import { usePagination } from "../../../../../util/helper_hooks";
import { extractPageCount } from "../../../../../util/pagination_helper";
import { fmtDate } from "../../../../../util/util_functions";
import { Dialog } from "../../../../elements/Dialog";
import { DataTable } from "../admin_tables/data_table";

const ch = createColumnHelper<JoinRequestDTO>();

export function JoinRequestsTable() {

    const { pagination, setPageCount, pageCount, setPagination } = usePagination();
    const [rows, setRows] = useState<JoinRequestDTO[]>([]);
    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const params = useParams();
    const postId = Number(params.postId);

    const navigate = useNavigate();
    const user = useUser();

    useEffect(() => {
        setLoading(true);
        joinRequestService.allRequestsByPostId(postId, pagination.pageIndex, pagination.pageSize)
            .then(res => {
                setRows(res.content);
                setPageCount(extractPageCount(res, pagination.pageSize));
            })
            .catch((err) =>
                toast.error(err?.response?.data ?? "Failed to load ")
            )
            .finally(() => setLoading(false));
    }, [pagination.pageIndex, pagination.pageSize]);


    const handleAccept = (requestId: number) => {
        joinRequestService.acceptRequest(requestId)
            .then(() => {
                setRows(prev => prev.filter(r => r.id !== requestId))
                toast.success("Accepted Request");
            })
            .catch(err => {
                toast.error(err.response.data);
            })

    }

    const handleDecline = (requestId: number) => {
        joinRequestService.declineRequest(requestId)
            .then(() => {
                setRows(prev => prev.filter(r => r.id !== requestId))
                toast.success("Declined Request");
            })
            .catch(err => {
                toast.error(err.response.data);
            })
    }

    const columns: ColumnDef<JoinRequestDTO, any>[] = useMemo(
        () => [
            ch.accessor("senderId", {
                id: "senderId",
                header: "Sender Id",
                cell: (i) => <span>{i.getValue()}</span>,
            }),
            ch.accessor("projectPostPositionId", {
                id: "position",
                header: "Position",
                cell: (i) => <span>{i.getValue()}</span>,
                sortingFn: "alphanumeric",
            }),
            ch.accessor("requestedAt", {
                id: "requestedAt",
                header: "Requested At",
                cell: (i) => fmtDate(i.getValue()),
                sortingFn: "datetime",
            }),
            ch.display({
                id: "actions",
                header: "Actions",
                cell: ({ row }) => (
                    <section className="flex items-center gap-3 font-medium">
                        <button
                            onClick={() => handleAccept(row.original.id)}
                            className="cursor-pointer bg-green-700 hover:bg-green-800 transition-colors rounded-lg px-2 py-1">Accept</button>
                        <button
                            onClick={() => handleDecline(row.original.id)}
                            className="cursor-pointer bg-red-700 hover:bg-red-800 transition-colors rounded-lg px-2 py-1">Decline</button>
                    </section>
                ),
                enableSorting: false,
            }),
        ],
        [navigate, user.sub]
    );

    return (
        <main className="w-full p-4 dark:text-white">

            <h2 className="text-lg font-semibold ">Join Requests</h2>

            <DataTable<JoinRequestDTO>
                columns={columns}
                rows={rows}
                pageCount={pageCount}
                pagination={pagination}
                setPagination={setPagination}
                loading={loading}
                emptyMessage="No Join Requests"
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
