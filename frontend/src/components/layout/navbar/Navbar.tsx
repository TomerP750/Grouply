import { useUser, useUserSelector } from "../../../redux/hooks";
import { NavbarCenter } from "./navbar-center";
import './Navbar.css';
import { NavbarLeft } from "./navbar_left";
import { NavbarRight } from "./NavbarRight";


export function Navbar() {

    const user = useUserSelector(state => state.authSlice.user);

    return (
        <nav className={`hidden Navbar bg-gray-100/50 dark:bg-slate-900/40 w-full h-30 md:flex justify-between items-center px-5 sm:px-10 text-black dark:text-white`}>

            <NavbarLeft user={user} />

            <NavbarCenter user={user} />

            <NavbarRight user={user} />

        </nav>
    )
}