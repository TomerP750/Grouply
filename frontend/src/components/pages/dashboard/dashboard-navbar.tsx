import { useEffect, useState } from "react";
import { BiTask } from "react-icons/bi";
import { FaUserGroup } from "react-icons/fa6";
import { MdAdminPanelSettings, MdDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import logoLight from "../../../assets/logolight.png";
import logoDark from "../../../assets/logodark.png";
import type { JwtUser } from "../../../redux/AuthSlice";
import userService from "../../../service/UserService";
import { NavbarRight } from "../../layout/navbar/NavbarRight";
import { useTheme } from "../../../context/ThemeContext";
import { AdminMenu } from "./admin_menu";


const baseClasses =
    "cursor-pointer dark:text-gray-300 w-full p-2 inline-flex items-center gap-2 rounded-md transition";
const activeClasses = "underline decoration-teal-500 decoration-2 underline-offset-10 font-bolder";
const inactiveClasses = "hover:bg-gray-300/20 dark:text-gray-300";

interface DashboardNavbarProps {
    user: JwtUser | null
}

export function DashboardNavbar({ user }: DashboardNavbarProps) {

    const [adminMenuOpen, setAdminMenuOpen] = useState<boolean>(false);

    const [authorized, setAuthorized] = useState<boolean>(false);

    const {theme} = useTheme();

    useEffect(() => {
        if (user)
            userService.isAdmin()
                .then(res => {
                    setAuthorized(res);
                })
                .catch(err => {
                    toast.error(err.response.data);
                })

    }, []);




    return (
        <div className="h-30 flex justify-between gap-5 items-center px-10 text-black dark:text-gray-300">

            <NavLink to={"/"}>
                <img src={theme === "light" ? logoDark : logoLight} className="w-30 aspect-square object-fit object-center" />
            </NavLink>

            <ul className="flex items-center gap-3 p-5 font-medium text-sm tracking-wider">

                <li>
                    <NavLink
                        end
                        to={`/dashboard/${user?.id}`}
                        className={({ isActive }) =>
                            `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
                        }
                    >
                        <MdDashboard size={25} />
                        <p>Dashboard</p>
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to={`/dashboard/${user?.id}/projects`}
                        className={({ isActive }) =>
                            `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
                        }
                    >
                        <BiTask size={25} />
                        <p>Projects</p>
                    </NavLink>
                </li>

                {authorized &&

                    <li className="relative">
                        <button 
                        onClick={() => setAdminMenuOpen(!adminMenuOpen)}
                        className="hover:bg-gray-300/30 cursor-pointer dark:text-gray-300 w-full p-2 inline-flex items-center gap-2 rounded-md transition">
                            <MdAdminPanelSettings size={25} />
                            <p>Admin</p>
                        </button>
                        {adminMenuOpen && <AdminMenu onClose={() => setAdminMenuOpen(false)}/>}
                    </li>
                    // <li>
                    //     <NavLink
                    //         to={`/dashboard/${user?.id}/users`}
                    //         className={({ isActive }) =>
                    //             `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
                    //         }
                    //     >
                    //         <FaUserGroup size={25} />
                    //         <p>Users</p>
                    //     </NavLink>
                    // </li>
                }


            </ul>

            <NavbarRight  user={user} />



        </div>
    )
}