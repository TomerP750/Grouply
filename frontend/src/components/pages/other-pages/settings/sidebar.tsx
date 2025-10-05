import { BiLogOut, BiShield, BiUser } from "react-icons/bi"
import { NavLink } from "react-router-dom";


const menuItem = "text-gray-300 hover:text-white cursor-pointer inline-flex items-center gap-3 hover:bg-gray-500/30 w-full py-2 px-2";


export function SettingsSidebar() {
    return (
        <aside className="w-55 lg:w-75 min-h-screen bg-slate-950 font-medium">

            <ul className="flex flex-col items-start px-3 py-5 gap-0.5">

                <li className="w-full">
                    <NavLink to={"/settings/account"} className={`${menuItem}`}>
                        <BiUser size={25} />
                        <p>Account</p>
                    </NavLink>
                </li>

                <li className="w-full">
                    <NavLink to={"/settings/account"} className={`${menuItem}`}>
                        <BiShield size={25} />
                        <p>Security</p>
                    </NavLink>
                </li>

                 <li className="w-full">
                    <button className={`${menuItem} text-red-500`}>
                        <BiLogOut size={25} />
                        <p>Logout</p>
                    </button>
                </li>

            </ul>

        </aside>
    )
}