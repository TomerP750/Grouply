import { useState } from "react";
import { BiTask } from "react-icons/bi";
import { FaHome, FaInfo } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import type { JwtUser } from "../../../redux/AuthSlice";
import { MdDashboard } from "react-icons/md";

const linkClasses = ({ isActive }: { isActive: boolean }) =>
  [
    "inline-flex flex-col items-center gap-1 transition-colors duration-200",
    isActive
      ? "text-teal-500 font-semibold"
      : "text-gray-600 dark:text-gray-300 hover:text-teal-400",
  ].join(" ");

interface NavbarCenterProps {
  user: JwtUser | null;
}

export function NavbarCenter({ user }: NavbarCenterProps) {

  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <div>
      <ul className="hidden lg:flex items-center gap-10 text-lg">
        <li>
          <NavLink to="/" className={linkClasses}>
            <FaHome size={22} />
            <span className="text-sm">Home</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/about" className={linkClasses}>
            <FaInfo size={22} />
            <span className="text-sm">About</span>
          </NavLink>
        </li>

        <li>
          <NavLink to={`/dashboard/${user?.id}/projects`} className={linkClasses}>
            <BiTask size={22} />
            <span className="text-sm">Projects</span>
          </NavLink>
        </li>

        <li>
          <NavLink to={`/dashboard/${user?.id}`} className={linkClasses}>
            <MdDashboard size={22} />
            <span className="text-sm">Dashboard</span>
          </NavLink>
        </li>

        

      </ul>
    </div>
  );
}
