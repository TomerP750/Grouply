import { HiOutlineBookOpen, HiUserAdd } from "react-icons/hi";
import { MdBookmarkAdd } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { Avatar } from "../../elements/Avatar";
import { useState } from "react";

interface ProjectCardProps {
    dummy: {
        name: string,
        desc: string
    }
}


export function ProjectCard({ dummy }: ProjectCardProps) {

    const [participantsOpen, setParticipantsOpen] = useState<boolean>(false);

    const handleRequestToJoin = () => {

    };

    return (
        <div className="w-115 h-90 bg-white dark:bg-slate-800 dark:text-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
            {/* Image placeholder */}
            <div className="h-1/3 bg-gradient-to-r from-blue-600 to-blue-500 w-full"></div>

            {/* Content */}
            <div className="flex flex-col flex-grow w-full px-6 py-4 gap-2">
                <div className="flex w-full justify-between items-center">
                    <h1 className="font-bold text-2xl text-gray-900 dark:text-white">{dummy.name}</h1>
                    <div className="flex gap-3 items-center">
                        <button title="Read more about the project" className="cursor-pointer hover:text-orange-600 transition-colors">
                            <HiOutlineBookOpen size={30} />
                        </button>
                        <button title="Add to archive" className="cursor-pointer hover:text-orange-600 transition-colors">
                            <MdBookmarkAdd size={30} />
                        </button>
                    </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{dummy.desc}</p>
            </div>

            {/* Actions + some users*/}
            <div className="flex items-center justify-between w-full px-6 pb-4 mt-auto">
                <div className="flex -space-x-2 items-center cursor-pointer">
                    {/* bring users from db and display avatar and onclick navigate to user profile */}
                    <NavLink to={"/profile/1"}><Avatar size={30} /></NavLink>
                    <Avatar size={30} />
                    <Avatar size={30} />
                    <Avatar size={30} />
                    <span className="ml-2.5">+2</span>
                </div>
                <button className="inline-flex items-center gap-2 cursor-pointer bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm">
                    <span><HiUserAdd size={25}/></span>
                    <span>Request To Join</span>
                </button>
            </div>
        </div>
    );

}