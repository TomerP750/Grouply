import { HiOutlineBookOpen, HiUserAdd } from "react-icons/hi";
import { MdBookmarkAdd } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { Avatar } from "../../elements/Avatar";
import { useEffect, useState } from "react";
import defaultImage from "../../../assets/projectdefault.jpg";
import type { ProjectPostDTO } from "../../../dtos/models_dtos/ProjectPostDTO";
import { JoinRequestDTO } from "../../../dtos/models_dtos/request_dto/JoinRequestDTO";
import { useUserSelector } from "../../../redux/hooks";
import type { ProjectPostPositionDTO } from "../../../dtos/models_dtos/ProjectPostPositionDTO";
import joinRequestService from "../../../service/JoinRequestService";
import type { ProjectMemberDTO } from "../../../dtos/models_dtos/ProjectMemberDTO";
import projectMemberService from "../../../service/ProjectMemberService";
import { toast } from "react-toastify";
import { BiCheck } from "react-icons/bi";
import archivedProjectService from "../../../service/ArchivedProjectService";



interface ProjectCardProps {
    projectPost: ProjectPostDTO
}


export function ProjectCard({ projectPost }: ProjectCardProps) {

    const [loading, setLoading] = useState<boolean>(false);

    const { title, description, projectDTO, positions } = projectPost;

    const [members, setMembers] = useState<ProjectMemberDTO[]>([]);
    useEffect(() => {
        projectMemberService.allMembers(projectDTO.id)
            .then(res => {
                setMembers(res)
            })
            .catch(err => {
                console.log(err.response.data);
            })
    }, [])


    const trancuatedDesc = description.length > 200 ? description.slice(0, 200) + '...' : description;
    const [participantsModalOpen, setParticipantsModalOpen] = useState<boolean>(false);

    const user = useUserSelector(state => state.authSlice.user);

    const [sentRequest, setSentRequest] = useState<boolean>(false);
    const [archived, setArchived] = useState<boolean>(false);

    const handleRequestToJoin = (projectPostPositionId: number) => {
        if (user != null) {

            const joinRequest = new JoinRequestDTO(user.id, projectPostPositionId, projectPost.id);
            console.log(joinRequest);

            joinRequestService.toggleJoinRequest(joinRequest)
                .then((res) => {
                    if (res === false) {
                        toast.success("Request Removed!");
                    }
                    else {
                        toast.success("The request has been sent!")
                    };
                    setSentRequest(res);
                })
                .catch(err => {
                    toast.error(err.response.data)
                })
        }
    };

    const handleAddToArchive = (id: number) => {
        setLoading(true);
        archivedProjectService.toggleArhiveProject(id)
            .then(res => {
                if (res === false) {
                    toast.success("Request Removed!");
                }
                else {
                    toast.success("The request has been sent!")
                };
                setArchived(res);
            })
            .catch(err => {
                toast.error(err.response.data);
            })
            .finally(() => {
                setLoading(false);
            })
    };


    return (
        <div className="w-115 min-h-100 bg-gray-100 dark:bg-slate-800 dark:text-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
            {/* Image placeholder */}
            <img src={defaultImage} className="h-[40%] object-center object-cover bg-gradient-to-r from-blue-600 to-blue-500 w-full" />

            {/* Description + Buttons to join */}
            <div className="flex flex-col flex-grow w-full px-6 py-4 gap-2">
                <div className="flex w-full justify-between items-center">
                    <h1 className="font-bold text-2xl text-gray-900 dark:text-white">{projectDTO.name}</h1>
                    <div className="flex gap-3 items-center">
                        <button
                            onClick={() => handleAddToArchive(projectPost.id)}
                            title={archived ? "Remove from archive" : "Add to archive"}
                            className={`cursor-pointer ${archived && 'text-yellow-500'}  transition-colors`}>
                            <MdBookmarkAdd size={30} />
                        </button>
                    </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{trancuatedDesc}</p>

                <div className="flex flex-col w-full gap-5 items-center py-4">

                    {/* Positions buttons to request to join */}
                    {positions.length > 0 && positions.map(p => {
                        return <div key={p.id} className="flex justify-between items-center w-full">
                            <p>{p.position}</p>
                            <button
                                onClick={() => handleRequestToJoin(p.id)}
                                className={`text-sm cursor-pointer transition-colors px-2 py-1 rounded-lg
                                ${sentRequest ? 'bg-green-600 hover:bg-green-500' : 'bg-blue-600 hover:bg-blue-500'}
                                `}>
                                {sentRequest ? <BiCheck size={20} /> : 'Request To Join'}
                            </button>
                        </div>
                    })}

                    {/* If length > 3 then display button view more */}
                    <button className="cursor-pointer hover:font-medium">View More</button>
                </div>

            </div>

            {/* Actions + some users*/}
            <div className="flex items-center justify-between w-full px-6 pb-4 mt-auto">
                <div className="flex -space-x-2 items-center cursor-pointer">
                    {members.slice(0, 5).map(m => {
                        return <Avatar size={30} key={m.id} />
                    })}

                    {members.length > 5 && <span className="ml-2.5">+{members.length - 5}</span>}
                </div>

                {positions.length > 3 && <button
                    className="inline-flex items-center gap-2 cursor-pointer bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm">
                    <span>Read More</span>
                </button>}
            </div>
        </div>
    );

}