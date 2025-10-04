import { BiCheck, BiDotsVertical, BiGroup } from "react-icons/bi";
import { MdBookmarkAdd } from "react-icons/md";
import type { ProjectPostDTO } from "../../../../dtos/models_dtos/PostDTO";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useUserSelector } from "../../../../redux/hooks";
import projectMemberService from "../../../../service/ProjectMemberService";
import './post_card_css.css';
import { toTitleCase } from "../../../../util/util_functions";

interface ProjectCardDescriptionProps {

    loading: boolean
    projectPost: ProjectPostDTO;
    archived: boolean
    sentRequest: boolean
    onRequestToJoin: () => void;
    onArchiveClick: () => void;
    onEdit: () => void;
    onDelete: () => void;

}

export function PostCardDescription({ loading, projectPost, onArchiveClick, onRequestToJoin, onEdit, onDelete, archived, sentRequest}: ProjectCardDescriptionProps) {


    const [isOwner, setIsOwner] = useState<boolean>(false);
    const [isMember, setIsMember] = useState<boolean>(false);
    const user = useUserSelector(state => state.authSlice.user);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    useEffect(() => {
        if (user) {

            projectMemberService.isMember(user.id, projectDTO.id)
                .then(res => {
                    setIsMember(res);
                })
                .catch(err => {
                    toast.error(err.response.data);
                })

            projectMemberService.isOwner(user.id, projectDTO.id)
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


    const getMemberTypeTitle = (num: number) => {

        switch (num) {
            case 1:
                return "Your Project";
            case 2:
                return "You Are Member";
        }

    }

    return (
        <div className="flex flex-col flex-grow w-full px-6 py-4 gap-2">
            <div className="flex w-full justify-between items-center">
                {/* Title + isowner */}
                <div className="flex flex-col-reverse items-start sm:flex justify-between w-full gap-3 font-bold text-2xl text-gray-900 dark:text-white">
                    <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-tight">{title}</h1>
                    <div className="flex justify-between items-center w-full">
                        {isMember && <span className="text-xs bg-slate-500 px-3 py-1 rounded-full">{isOwner ? getMemberTypeTitle(1) : getMemberTypeTitle(2)}</span>}
                        
                        {/* OWNER CRUD BUTTONS MENU */}
                        {isOwner
                            &&
                            <div className="relative">
                                <button
                                    onClick={() => setMenuOpen(!menuOpen)}
                                    className="cursor-pointer hover:bg-gray-300/10 focus:bg-gray-300/10 p-2 rounded-full">
                                    <BiDotsVertical size={25}/>
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
                    return <div key={p.id} className="flex justify-between items-center w-full">
                        <p className="inline-flex items-center gap-2 text-teal-300">
                            <BiGroup size={20}/> 
                            {toTitleCase(p.position)}
                        </p>
                        <button
                            disabled={loading}
                            onClick={onRequestToJoin}
                            className={`text-sm cursor-pointer transition-colors px-2 py-1 rounded-lg
                                ${sentRequest ? 'bg-green-600 hover:bg-green-500' : 'bg-blue-600 hover:bg-blue-500'}
                                `}>
                            {sentRequest ? <BiCheck size={20} /> : 'Request To Join'}
                        </button>
                    </div>
                })}

            </div>

        </div>
    )
}