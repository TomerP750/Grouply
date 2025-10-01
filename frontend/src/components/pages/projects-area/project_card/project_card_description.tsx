import { BiCheck, BiDotsVertical } from "react-icons/bi";
import { MdBookmarkAdd } from "react-icons/md";
import type { ProjectPostDTO } from "../../../../dtos/models_dtos/ProjectPostDTO";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useUserSelector } from "../../../../redux/hooks";
import projectMemberService from "../../../../service/ProjectMemberService";
import './project_card_css.css';

interface ProjectCardDescriptionProps {

    loading: boolean
    projectPost: ProjectPostDTO;
    archived: boolean
    sentRequest: boolean
    onRequestToJoin: () => void;
    onArchiveClick: () => void;
    inReadMore?: boolean
    onEdit: () => void;
    onDelete: () => void;

}

export function ProjectCardDescription({ loading, projectPost, onArchiveClick, onRequestToJoin, onEdit, onDelete, archived, sentRequest, inReadMore }: ProjectCardDescriptionProps) {


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

    if (inReadMore) {
        return (
            <div className="flex flex-col flex-grow w-full px-6 py-6 gap-8">
                {/* Header */}
                <div className="flex w-full justify-between items-center">
                    <div className="flex items-center gap-3 flex-wrap">
                        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">
                            {title}
                        </h1>

                        {isMember && (
                            <span className="text-xs md:text-sm text-white bg-gradient-to-br from-teal-900 via-teal-800 to-teal-600  px-3 py-1 rounded-full">
                                {isOwner ? getMemberTypeTitle(1) : getMemberTypeTitle(2)}
                            </span>
                        )}
                    </div>

                    {!isMember && (
                        <button
                            disabled={loading}
                            onClick={onArchiveClick}
                            title={archived ? "Remove from archive" : "Add to archive"}
                            className={` 
                                inline-flex items-center justify-center rounded-full p-2
                            transition-colors hover:bg-slate-100 dark:hover:bg-slate-800
                            disabled:cursor-not-allowed
                            ${archived ? "text-yellow-500" : "text-slate-500"}
                            `}
                        >
                            <MdBookmarkAdd size={28} />
                        </button>
                    )}
                </div>

                {/* Description */}
                <div className="space-y-4 max-w-3xl">
                    <p className="text-gray-700 dark:text-gray-300">{description}</p>
                    <p className="text-gray-700 dark:text-gray-300">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae asperiores voluptatum unde? Dolore praesentium rerum, non omnis similique qui temporibus, in ea cupiditate magni maxime quae, accusamus dolorem illum doloremque?
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae asperiores voluptatum unde? Dolore praesentium rerum, non omnis similique qui temporibus, in ea cupiditate magni maxime quae, accusamus dolorem illum doloremque?
                    </p>
                </div>

                {/* Positions */}
                <div className="flex flex-col w-full gap-4 items-center">
                    {!isMember &&
                        positions.length > 0 &&
                        positions.map((p) => (
                            <div
                                key={p.id}
                                className="flex justify-between items-center w-full sm:w-2/3 rounded-lg border border-slate-200 dark:border-slate-700 px-4 py-2"
                            >
                                <span className="text-gray-800 dark:text-gray-200">
                                    {p.position}
                                </span>

                                <button
                                    disabled={loading}
                                    onClick={onRequestToJoin}
                                    className={`cursor-pointer text-sm font-medium px-3 py-1.5 rounded-md transition-colors ${sentRequest
                                        ? "bg-green-600 text-white hover:bg-green-500"
                                        : "bg-blue-600 text-white hover:bg-blue-500"}`}
                                >
                                    {sentRequest ? <BiCheck size={18} /> : "Request To Join"}
                                </button>
                            </div>
                        ))}
                </div>
            </div>
        );

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
                                    className="cursor-pointer relative">
                                    <BiDotsVertical size={25} />
                                    {menuOpen &&
                                        <div className="crud-buttons absolute right-0 -bottom-18 font-light dark:bg-slate-900 bg-white px-2 w-30 py-2 gap-1 dark:text-white flex flex-col items-center text-base">
                                            <button 
                                            onClick={onEdit}
                                            className="cursor-pointer hover:bg-slate-700 w-full">Edit</button>
                                            <button 
                                            onClick={onDelete}
                                            className="cursor-pointer hover:bg-slate-700 w-full">Delete</button>
                                        </div>}
                                </button>
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
                        <p>{p.position}</p>
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