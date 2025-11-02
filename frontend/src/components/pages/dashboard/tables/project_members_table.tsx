import { useEffect, useState } from "react";
import { BiCheck, BiEdit, BiTrash, BiX } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ProjectRole } from "../../../../dtos/enums/ProjectRole";
import type { ProjectMemberDTO } from "../../../../dtos/models_dtos/ProjectMemberDTO";
import projectMemberService from "../../../../service/ProjectMemberService";
import { Avatar } from "../../../elements/Avatar";
import { Dialog } from "../../../elements/Dialog";
import { useUser } from "../../../../redux/hooks";

export interface ChangeUserRoleDTO {
    memberId: number
    projectId: number
    role: ProjectRole
}

const columns = ["", "First Name", "Last Name", "Username", "Position", "Role", "Actions"];
const buttonStyle = "inline-flex items-center gap-1 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"

export function ProjectMembersTable() {

    const params = useParams();
    const projectId = Number(params.id);

    const [selectedRole, setSelectedRole] = useState<ProjectRole>();
    const [editOpen, setEditOpen] = useState<boolean>(false);
    const [editedMemberId, setEditedMemberId] = useState<number>();
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const [members, setMembers] = useState<ProjectMemberDTO[]>([]);

    const user = useUser();



    useEffect(() => {
        projectMemberService.allMembersPagination(projectId, 0, 10)
            .then(res => {
                setMembers(res.content);
            })
            .catch(err => {
                toast.error(err.response.data);
            })
    }, []);

    const handleOpenEdit = (member: ProjectMemberDTO) => {
        setEditedMemberId(member.id)
        setSelectedRole(member.projectRole)
        setEditOpen(true);
    }


    const handleEdit = (memberId: number, projectId: number) => {

        const data: ChangeUserRoleDTO = {
            memberId,
            projectId,
            role: selectedRole!
        }

        projectMemberService.changeMemberRole(data)
            .then(() => {
                toast.success("Changed role")
            })
            .catch(err => {
                toast.error(err.response.data);
            })
            .finally(() => {
                setEditOpen(false);
            })
    }

    const handleRemove = (memberId: number, projectId: number) => {

        projectMemberService.removeMemberFromProject(memberId, projectId)
            .then(() => {
                toast.success("Removed member");
                setMembers(prev => prev.filter(m => m.id !== memberId));
                setDialogOpen(false);
            })
            .catch(err => {
                toast.error(err.response.data);
            })
            
    }


    return (
        <div className="w-full min-h-screen p-6">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-xl">
                <table className="w-full text-sm">
                    <thead className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur">
                        <tr className="grid grid-cols-7 gap-4 px-6 py-3">
                            {columns.map((c) => (
                                <th
                                    key={c}
                                    className="text-left font-semibold tracking-wide text-slate-300 uppercase text-xs"
                                >
                                    {c}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {members.map((m) => (
                            <tr
                                key={m.id}
                                className="grid grid-cols-7 gap-4 items-center px-6 py-4 border-t border-white/5 even:bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                            >
                                <td className="flex items-center">
                                    <Avatar size={40} />
                                </td>

                                <td className="text-slate-200 truncate">{m.user.firstName}</td>
                                <td className="text-slate-200 truncate">{m.user.lastName}</td>
                                <td className="text-slate-400 truncate">{m.user.username}</td>
                                <td>
                                    <span className="inline-flex items-center rounded-full border border-teal-500/30 bg-teal-500/10 px-2 py-0.5 text-xs font-medium text-teal-300">
                                        {m.projectPosition}
                                    </span>
                                </td>

                                <td>
                                    {editOpen && editedMemberId === m.id ? (
                                        <select
                                            className="w-full rounded-md bg-slate-800 px-3 py-2 text-slate-200 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-teal-500/50 cursor-pointer appearance-none"
                                            onChange={(e) => setSelectedRole(e.target.value as ProjectRole)}
                                            value={selectedRole}
                                        >
                                            {Object.values(ProjectRole).map((r) => (
                                                <option
                                                    className="bg-slate-800 text-slate-200"
                                                    value={r}
                                                    key={r}
                                                >
                                                    {r}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <span
                                            className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-medium ring-1 shadow-sm ${getRoleStyle(
                                                m.projectRole
                                            )}`}
                                        >
                                            {m.projectRole}
                                        </span>

                                    )}
                                </td>

                                <td>
                                    <div className="flex items-center gap-3 text-sm">
                                        {editOpen && editedMemberId === m.id ? (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEdit(m.id, projectId)}
                                                    className={`${buttonStyle} inline-flex items-center gap-1 rounded-md border border-green-500/30 bg-green-500/10 px-3 py-1.5 text-green-400 hover:bg-green-500/15`}
                                                >
                                                    <BiCheck size={20} />
                                                    <span className="hover:underline">Save</span>
                                                </button>
                                                <button
                                                    onClick={() => setEditOpen(false)}
                                                    className={`${buttonStyle} inline-flex items-center gap-1 rounded-md border border-white/10 bg-slate-800/60 px-3 py-1.5 text-slate-200 hover:bg-slate-800`}
                                                >
                                                    <BiX size={20} />
                                                    <span className="hover:underline">Cancel</span>
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleOpenEdit(m)}
                                                    className={`${buttonStyle} inline-flex items-center gap-1 rounded-md border border-white/10 bg-slate-800/60 px-3 py-1.5 text-slate-200 hover:bg-slate-800`}
                                                >
                                                    <BiEdit size={20} />
                                                    <span className="hover:underline">Edit</span>
                                                </button>

                                                <button
                                                    disabled={members.length <= 1}
                                                    onClick={() => setDialogOpen(true)}
                                                    className={`${buttonStyle} inline-flex items-center gap-1 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-red-400 hover:bg-red-500/15 disabled:opacity-50 disabled:cursor-not-allowed`}
                                                >
                                                    <BiTrash size={20} />
                                                    <span>Remove</span>
                                                </button>

                                                {dialogOpen && <Dialog title="Remove Member"
                                                    onConfirm={() => handleRemove(m.id, projectId)}
                                                    open={dialogOpen}
                                                    onClose={() => setDialogOpen(false)}
                                                    message={"Are you sure you want to remove from the project?"} />
                                                }
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

}


const getRoleStyle = (role: ProjectRole) => {

    switch (role) {
        case ProjectRole.OWNER:
            return "bg-amber-500/10 text-amber-400 ring-amber-400/25";
        case ProjectRole.MODERATOR:
            return "bg-violet-500/10 text-violet-400 ring-violet-400/25";
        case ProjectRole.MEMBER:
            return "bg-slate-700/40 text-slate-300 ring-slate-500/20";
        default:
            return "bg-slate-800/60 text-slate-300 ring-white/10";
    }

};
