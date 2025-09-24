import { useState } from "react";
import { BiMenu, BiMoon, BiSun } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";

export function NavbarRight() {

    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    const { theme, toggle } = useTheme();

    return (
        <nav className="flex items-center gap-5">

            <ul className="hidden sm:flex items-center gap-5">
                <li>
                    <NavLink to={"/"}>Home</NavLink>
                </li>
                <li>
                    <NavLink to={"/"}>Home</NavLink>
                </li>
                <li>
                    <NavLink to={"/"}>Home</NavLink>
                </li>
            </ul>

            <NavLink
                to="/"
                className={"hidden sm:block bg-black text-white py-3 px-5 rounded-3xl font-bold hover:bg-gray-800"}>Login</NavLink>

            <button onClick={() => setMenuOpen(true)}>
                <BiMenu className="visible sm:hidden text-white cursor-pointer" size={30} />
            </button>

            <button
                onClick={toggle}
                className={`p-2 rounded-full ${theme === "dark" ? ' text-yellow-400' : 'bg-black text-white' } cursor-pointer`}>{theme === "dark" ? <BiSun size={25} /> : <BiMoon size={25} />}
            </button>


            {menuOpen && <div></div>}

        </nav>
    )
}