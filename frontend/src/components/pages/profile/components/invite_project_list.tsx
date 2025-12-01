import { useMemo, useState } from "react";
import type { ProjectDTO } from "../../../dtos/models_dtos/project_dto";
import { InviteProjectCard } from "./invite_project_card";


interface InviteProjectListProps {
    projects: ProjectDTO[]
}

export function InviteProjectList({ projects }: InviteProjectListProps) {

    const [query, setQuery] = useState("");
    

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return projects;
        return projects.filter((p) => p.name.toLowerCase().includes(q));
    }, [projects, query]);


    return (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            {filtered.length === 0 ? (
                <div className="p-6 text-center text-slate-500 dark:text-slate-400">No projects found.</div>
            ) : (
                <ul className="divide-y divide-slate-200 dark:divide-slate-800">
                    {filtered.map((p) => {
                        return <InviteProjectCard key={p.id} project={p}/>
                    })}
                </ul>
            )}
        </div>
    )
}