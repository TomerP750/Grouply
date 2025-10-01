import { BiTask } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { NavbarRight } from "../../layout/navbar/NavbarRight";
import type { JwtUser } from "../../../redux/AuthSlice";
import logo from "../../../assets/logolight.png";
import { NavLink } from "react-router-dom";


const baseClasses =
    "cursor-pointer text-gray-300 w-full p-2 inline-flex items-center gap-2 rounded-md transition";
const activeClasses = "bg-gray-950 text-white font-bolder";
const inactiveClasses = "hover:bg-slate-800/50 text-gray-300";

interface DashboardNavbarProps {
    user: JwtUser | null
}

export function DashboardNavbar({ user }: DashboardNavbarProps) {
    return (
        <div className="h-30 flex justify-between gap-5 items-center px-10 text-white">

            <img src={logo} alt="logo" className="w-30 aspect-square object-fit object-center" />

            <ul className="flex items-center gap-3 w-full p-5 font-medium text-sm tracking-wider">

                <li>
                    <NavLink
                        end
                        to={`/dashboard/${user?.id}`}
                        className={({ isActive }) =>
                            `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
                        }
                    >
                        <FaHome size={25} />
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


            </ul>

            <NavbarRight user={user} />



        </div>
    )
}