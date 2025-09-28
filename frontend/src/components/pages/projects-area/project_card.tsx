import { HiOutlineBookOpen, HiUserAdd } from "react-icons/hi";
import { MdBookmarkAdd } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { Avatar } from "../../elements/Avatar";
import { useState } from "react";
import defaultImage from "../../../assets/projectdefault.jpg";
import type { ProjectPostDTO } from "../../../dtos/models_dtos/ProjectPostDTO";

interface ProjectCardProps {
    projectPost: ProjectPostDTO
}


export function ProjectCard({ projectPost }: ProjectCardProps) {

    const { title, description, projectDTO, positions } = projectPost;

    const [participantsModalOpen, setParticipantsModalOpen] = useState<boolean>(false);

    const handleRequestToJoin = (id: number) => {
        return null;
    };

    const handleAddToArchive = (id: number) => {
        return null;
    };

    return (
        <div className="w-115 min-h-100 bg-gray-100 dark:bg-slate-800 dark:text-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
            {/* Image placeholder */}
            <img src={defaultImage} className="h-[40%] object-center object-cover bg-gradient-to-r from-blue-600 to-blue-500 w-full"/>

            {/* Description + Buttons to join */}
            <div className="flex flex-col flex-grow w-full px-6 py-4 gap-2">
                <div className="flex w-full justify-between items-center">
                    <h1 className="font-bold text-2xl text-gray-900 dark:text-white">{projectDTO.name}</h1>
                    <div className="flex gap-3 items-center">
                        <button 
                        onClick={() => handleAddToArchive(projectDTO.id)}
                        title="Add to archive" 
                        className="cursor-pointer hover:text-orange-600 transition-colors">
                            <MdBookmarkAdd size={30} />
                        </button>
                    </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
                {/* TODO make post project have multiple position and map it to position name + button */}
                <div className="flex flex-col w-full gap-5 items-center py-4">
                    {/* Positions buttons to request to join */}
                    {positions.length > 0 && positions.map(p => {
                        return <div key={p.id} className="flex justify-between items-center w-full">
                        <p>{p.position}</p>
                        <button className="text-sm cursor-pointer bg-blue-500 hover:bg-blue-400 px-2 py-1 rounded-lg">Request To Join</button>
                    </div>
                    })}
                    {/* If length > 3 then display button view more */}
                    <button className="cursor-pointer hover:font-medium">View More</button>
                </div>

            </div>

            {/* Actions + some users*/}
            <div className="flex items-center justify-between w-full px-6 pb-4 mt-auto">
                <div className="flex -space-x-2 items-center cursor-pointer">
                    {projectDTO.members.slice(0, 5).map(m => {
                        return <Avatar size={30} key={m.id}/>
                    })}
                    
                    {projectDTO.members.length > 5 && <span className="ml-2.5">+{projectDTO.members.length - 5}</span>}
                </div>
                
                <button 
                className="inline-flex items-center gap-2 cursor-pointer bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm">
                    <span>Read More</span>
                </button>
            </div>
        </div>
    );

}