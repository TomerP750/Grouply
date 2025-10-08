import { useEffect, useState } from "react";
import { BiDotsVertical } from "react-icons/bi";
import { MdBookmarkAdd } from "react-icons/md";
import { toast } from "react-toastify";
import type { PostDTO } from "../../../../dtos/models_dtos/PostDTO";
import { useUserSelector } from "../../../../redux/hooks";
import projectMemberService from "../../../../service/ProjectMemberService";
import './post_card_css.css';
import { PostCardPositionCard } from "./post_card_position_card";



export const getMemberTypeTitle = (num: number) => {

    switch (num) {
        case 1:
            return "Your Project";
        case 2:
            return "You Are Member";
    }

}


interface ProjectCardDescriptionProps {
    projectPost: PostDTO;
    archived: boolean
    sentRequest: boolean
    onArchiveClick: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

export function PostCardDescription({ projectPost, onArchiveClick, onEdit, onDelete, archived, sentRequest }: ProjectCardDescriptionProps) {

    const [loading, setLoading] = useState<boolean>(false);
    const [isOwner, setIsOwner] = useState<boolean>(false);
    const [isMember, setIsMember] = useState<boolean>(false);
    const user = useUserSelector(state => state.authSlice.user);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    useEffect(() => {
        if (user) {

            projectMemberService.isMember(user.sub, projectDTO.id)
                .then(res => {
                    setIsMember(res);
                })
                .catch(err => {
                    toast.error(err.response.data);
                })

            projectMemberService.isOwner(user.sub, projectDTO.id)
                .then(res => {
                    setIsOwner(res);
                })
                .catch(err => {
                    toast.error(err.repsonse.data)
                })

        }
    }, []);


    const { title, description, projectDTO, positions } = projectPost;

    const trancuatedDesc = description.length > 200 ? description.slice(0, 200) + '...' : description;

    return (
        <div className="flex flex-col flex-grow w-full px-6 py-4 gap-2">
            <div className="flex w-full justify-between items-center">
                {/* Title + isowner */}
                <div className="flex flex-col-reverse items-start sm:flex justify-between w-full gap-3 font-bold text-2xl text-gray-900 dark:text-white">
                    <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-tight">{title}</h1>
                    <div className="flex justify-between items-center w-full">
                        {isMember && <span className="text-xs text-white bg-slate-500 px-3 py-1 rounded-full">{isOwner ? getMemberTypeTitle(1) : getMemberTypeTitle(2)}</span>}

                        {/* OWNER CRUD BUTTONS MENU */}
                        {isOwner
                            &&
                            <div className="relative">
                                <button
                                    onClick={() => setMenuOpen(!menuOpen)}
                                    className="cursor-pointer hover:bg-gray-300/10 focus:bg-gray-300/10 p-2 rounded-full">
                                    <BiDotsVertical size={25} />
                                </button>
                                {menuOpen &&
                                    <div className="crud-buttons absolute right-0 -bottom-18 font-light dark:bg-slate-900 bg-white px-2 w-30 py-2 gap-1 dark:text-white flex flex-col items-center text-base">
                                        <button
                                            onClick={onEdit}
                                            className="cursor-pointer hover:bg-slate-700 w-full">Edit</button>
                                        <button
                                            onClick={onDelete}
                                            className="cursor-pointer hover:bg-slate-700 w-full">Delete</button>
                                    </div>}

                            </div>}

                    </div>

                </div>

                {!isMember && <button
                    disabled={loading}
                    onClick={onArchiveClick}
                    title={archived ? "Remove from archive" : "Add to archive"}
                    className={`cursor-pointer ${archived && 'text-yellow-500'} disabled:cursor-not-allowed transition-colors`}>
                    <MdBookmarkAdd size={30} />
                </button>
                }

            </div>

            <p className="text-gray-600 dark:text-gray-300 text-sm">{trancuatedDesc}</p>

            <div className="flex flex-col w-full gap-5 items-center py-4">

                {/* Positions buttons to request to join */}

                {!isMember && positions.length > 0 && positions.map(p => {
                    return <PostCardPositionCard 
                    key={p.id} 
                    postId={projectPost.id} 
                    postPosition={p}
                    user={user}
                    />
                })}

            </div>

        </div>
    )
}