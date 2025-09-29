import { useEffect, useState } from "react";
import { BiCheck } from "react-icons/bi";
import { MdBookmarkAdd } from "react-icons/md";
import { toast } from "react-toastify";
import defaultImage from "../../../../assets/projectdefault.jpg"
import type { ProjectMemberDTO } from "../../../../dtos/models_dtos/ProjectMemberDTO";
import type { ProjectPostDTO } from "../../../../dtos/models_dtos/ProjectPostDTO";
import { JoinRequestDTO } from "../../../../dtos/models_dtos/request_dto/JoinRequestDTO";
import { useUserSelector } from "../../../../redux/hooks";
import archivedProjectService from "../../../../service/ArchivedProjectService";
import joinRequestService from "../../../../service/JoinRequestService";
import projectMemberService from "../../../../service/ProjectMemberService";
import { Avatar } from "../../../elements/Avatar";
import { ProjectCardDescription } from "./project_card_description";


interface ProjectCardProps {
    projectPost: ProjectPostDTO
}


export function ProjectCard({ projectPost }: ProjectCardProps) {

    const [loading, setLoading] = useState<boolean>(false);
    const user = useUserSelector(state => state.authSlice.user);

    
    const { projectDTO, positions } = projectPost;

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


    const [participantsModalOpen, setParticipantsModalOpen] = useState<boolean>(false);



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
            <ProjectCardDescription
            loading={loading} 
            archived={archived}
            sentRequest={sentRequest}
            onRequestToJoin={() => handleRequestToJoin(projectDTO.id)}
            onArchiveClick={() => handleAddToArchive(projectPost.id)} 
            projectPost={projectPost} 
            />

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