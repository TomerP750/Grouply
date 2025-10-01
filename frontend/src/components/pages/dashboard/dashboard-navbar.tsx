import { BiTask } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { NavbarRight } from "../../layout/navbar/NavbarRight";
import type { JwtUser } from "../../../redux/AuthSlice";
import logo from "../../../assets/logolight.png";

interface DashboardNavbarProps {
    user: JwtUser | null
}

export function DashboardNavbar({ user }: DashboardNavbarProps) {
    return (
        <div className="h-30 flex justify-between gap-5 items-center px-10 text-white">
            
            <img src={logo} alt="logo" className="w-30 aspect-square object-fit object-center" />
            
            <ul className="flex items-center gap-3 w-full p-5 font-medium text-sm tracking-wider">

                <li>
                    <button className="cursor-pointer w-full p-2 inline-flex items-center gap-2 hover:bg-slate-800/50">
                        <FaHome size={25} />
                        <p>Dashboard</p>
                    </button>
                </li>

                <li>
                    <button className="cursor-pointer w-full p-2 inline-flex items-center gap-2 hover:bg-slate-800/50">
                        <BiTask size={25} />
                        <p>Projects</p>
                    </button>
                </li>

                
            </ul>

            <NavbarRight user={user} />



        </div>
    )
}