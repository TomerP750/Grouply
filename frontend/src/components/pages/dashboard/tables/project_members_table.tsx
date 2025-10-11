import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import type { ProjectMemberDTO } from "../../../../dtos/models_dtos/ProjectMemberDTO";
import projectMemberService from "../../../../service/ProjectMemberService";
import { toast } from "react-toastify";
import { toNormal } from "../../../../util/util_functions";


const columns = ["id","Username", "Position", "Role"];


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
        <div className="w-full p-4 min-h-screen">

            <table className="text-white w-full">
                <thead className="grid grid-cols-4 bg-slate-900 px-5 py-2">
                    {columns.map(c => {
                        return <p key={c}>{c}</p>
                    })}
                </thead>

                <tbody>
                    {members.map(m => {
                        return <div key={m.id} className="grid grid-cols-4 px-5 py-5">
                            <span>{m.id}</span>
                            <span>{m.user.username}</span>
                            <span>{toNormal(m.projectPosition)}</span>
                            <span>{toNormal(m.projectRole)}</span>
                        </div>
                    })}
                </tbody>
            </table>


        </div>
    )
}