import { useEffect, useState } from "react";
import { AiOutlineTeam } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import type { UserDTO } from "../../../dtos/models_dtos/UserDTO";
import { useUserSelector } from "../../../redux/hooks";
import userService from "../../../service/UserService";
import { NavbarCenter } from "./navbar-center";
import './Navbar.css';
import { NavbarRight } from "./NavbarRight";
import { SearchBar } from "./search_bar";
import logoDark from "../../../assets/logodark.png";
import logoLight from "../../../assets/logolight.png";
import { useTheme } from "../../../context/ThemeContext";


export function Navbar() {

    const { theme } = useTheme();

    const [query, setQuery] = useState<string>('');
    const [users, setUsers] = useState<UserDTO[]>([]);



    const user = useUserSelector(state => state.authSlice.user);

    if (user) {
        useEffect(() => {
            userService.getAllUsers(0, 10)
                .then(res => {
                    setUsers(res.content);
                })
                .catch(err => {
                    toast.error(err.response.data);
                })
        }, []);
    }

    // const filteredUsers = useMemo(() => {
    //     if (users) {
    //         const lowerQuery = query.trim().toLowerCase();
    //         if (!lowerQuery) return;

    //         return users.filter(u => {
    //             const fields = [u.username, u.firstName, u.lastName]
    //             return fields.some(v => (v ?? "").toLowerCase().includes(lowerQuery));
    //         });
    //     }
    // }, [users, query]);


    return (
        <nav
            className={`hidden Navbar w-full h-30 md:flex justify-between items-center px-5 sm:px-10 text-black dark:text-white `}>
            {/* Left */}
            <div className="flex items-center gap-10 w-1/2">
                <div className="flex items-center gap-2 w-full">
                    <NavLink to={"/"}> <img src={theme === "dark" ? logoLight : logoDark}
                        alt="logo"
                        className="cursor-pointer w-30 aspect-square object-fit object-center" /></NavLink>

                    {/* Search bar */}
                    {user && <SearchBar query={query} setQuery={setQuery} />}
                </div>
                <NavbarCenter />
            </div>



            <NavbarRight user={user} />
        </nav>
    )
}