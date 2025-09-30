import { AiOutlineTeam } from "react-icons/ai";
import { NavbarRight } from "./NavbarRight";
import { NavLink } from "react-router-dom";
import './Navbar.css';
import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { useUserSelector } from "../../../redux/hooks";
import userService from "../../../service/UserService";
import type { UserDTO } from "../../../dtos/models_dtos/UserDTO";
import { toast } from "react-toastify";
import type { Page } from "../../../util/Page";


export function Navbar() {


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
            <div className="flex items-center gap-4 w-1/3">
                <NavLink to={"/"} className="cursor-pointer"><AiOutlineTeam size={50} /></NavLink>

                {/* Search bar */}

                <input type="search"
                    className="text-black dark:text-white  text-sm
                rounded-full px-3 py-2 bg-gray-300 dark:bg-slate-800 
                hidden lg:block
                w-full focus:ring focus:ring-teal-600 focus:outline-none "
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="search for users or projects..." />
            </div>


            <NavbarRight />
        </nav>
    )
}