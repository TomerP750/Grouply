import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { toast } from "react-toastify";
import type { UserDTO } from "../../../dtos/models_dtos/UserDTO";
import userService from "../../../service/UserService";

export function SearchBar() {

    const [query, setQuery] = useState<string>('');
    const [users, setUsers] = useState<UserDTO[]>([]);

    useEffect(() => {
        userService.getAllUsers(0, 10)
            .then(res => {
                setUsers(res.content);
            })
            .catch(err => {
                toast.error(err.response.data);
            })
    }, []);

    return (
        <div className="relative w-2/3 max-w-md hidden xl:block">
            <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for users or projects..."
                className="peer w-full rounded-full bg-gray-200 dark:bg-slate-800/40 px-4 py-2 pr-10
                           text-sm text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                           ring-1 ring-gray-500/40
                           focus:outline-none focus:ring-1 focus:ring-teal-500 transition-all duration-200"
            />
            <BiSearch
                size={20}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400
                           peer-focus:text-teal-500 transition-colors duration-200"
            />
        </div>
    );
}
