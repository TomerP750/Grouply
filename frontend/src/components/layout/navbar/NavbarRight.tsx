import { useState } from "react";
import { BiMenu, BiMoon, BiSun } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";
import { NavbarDrawer } from "./Navbar-Drawer";


const navbarItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/pricing", label: "Pricing" }
];


export function NavbarRight() {

    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    const { theme, toggle } = useTheme();

    const [isActive, setIsActive] = useState<string>("home");

    return (
        <nav className="flex items-center gap-5">

            <ul className="hidden sm:flex items-center gap-8 text-lg text-[#1d6654] dark:text-white">

                {navbarItems.map(item => {
                    const active = isActive === item.label.toLowerCase();

                    return (
                        <li key={item.to}>
                            <NavLink
                                to={item.to}
                                onClick={() => setIsActive(item.label.toLowerCase())}
                                className={`${active
                                    ? "dark:bg-white dark:text-black bg-black text-white px-2 py-1 rounded-xl "
                                    : "text-gray-400"} ${!active && 'hover:underline hover:underline-offset-4'}`}
                            >
                                {item.label}
                            </NavLink>
                        </li>
                    )
                })}

            </ul>

            <NavLink
                to="/login"
                className={"hidden sm:block bg-[#0f0f10] text-white py-3 px-5 rounded-3xl font-bold hover:bg-gray-800"}>Login</NavLink>

            <button onClick={() => setMenuOpen(true)}>
                <BiMenu className="visible sm:hidden dark:text-white cursor-pointer" size={40} />
            </button>

            <button
                onClick={toggle}
                className={`hidden sm:block p-2 rounded-full ${theme === "dark" ? ' text-yellow-400 bg-blue-900' : 'bg-black text-white'} cursor-pointer`}>{theme === "dark" ? <BiSun size={25} /> : <BiMoon size={25} />}
            </button>


            {menuOpen && <NavbarDrawer/>}

        </nav>
    )
}