import { FaHome, FaInfo } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const linkClasses = ({ isActive }: { isActive: boolean }) =>
  [
    "inline-flex flex-col items-center gap-1 transition-colors duration-200",
    isActive
      ? "text-teal-500 font-semibold"
      : "text-gray-600 dark:text-gray-300 hover:text-teal-400",
  ].join(" ");

export function NavbarCenter() {
  return (
    <div>
      <ul className="hidden lg:flex items-center gap-8 text-lg">
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
      </ul>
    </div>
  );
}
