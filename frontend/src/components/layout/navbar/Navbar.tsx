import { useUserSelector } from "../../../redux/hooks";
import './Navbar.css';
import { NavbarLeft } from "./navbar_left";
import { NavbarRight } from "./NavbarRight";


export function Navbar() {

    const user = useUserSelector(state => state.authSlice.user);

    return (
        <nav className={`hidden Navbar bg-gray-100/50 dark:bg-slate-900/40 w-full h-30 md:flex justify-between items-center px-5 sm:px-10 text-black dark:text-white`}>
     
            <div className="flex items-center w-2/3">
                <NavbarLeft user={user}/>
            </div>



            <NavbarRight user={user} />
        </nav>
    )
}