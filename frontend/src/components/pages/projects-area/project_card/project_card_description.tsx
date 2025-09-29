import { BiCheck } from "react-icons/bi";
import { MdBookmarkAdd } from "react-icons/md";
import type { ProjectPostDTO } from "../../../../dtos/models_dtos/ProjectPostDTO";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useUserSelector } from "../../../../redux/hooks";
import projectMemberService from "../../../../service/ProjectMemberService";

interface ProjectCardDescriptionProps {

    loading: boolean
    projectPost: ProjectPostDTO;
    archived: boolean
    sentRequest: boolean
    onRequestToJoin: () => void;
    onArchiveClick: () => void;

}

export function ProjectCardDescription({loading ,projectPost, onArchiveClick, onRequestToJoin ,archived, sentRequest }: ProjectCardDescriptionProps) {


    const [isOwner, setIsOwner] = useState<boolean>(false);
    const [isMember, setIsMember] = useState<boolean>(false);
    const user = useUserSelector(state => state.authSlice.user);

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
        
        switch(num) {
            case 1:
                return "Your Project";
            case 2:
                return "You Are Member";
        }
        
    }

    return (
        <div className="flex flex-col flex-grow w-full px-6 py-4 gap-2">
            <div className="flex w-full justify-between items-center">

                <div className="flex items-center gap-3 font-bold text-2xl text-gray-900 dark:text-white">
                    <p>{projectDTO.name}</p>
                    <span className="text-xs bg-slate-500 px-3 py-1 rounded-full">{isMember && (isOwner ? getMemberTypeTitle(1) : getMemberTypeTitle(2))}</span>
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

                {/* If length > 3 then display button view more */}
                {positions.length > 3 && <button className="cursor-pointer hover:font-medium">View More</button>}
            </div>

        </div>
    )
}