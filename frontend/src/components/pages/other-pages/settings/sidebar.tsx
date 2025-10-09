import { BiLogOut, BiShield, BiUser } from "react-icons/bi";
import { MdDisplaySettings } from "react-icons/md";
import { NavLink } from "react-router-dom";

const menuItem =
  "dark:text-gray-300 hover:text-white cursor-pointer inline-flex items-center gap-3 hover:bg-gray-500/30 w-full py-2 px-2 rounded-md transition-colors";
const active =
  "bg-gray-400/30 dark:bg-gray-600/30 text-gray-600 font-bold dark:text-white";

export function SettingsSidebar() {
  return (
    <aside className="w-55 lg:w-75 min-h-screen bg-gray-300 dark:bg-slate-950 font-medium">
      <ul className="flex flex-col items-start px-3 py-5 gap-0.5">

        <li className="w-full">
          <NavLink
            to="/settings"
            end
            className={({ isActive }) =>
              `${menuItem} ${isActive ? active : ""}`
            }
          >
            <BiUser size={25} />
            <p>Account</p>
          </NavLink>
        </li>

        <li className="w-full">
          <NavLink
            to="/settings/security"
            className={({ isActive }) =>
              `${menuItem} ${isActive ? active : ""}`
            }
          >
            <BiShield size={25} />
            <p>Security</p>
          </NavLink>
        </li>

        <li className="w-full">
          <NavLink
            to="/settings/display"
            className={({ isActive }) =>
              `${menuItem} ${isActive ? active : ""}`
            }
          >
            <MdDisplaySettings size={25} />
            <p>Display</p>
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
  );
}
