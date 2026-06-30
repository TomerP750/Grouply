import { createColumnHelper } from "@tanstack/react-table";
import type { ProjectStatus } from "../../../../../../shared/models/project/ProjectStatus";
import { StatusBadge } from "../../../../../../shared/utils/enum_ui";
import { fmtDate } from "../../../../../../shared/utils/string_formats";
import type { ProjectDTO } from "../../../../../feed/posts/models/ProjectDto";


const ch = createColumnHelper<ProjectDTO>();

export const projectColumns = [
    ch.accessor("id", {
        header: "#",
        cell: (info) => info.getValue(),
    }),

    ch.accessor("name", {
        header: "Name",
        cell: (info) => info.getValue(),
    }),

    ch.accessor("status", {
        header: "Status",
        cell: (info) => {
            const value = info.getValue() as ProjectStatus;
            return <StatusBadge status={value} />;
        },
        sortingFn: "alphanumeric",
    }),

    ch.accessor("createdAt", {
        header: "Created",
        cell: (info) => fmtDate(info.getValue()),
        sortingFn: "datetime",
    }),
];