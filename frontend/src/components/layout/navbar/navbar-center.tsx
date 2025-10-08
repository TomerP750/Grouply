import { FaHome, FaInfo } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import type { JwtUser } from "../../../redux/AuthSlice";
import { MdDashboard } from "react-icons/md";
import { BiBell, BiChat } from "react-icons/bi";
import { Badge } from "../../elements/Badge";


const linkClasses = ({ isActive }: { isActive: boolean }) =>
  [
    "inline-flex flex-col items-center gap-1 transition-colors duration-200",
    isActive
      ? "text-teal-500 font-semibold"
      : "text-black dark:text-white hover:text-teal-400",
  ].join(" ");

interface NavbarCenterProps {
  user: JwtUser | null;
}

export function NavbarCenter({ user }: NavbarCenterProps) {

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
          <NavLink to={`/dashboard/${user?.id}`} className={linkClasses}>
            <MdDashboard size={22} />
            <span className="text-sm">Dashboard</span>
          </NavLink>
        </li>


        <li>
          <button className="cursor-pointer inline-flex flex-col items-center gap-1 transition-colors duration-200">
            {/* <BiChat size={22} /> */}
            <Badge Icon={BiChat} count={0}/>
            <span className="text-sm">Messages</span>
          </button>
        </li>

        <li>
          <button className="cursor-pointer inline-flex flex-col items-center gap-1 transition-colors duration-200">
            <Badge Icon={BiBell} count={0}/>
            <span className="text-sm">Notification</span>
          </button>
        </li>

        
        

      </ul>
    </div>
  );
}
