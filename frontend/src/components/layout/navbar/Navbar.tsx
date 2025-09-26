import { AiOutlineTeam } from "react-icons/ai";
import { NavbarRight } from "./NavbarRight";
import { NavLink } from "react-router-dom";


export function Navbar() {

    return (
        <nav
            className={`w-full h-30 flex justify-between items-center px-5 sm:px-20 text-black dark:text-white `}>
            {/* Left */}
            <NavLink to={"/"} className="cursor-pointer"><AiOutlineTeam size={50} /></NavLink>
            <NavbarRight />
        </nav>
    )
}