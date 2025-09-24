import { useState } from "react";
import { BiMenu, BiMoon, BiSun } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";
import { NavbarDrawer } from "./Navbar-Drawer";

export function NavbarRight() {

    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    const { theme, toggle } = useTheme();

    return (
        <nav className="flex items-center gap-5">

            <ul className="hidden sm:flex items-center gap-8 text-lg text-[#1d6654] dark:text-white">

                <li>
                    <NavLink to={"/"}>Home</NavLink>
                </li>

                <li>
                    <NavLink to={"/"}>About</NavLink>
                </li>

                <li>
                    <NavLink to={"/"}>Pricing</NavLink>
                </li>

            </ul>

            <NavLink
                to="/login"
                className={"hidden sm:block bg-[#0f0f10] text-white py-3 px-5 rounded-3xl font-bold hover:bg-gray-800"}>Login</NavLink>

            <button onClick={() => setMenuOpen(true)}>
                <BiMenu className="visible sm:hidden dark:text-white cursor-pointer" size={40} />
            </button>

            <button
                onClick={toggle}
                className={`hidden sm:block p-2 rounded-full ${theme === "dark" ? ' text-yellow-400 bg-blue-900' : 'bg-black text-white' } cursor-pointer`}>{theme === "dark" ? <BiSun size={25} /> : <BiMoon size={25} />}
            </button>


            {menuOpen && <NavbarDrawer/>}

        </nav>
    )
}