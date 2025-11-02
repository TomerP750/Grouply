import { useEffect, useState } from "react"
import projectService from "../../../service/ProjectService";
import { toast } from "react-toastify";
import type { ProjectDTO } from "../../../dtos/models_dtos/ProjectDTO";
import { ProfileProjectCard } from "./profile_project_card";



export function ProjectGrid() {

    const [projects, setProjects] = useState<ProjectDTO[]>([]);

    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(5);
    
    useEffect(() => {
        projectService.getUserOwnedProjectsPagination(page, size)
        .then(res => {
            setProjects(res.content)
        })
        .catch(err => {
            toast.error(err.response.data)
        })
    }, []);

    return (
        <div className="space-y-5 pb-10 flex flex-col w-full items-center">
            <h2 className="text-xl font-medium">10 Projects</h2>
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-items-center gap-8">
                {projects.length > 0 ? projects.map(p => {
                    return <ProfileProjectCard key={p.id} project={p}/>
                }) : <span>No Projects Found</span>}

            </section>
        </div>
    )
}