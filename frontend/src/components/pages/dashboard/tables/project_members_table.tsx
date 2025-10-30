import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import type { ProjectMemberDTO } from "../../../../dtos/models_dtos/ProjectMemberDTO";
import projectMemberService from "../../../../service/ProjectMemberService";
import { toast } from "react-toastify";
import { toNormal } from "../../../../util/util_functions";
import { Avatar } from "../../../elements/Avatar";
import { BiCheck, BiEdit, BiSave, BiTrash, BiX } from "react-icons/bi";
import { ProjectRole } from "../../../../dtos/enums/ProjectRole";
import { MdCancel } from "react-icons/md";

interface ChangeUserRoleDTO {
    memberId: number
    projectId: number
    role: ProjectRole
}

const columns = ["", "First Name", "Last Name", "Username", "Position", "Role", "Actions"];
const buttonStyle = "inline-flex items-center gap-1"

export function ProjectMembersTable() {

    const params = useParams();
    const projectId = Number(params.id);

    const [selectedRole, setSelectedRole] = useState<ProjectRole>();
    const [editOpen, setEditOpen] = useState<boolean>(false);

    const [members, setMembers] = useState<ProjectMemberDTO[]>([]);

    useEffect(() => {
        projectMemberService.allMembersPagination(projectId, 0, 10)
            .then(res => {
                setMembers(res.content);
            })
            .catch(err => {
                toast.error(err.response.data);
            })
    }, []);


    // const handleEdit = (memberId: number, projectId: number) => {

    //     const data: ChangeUserRoleDTO = {
    //         memberId,
    //         projectId,

    //     }

    //     projectMemberService.changeMemberRole()
    //         .then(() => {
    //             toast.success("Changed role")
    //         })
    //         .catch(err => {
    //             toast.error(err.response.data);
    //         })
    // }

    const handleRemove = async (memberId: number, projectId: number) => {

        try {
            await projectMemberService.removeMemberFromProject(memberId, projectId);
        } catch {

        }

    }


    return (
        <div className="w-full p-4 min-h-screen overflow-x-auto">

            <table className="text-white w-full">

                <thead className="bg-slate-900">
                    <tr className="grid grid-cols-7 px-5 py-2">
                        {columns.map(c => (
                            <th key={c} className="text-left font-medium text-slate-300">
                                {c}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody className="divide-y divide-slate-200">
                    {members.map(m => (
                        <tr key={m.id} className="grid grid-cols-7 px-5 py-5 text-slate-300">
                            <td><Avatar size={40} /></td>
                            <td>{m.user.firstName}</td>
                            <td>{m.user.lastName}</td>
                            <td>{m.user.username}</td>
                            <td>{m.projectPosition}</td>
                            <td>{editOpen
                                ? <select className="bg-slate-800 px-2 py-1 focus:outline-none cursor-pointer appearance-none" value={selectedRole}>
                                    {Object.values(ProjectRole).map(r => {
                                        return <option className="focus:outline-none" value={r} key={r}>{r}</option>
                                    })}
                                </select>
                                : m.projectRole}
                            </td>
                            <td>
                                <div className="flex gap-5 items-center text-sm">
                                    {editOpen
                                        ?
                                        <button className={`${buttonStyle} text-green-500`}>
                                            <BiCheck size={22} />
                                            <span className="cursor-pointer hover:underline">Save</span>
                                        </button>
                                        :
                                        <button onClick={
                                            () => {
                                                setSelectedRole(m.projectRole)
                                                setEditOpen(true)
                                            }
                                        } className={`${buttonStyle}`}>
                                            <BiEdit size={22} />
                                            <span className="cursor-pointer hover:underline">Edit</span>
                                        </button>
                                    }
                                    {editOpen
                                        ?
                                        <button onClick={() => setEditOpen(false)} className={`${buttonStyle}`}>
                                            <BiX size={22} />
                                            <span className="cursor-pointer hover:underline">Cancel</span>
                                        </button>
                                        :

                                        <button onClick={() => handleRemove(m.id, projectId)} className={`${buttonStyle} text-red-500`}>
                                            <BiTrash size={22} />
                                            <span className="cursor-pointer hover:underline">Remove</span>
                                        </button>
                                    }
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>


        </div>
    )
}