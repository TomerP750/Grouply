import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import defaultImage from "../../../../assets/projectdefault.jpg";
import { ProjectCardProvider } from "../../../../context/ProjectCardContext";
import type { PostDTO } from "../../../../dtos/models_dtos/PostDTO";
import type { ProjectMemberDTO } from "../../../../dtos/models_dtos/ProjectMemberDTO";
import { useUserSelector } from "../../../../redux/hooks";
import archivedProjectService from "../../../../service/ArchivedProjectService";
import projectPostService from "../../../../service/PostService";
import projectMemberService from "../../../../service/ProjectMemberService";
import { Avatar } from "../../../elements/Avatar";
import { PostCardDescription } from "./post_card_description";
import { Dialog } from "../../../elements/Dialog";


interface ProjectCardProps {
    projectPost: PostDTO
    onRemove: (id: number) => void
}


export function PostCard({ projectPost, onRemove }: ProjectCardProps) {

    const [loading, setLoading] = useState<boolean>(false);

    const user = useUserSelector(state => state.authSlice.user);

    const navigate = useNavigate();

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

    const [sentRequest, setSentRequest] = useState<boolean>(false);
    const [archived, setArchived] = useState<boolean>(false);

    const [isOwner, setIsOwner] = useState<boolean>(false);

    useEffect(() => {
        if (user) {
            projectMemberService.isOwner(user.sub, projectDTO.id)
                .then(res => {
                    setIsOwner(res);
                })
                .catch(err => {
                    toast.error(err.response.data);
                })
        }
    }, []);



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
        
        projectPostService.deletePost(id)
            .then(() => {
                toast.success("Post deleted");
                onRemove(id);
            })
            .catch(err => {
                toast.error(err.response.data);
            })

    }

    const handleEdit = () => {

    }

    return (
        <ProjectCardProvider projectPost={projectPost}>
            <div className="w-full sm:w-3/4 min-h-100 bg-gray-100 dark:bg-slate-800 dark:text-white rounded-2xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl hover:shadow-teal-800/30 transition-shadow">
                {/* Image placeholder */}
                <img src={defaultImage} className="h-[40%] object-center object-cover bg-gradient-to-r from-blue-600 to-blue-500 w-full" />

                {/* Description + Buttons to join */}
                <PostCardDescription
                    archived={archived}
                    post={projectPost}
                    sentRequest={sentRequest}
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
                        onClick={() => navigate(`/post/${projectPost.id}`)}
                        className="inline-flex items-center gap-2 cursor-pointer bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm">
                        <span>Read More</span>
                    </button>

                </div>
            </div>
        </ProjectCardProvider>
    );

}