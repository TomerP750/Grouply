import { AiOutlineTeam } from "react-icons/ai";
import { NavbarCenter } from "./NavbarCenter";
import { NavbarRight } from "./NavbarRight";
import { NavLink } from "react-router-dom";


export function Navbar() {

    return (
        <nav
            className={`h-30 flex justify-between items-center px-5 sm:px-20 text-black dark:text-white `}>

            {/* Left */}
            <NavLink to={"/"} className="cursor-pointer"><AiOutlineTeam size={50} /></NavLink>

            {/* End left */}
            <NavbarCenter />
            <NavbarRight />
        </nav>
    )
}