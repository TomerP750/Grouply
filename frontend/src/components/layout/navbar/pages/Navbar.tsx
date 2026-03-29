import { useLocation } from "react-router-dom";
import { FilterProvider } from "../../../../context/filter_context";
import { useUser, useUserSelector } from "../../../../redux/hooks";
import { NavbarCenter } from "../components/navbar-center";
import './Navbar.css';
import { NavbarLeft } from "../components/navbar_left";
import { NavbarRight } from "../components/NavbarRight";


export function Navbar() {

    const { pathname } = useLocation();

    const hideNavbar = pathname.startsWith("/dashboard") || pathname.startsWith("/login") || pathname.startsWith("/signup");

    if (hideNavbar) {
        return null;
    }

    const user = useUserSelector(state => state.authSlice.user);

    return (
        <FilterProvider>
            <nav className={`hidden fixed top-0 Navbar backdrop-blur-md bg-white/80 dark:bg-stone-800 
                w-full h-24 md:flex justify-between items-center px-5 
                sm:px-10 text-[#1e293b] dark:text-white`}>

                <NavbarLeft user={user} />

                <NavbarCenter user={user} />

                <NavbarRight user={user} />

            </nav>
        </FilterProvider>
    )
}