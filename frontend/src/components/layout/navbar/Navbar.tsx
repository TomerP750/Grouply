import { useUser, useUserSelector } from "../../../redux/hooks";
import { NavbarCenter } from "./navbar-center";
import './Navbar.css';
import { NavbarLeft } from "./navbar_left";
import { NavbarRight } from "./NavbarRight";


export function Navbar() {

    const user = useUserSelector(state => state.authSlice.user);

    return (
        <nav className={`hidden Navbar backdrop-blur-md  bg-white/80 dark:bg-slate-900/40 w-full h-25 md:flex justify-between items-center px-5 sm:px-10 text-[#1e293b] dark:text-white`}>

            <NavbarLeft user={user} />

            <NavbarCenter user={user} />

            <NavbarRight user={user} />

        </nav>
    )
}