import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import defaultImage from "../../../../assets/projectdefault.jpg";
import type { ProjectMemberDTO } from "../../../../dtos/models_dtos/ProjectMemberDTO";
import type { ProjectPostDTO } from "../../../../dtos/models_dtos/ProjectPostDTO";
import { JoinRequestDTO } from "../../../../dtos/models_dtos/request_dto/JoinRequestDTO";
import { useUserSelector } from "../../../../redux/hooks";
import archivedProjectService from "../../../../service/ArchivedProjectService";
import joinRequestService from "../../../../service/JoinRequestService";
import projectMemberService from "../../../../service/ProjectMemberService";
import { Avatar } from "../../../elements/Avatar";
import { ProjectCardDescription } from "./project_card_description";
import { ReadMoreModal } from "./ReadMoreModal";
import { ProjectCardProvider } from "../../../../context/ProjectCardContext";
import { BiEdit, BiTrash } from "react-icons/bi";
import projectPostService from "../../../../service/ProjectPostService";


interface ProjectCardProps {
    projectPost: ProjectPostDTO
    onRemove: (id: number) => void
}


export function ProjectCard({ projectPost, onRemove }: ProjectCardProps) {

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


    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const [sentRequest, setSentRequest] = useState<boolean>(false);
    const [archived, setArchived] = useState<boolean>(false);


    const [isOwner, setIsOwner] = useState<boolean>(false);
    useEffect(() => {
        if (user) {
            projectMemberService.isOwner(user.id, projectDTO.id)
                .then(res => {
                    setIsOwner(res);
                })
                .catch(err => {
                    toast.error(err.response.data);
                })
        }
    }, []);

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
                    toast.success("Removed to archive!");
                }
                else {
                    toast.success("Added from archive!")
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

    const handleDeletePost = (id: number) => {
        const answer = window.confirm(`Are you sure you want to delete project: ${projectPost.title}?`);
        if (answer) {
            projectPostService.deletePost(id)
                .then(() => {
                    toast.success("Post deleted");
                    onRemove(id);
                })
                .catch(err => {
                    toast.error(err.response.data);
                })
        }
    }

    const handleEdit = () => {

    }

    return (
        <ProjectCardProvider projectPost={projectPost}>
            <div className="w-full sm:w-3/4 min-h-100 bg-gray-100 dark:bg-slate-800 dark:text-white rounded-2xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl hover:shadow-teal-800/30 transition-shadow">
                {/* Image placeholder */}
                <img src={defaultImage} className="h-[40%] object-center object-cover bg-gradient-to-r from-blue-600 to-blue-500 w-full" />

                {/* Description + Buttons to join */}
                <ProjectCardDescription
                    loading={loading}
                    archived={archived}
                    projectPost={projectPost}
                    sentRequest={sentRequest}
                    onRequestToJoin={() => handleRequestToJoin(projectDTO.id)}
                    onArchiveClick={() => handleAddToArchive(projectPost.id)}
                    onEdit={handleEdit}
                    onDelete={() => handleDeletePost(projectPost.id)}
                />

                {/* Actions + some users*/}
                <div className="flex items-center justify-between w-full px-6 pb-4 mt-auto">

                    <div className="flex -space-x-2 items-center cursor-pointer">
                        {members.slice(0, 5).map(m => {
                            return <Avatar size={30} key={m.id} />
                        })}

                        {members.length > 5 && <span className="ml-2.5">+{members.length - 5}</span>}
                    </div>

                    <button
                        onClick={() => setModalOpen(true)}
                        className="inline-flex items-center gap-2 cursor-pointer bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm">
                        <span>Read More</span>
                    </button>

                    {modalOpen && <ReadMoreModal
                        onClose={() => setModalOpen(false)}
                        open={modalOpen}
                        archived={archived}
                        loading={loading}
                        sentRequest={sentRequest}
                        projectPost={projectPost}
                        members={members}
                        onArchiveClick={() => handleAddToArchive(projectPost.id)}
                        onRequestToJoin={() => handleRequestToJoin(projectDTO.id)} />}

                </div>
            </div>
        </ProjectCardProvider>
    );

}