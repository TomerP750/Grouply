import { useEffect, useState } from "react";
import { BiDotsVertical, BiHistory } from "react-icons/bi";
import { MdBookmarkAdd } from "react-icons/md";
import { toast } from "react-toastify";
import type { PostDTO } from "../../../../dtos/models_dtos/post_dto";
import { useUser } from "../../../../redux/hooks";
import archivedPostService from "../../../../service/archived_project_service";
import projectMemberService from "../../../../service/project_member_service";
import { timeAgo, toNormal } from "../../../../util/util_functions";
import { Dialog } from "../../../elements/Dialog";

import './post_card_css.css';
import { PostCardPositionCard } from "./post_card_position_card";
import { EditPostFormModal } from "../forms/edit_post_form";


type MemberType = "member" | "owner"

export const getMemberTypeTitle = (type: MemberType) => {

    switch (type) {
        case "owner":
            return "Your Project";
        case "member":
            return "You Are Member";
    }

}


interface ProjectCardContentProps {
    post: PostDTO;
    sentRequest: boolean
    onEdit: () => void;
    onDelete: () => void;
}

export function PostCardContent({ post, onEdit, onDelete, sentRequest }: ProjectCardContentProps) {

    const [loading, setLoading] = useState<boolean>(false);
    const [isOwner, setIsOwner] = useState<boolean>(false);
    const [isMember, setIsMember] = useState<boolean>(false);
    const user = useUser();
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

    const [archived, setArchived] = useState<boolean>(false);

    useEffect(() => {
        archivedPostService.isPostArchived(post.id)
            .then(res => {
                setArchived(res);
            })
            .catch(err => {
                toast.error(err.response.data);
            })
    })

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

    const handleToggleArchive = (id: number) => {
        setLoading(true);
        archivedPostService.toggleArhiveProject(id)
            .then(res => {
                if (res === false) {
                    toast.success("Removed to archive!");
                    // onRemoveFromArchive?.(id);
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


    const { title, description, projectDTO, positions, postedAt } = post;

    const trancuatedDesc = description.length > 200 ? description.slice(0, 200) + '...' : description;

    return (
        <div className="flex flex-col flex-grow w-full px-6 py-4 gap-2">
            
            {/* Time ago */}
            <div className="flex items-center gap-1">
                <BiHistory size={18} className="mt-1"/>
                <p className="text-sm font-medium dark:text-gray-300">{timeAgo(postedAt)}</p> 
            </div>
            
            <div className="flex w-full justify-between items-center">
                {/* Title + isowner */}
                <div className="flex flex-col-reverse items-start sm:flex justify-between w-full gap-3 font-bold text-2xl text-gray-900 dark:text-white">
                    <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold leading-tight">{toNormal(title)}</h1>
                    <div className="flex justify-between items-center w-full">
                        {isMember && <span className="text-xs text-white bg-sky-500 dark:bg-teal-300/50 px-3 py-1 ">{isOwner ? getMemberTypeTitle("owner") : getMemberTypeTitle("member")}</span>}

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
                                            onClick={() => setEditModalOpen(true)}
                                            className="cursor-pointer hover:bg-indigo-200 dark:hover:bg-slate-700 w-full">Edit</button>
                                        <button
                                            onClick={() => setDialogOpen(true)}
                                            className="cursor-pointer hover:bg-indigo-200 dark:hover:bg-slate-700 w-full">Delete</button>
                                    </div>}

                            </div>}

                        {editModalOpen && <EditPostFormModal post={post} open={editModalOpen} onClose={() => setEditModalOpen(false)} />}

                    </div>

                </div>

                {!isMember && <button
                    disabled={loading}
                    onClick={() => handleToggleArchive(post.id)}
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
                        postId={post.id}
                        postPosition={p}
                        user={user}
                    />
                })}

            </div>

            {dialogOpen && <Dialog onConfirm={onDelete} open={dialogOpen} message={"Are you sure you want to delete this post?"} onClose={() => setDialogOpen(false)} />}


        </div>
    )
}