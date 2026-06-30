import { data, useSearchParams } from "react-router-dom";
import { DataTable } from "../../../ui/DataTable";
import { Pagination } from "../../../ui/Pagination";
import { useQuery } from "@tanstack/react-query";
import projectService from "../api/projectService";
import { projectColumns } from "./columns";
import type { ProjectDTO } from "../../../../../feed/posts/models/ProjectDto";



export function ProjectsTable() {

    const [params, setParams] = useSearchParams();

    const page = Number(params.get("page") ?? 0);
    const size = Number(params.get("size") ?? 10);

    const { data } = useQuery({
        queryKey: ["projects", page, size],
        queryFn: () => projectService.getUserOwnedProjectsPagination(page, size),
    });


    if (!data) return null;

    return (
        <>
            {/* <DataTable<ProjectDTO>
                data={data.content}
                columns={projectColumns}
            /> */}

            <Pagination
                page={data.page}
                totalPages={data.totalPages}
                onPageChange={(p) =>
                    setParams({
                        page: String(p),
                        size: String(size),
                    })
                }
            />
        </>
    );
}
