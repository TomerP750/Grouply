import { useLocation } from "react-router-dom";
import './Navbar.css';
import { NavbarRight } from "../components/NavbarRight";
import { useUserSelector } from "../../../shared/store/hooks";
import { NavbarCenter } from "../components/NavbarCenter";
import { NavbarLeft } from "../components/NavbarLeft";


export function Navbar() {

    const user = useUserSelector(state => state.authSlice.user);

    const { pathname } = useLocation();

    const hideNavbar = pathname.startsWith("/dashboard") || pathname.startsWith("/login") || pathname.startsWith("/signup");

    if (hideNavbar) {
        return null;
    }

    return (

        <nav className={`z-1000 hidden Navbar  
                ${ 'bg-white/80 dark:bg-stone-800 backdrop-blur-md '}
                w-full h-24 md:flex justify-between items-center px-5 
                sm:px-10 text-[#1e293b] dark:text-white`}>

            <NavbarLeft user={user} />

            <NavbarCenter user={user} />

            <NavbarRight user={user} />

        </nav>

    )
}