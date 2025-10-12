import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import type { ProjectMemberDTO } from "../../../../dtos/models_dtos/ProjectMemberDTO";
import projectMemberService from "../../../../service/ProjectMemberService";
import { toast } from "react-toastify";
import { toNormal } from "../../../../util/util_functions";


const columns = ["First Name", "Last Name" ,"Username", "Position", "Role", "Actions"];


export function ProjectMembersTable() {

    const params = useParams();
    const id = Number(params.id);

    const [members, setMembers] = useState<ProjectMemberDTO[]>([]);

    useEffect(() => {
        projectMemberService.allMembersPagination(id, 0, 10)
            .then(res => {
                setMembers(res.content);
            })
            .catch(err => {
                toast.error(err.response.data);
            })
    }, []);

    
    return (
        <div className="w-full p-4 min-h-screen overflow-x-auto">

            <table className="text-white w-full">
                
                <thead className="bg-slate-900">
                    <tr className="grid grid-cols-6 px-5 py-2">
                        {columns.map(c => (
                            <th key={c} className="text-left font-medium text-slate-300">
                                {c}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody className="divide-y divide-slate-800">
                    {members.map(m => (
                        <tr key={m.id} className="grid grid-cols-6 px-5 py-5 text-slate-300">
                            <td>{m.user.firstName}</td>
                            <td>{m.user.lastName}</td>
                            <td>{m.user.username}</td>
                            <td>{m.projectPosition}</td>
                            <td>{m.projectRole}</td>
                        </tr>
                    ))}
                </tbody>

            </table>


        </div>
    )
}