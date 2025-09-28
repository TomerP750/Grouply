import { AiOutlineTeam } from "react-icons/ai";
import { NavbarRight } from "./NavbarRight";
import { NavLink } from "react-router-dom";
import './Navbar.css';

export function Navbar() {

    return (
        <nav
            className={`Navbar w-full h-30 flex justify-between items-center px-5 sm:px-20 text-black dark:text-white `}>
            {/* Left */}
            <div className="flex items-center gap-4 w-1/3">
                <NavLink to={"/"} className="cursor-pointer"><AiOutlineTeam size={50} /></NavLink>
                <input type="search" 
                className="text-white  
                rounded-full px-3 py-1 bg-slate-800 w-full focus:ring focus:ring-blue-600 focus:outline-none " 
                placeholder="search for users or projects..." />
            </div>
            <NavbarRight />
        </nav>
    )
}