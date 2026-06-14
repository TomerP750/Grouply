import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import defaultImage from "../../../../../assets/projectdefault.jpg";
import { PostCardContent } from "./PostCardContent";
import projectMemberService from "../../../../../shared/api/projectMemberService";
import { ProjectCardProvider } from "../../../../../shared/context/ProjectCardContext";
import type { ProjectMemberDTO } from "../../../../../shared/models/ProjectMemberDto";
import { Avatar } from "../../../../../shared/ui/Avatar";
import type { PostDTO } from "../../../shared/models/PostDto";
import postService from "../../api/postService";



interface PostCardProps {
    projectPost: PostDTO
}


export function PostCard({ projectPost }: PostCardProps) {

    const navigate = useNavigate();

    const { projectDTO } = projectPost;

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

    const handleDeletePost = (id: number) => {
        
        postService.deletePost(id)
            .then(() => {
                toast.success("Post deleted");
            })
            .catch(err => {
                toast.error(err.response.data);
            })

    }

    const handleEdit = () => {

    }

    return (
        <ProjectCardProvider projectPost={projectPost}>
            <div className="w-full sm:w-3/4 min-h-100 bg-gradient-to-br from-neutral-100 to-slate-100 dark:from-stone-800 dark:to-stone-900 dark:text-white rounded-2xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl hover:shadow-teal-800/30 transition-shadow">
                {/* Image placeholder */}
                <img src={defaultImage} className="h-[40%] object-center object-cover bg-gradient-to-r from-blue-600 to-blue-500 w-full" />

                {/* Description + Buttons to join */}
                <PostCardContent
                    post={projectPost}
                    // sentRequest={sentRequest}
                    onEdit={handleEdit}
                    onDelete={() => handleDeletePost(projectPost.id)}
                />

                {/* ReadMore + users*/}
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