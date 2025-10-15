import { HiUserAdd } from "react-icons/hi"
import type { ProjectDTO } from "../../../dtos/models_dtos/ProjectDTO"
import { BiLoaderAlt } from "react-icons/bi"
import { ProjectPosition } from "../../../dtos/enums/ProjectPosition"
import { toNormal } from "../../../util/util_functions"
import { useState } from "react"
import { useInviteToProject } from "../../../context/invite_to_project_context"

const btn = `inline-flex items-center gap-2 px-4 py-2 rounded-lg
                bg-teal-600 text-white shadow-sm
                hover:bg-teal-700 disabled:bg-slate-400 disabled:cursor-not-allowed
                focus:outline-none focus:ring-2 focus:ring-teal-500
                transition-colors`


interface InviteProjectCardProps {
    project: ProjectDTO
}

export function InviteProjectCard({ project }: InviteProjectCardProps) {

    const {name, technologies} = project;
    const [loading, setLoading] = useState<boolean>(false);

    const { recipientId } = useInviteToProject();

    const handleInvite = (projectId: number) => {
        
    };

   
    return (
        <li className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors">
            <div className="min-w-0">
                <p className="font-medium text-slate-900 dark:text-slate-100">{toNormal(name)}</p>

                {/*  techs */}
                {technologies.length > 0 && (
                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                        {technologies.map(t => t.name).join(" • ")}
                    </p>
                )}
            </div>

            <div className="flex items-center gap-3">

                <select
                    value={""}
                    className="min-w-[12rem] px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 shadow-sm outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                    <option value="">Select Position</option>
                    {Object.values(ProjectPosition).map((pp) => (
                        <option key={pp} value={pp}>
                            {pp}
                        </option>
                    ))}
                </select>

                <button
                    // onClick={() => handleInvite(p.id)}
                    disabled={loading}
                    className={`${btn}`}
                    title={"Select a position first"}
                >
                    <HiUserAdd size={18} />
                    {loading ? <BiLoaderAlt size={20} /> : "Invite"}
                </button>
            </div>
        </li>
    )
}