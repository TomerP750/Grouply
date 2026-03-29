
import { useState, useEffect } from "react"
import { BiLoaderAlt } from "react-icons/bi"
import { HiUserAdd } from "react-icons/hi"
import { toast } from "react-toastify"
import { useInviteToProject } from "../../../../context/invite_to_project_context"
import { ProjectPosition } from "../../../../dtos/enums/ProjectPosition"
import type { ProjectDTO } from "../../../../dtos/models_dtos/project_dto"
import invitationService from "../../../../service/invitation_service"
import { toNormal } from "../../../../util/util_functions"

const btn = `inline-flex items-center gap-2 px-4 py-2 rounded-lg
                bg-teal-600 text-white shadow-sm
                hover:bg-teal-700 disabled:bg-slate-400 disabled:cursor-not-allowed
                focus:outline-none focus:ring-2 focus:ring-teal-500
                transition-colors`


export interface InviteUserToProjectRequestDTO {
    recipientId: number
    projectId: number
    position: ProjectPosition
}

interface InviteProjectCardProps {
    project: ProjectDTO
}

export function InviteProjectCard({ project }: InviteProjectCardProps) {

    const { name, technologies } = project;
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedPosition, setSelectedPosition] = useState<ProjectPosition>();
    const [inviteExists, setInviteExists] = useState(false);

    const { recipientId } = useInviteToProject();

    const handleInvite = () => {
        if (!selectedPosition) return;
        setLoading(true);
        const data: InviteUserToProjectRequestDTO = {
            recipientId: recipientId,
            projectId: project.id,
            position: selectedPosition
        }
        invitationService.toggleInvite(data)
            .then(res => {
                setInviteExists(res);
                toast.success(res === false ? "Invite Removed" : "Invite sent");
            })
            .catch(err => {
                toast.error(err.response.data);
            })
            .finally(() => {
                setLoading(false);
            })
    };


    useEffect(() => {
        if (!selectedPosition) return;
        invitationService.existsInvitation(recipientId, project.id, selectedPosition!)
            .then(res => {
                setInviteExists(res);
            })
            .catch(err => {
                err.response.data;
            })
    }, [selectedPosition])

    return (
        <li className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors">
            <div className="min-w-0">
                <p className="font-medium text-slate-900 dark:text-slate-100">{toNormal(name)}</p>

                {/*  techs */}
                {technologies.length > 0 && (
                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                        {technologies.map(t => t.name).join(" • ")}
                    </p>
                )}
            </div>


            {/* Button and select */}
            <div className="flex flex-col items-start sm:items-center sm:flex-row justify-between lg:justify-normal gap-3">

                <select
                    value={selectedPosition}
                    onChange={e => setSelectedPosition(e.target.value as ProjectPosition)}
                    className="min-w-[12rem] px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 shadow-sm outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                    <option value="">Select Position</option>
                    {Object.values(ProjectPosition).map((pp) => (
                        <option key={pp} value={pp}>
                            {toNormal(pp)}
                        </option>
                    ))}
                </select>



                <button
                    onClick={handleInvite}
                    disabled={loading}
                    className={`${btn}`}
                >
                    <HiUserAdd size={18} />
                    {loading ? <BiLoaderAlt size={20} /> : inviteExists ? "Cancel" : "Invite"}
                </button>


            </div>
        </li>
    )
}