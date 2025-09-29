import { AiOutlineTeam } from "react-icons/ai";
import { NavbarRight } from "./NavbarRight";
import { NavLink } from "react-router-dom";
import './Navbar.css';
import { useState, type ChangeEvent } from "react";

export function Navbar() {


    const [query, setQuery] = useState<string>(''); 

    

    return (
        <nav
            className={`Navbar w-full h-30 flex justify-between items-center px-5 sm:px-20 text-black dark:text-white `}>
            {/* Left */}
            <div className="flex items-center gap-4 w-1/3">
                <NavLink to={"/"} className="cursor-pointer"><AiOutlineTeam size={50} /></NavLink>
                
                {/* Search bar */}
                <input type="search" 
                className="text-black dark:text-white  text-sm
                rounded-full px-3 py-2 bg-gray-300 dark:bg-slate-800 
                hidden lg:block
                w-full focus:ring focus:ring-teal-600 focus:outline-none " 
                onChange={(e) => setQuery(e.target.value)}
                placeholder="search for users or projects..." />

            </div>
            <NavbarRight />
        </nav>
    )
}