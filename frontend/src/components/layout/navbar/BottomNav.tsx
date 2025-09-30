import { NavLink } from "react-router-dom";
import { BiHome, BiUser, BiCog, BiLogOut, BiLogIn, BiChat } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/AuthSlice";
import { useUserSelector } from "../../../redux/hooks";
import { IoInformation } from "react-icons/io5";

export function BottomNav() {

    const baseClasses = "flex flex-col items-center gap-1 flex-1 py-2";
    const activeClasses = "text-teal-600 dark:text-teal-400 font-semibold";
    const inactiveClasses = "text-gray-500 dark:text-gray-400";

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    }

    const user = useUserSelector(state => state.authSlice.user);

    if (user) {
        return (
            <nav className="visible md:hidden fixed bottom-0 w-full py-2 border-t bg-white dark:bg-slate-900 flex">
                <NavLink to="/" end className={({ isActive }) => `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
                    <BiHome size={22} />
                    <span className="text-xs">Home</span>
                </NavLink>

                <NavLink to={`/profile/${user.id}`} className={({ isActive }) => `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
                    <BiUser size={22} />
                    <span className="text-xs">Profile</span>
                </NavLink>

                <NavLink to="/messages" className={({ isActive }) => `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
                    <BiChat size={22} />
                    <span className="text-xs">Messages</span>
                </NavLink>

                <NavLink to="/settings" className={({ isActive }) => `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
                    <BiCog size={22} />
                    <span className="text-xs">Settings</span>
                </NavLink>

                <button onClick={handleLogout} className={`${baseClasses} ${inactiveClasses} cursor-pointer`}>
                    <BiLogOut size={22} />
                    <span className="text-xs">Logout</span>
                </button>
            </nav>
        );
    }

    return (

        <nav className="visible md:hidden fixed bottom-0 w-full py-2 border-t bg-white dark:bg-slate-900 flex z-1000">
            <NavLink to="/" end className={({ isActive }) => `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
                <BiHome size={22} />
                <span className="text-xs">Home</span>
            </NavLink>

            <NavLink to="/about" className={({ isActive }) => `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
                <IoInformation size={22} />
                <span className="text-xs">About</span>
            </NavLink>

            <NavLink to="/login" className={({ isActive }) => `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
                <BiUser size={22} />
                <span className="text-xs">Login</span>
            </NavLink>

            

            
        </nav>
    );

}
