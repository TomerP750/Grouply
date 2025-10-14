import { NavLink } from "react-router-dom";
import logoDark from "../../../assets/logodark.png";
import logoLight from "../../../assets/logolight.png";
import { useTheme } from "../../../context/ThemeContext";
import type { JwtUser } from "../../../redux/AuthSlice";


const linkClasses = ({ isActive }: { isActive: boolean }) =>
  [
    "relative px-3 py-1 text-base font-light transition-all duration-200",
    "text-slate-600 dark:text-slate-300 hover:text-teal-500", 
    "after:content-[''] after:absolute after:left-0 after:-bottom-3 after:h-[2px] after:w-0 after:bg-teal-500 after:rounded-full after:transition-all after:duration-300 hover:after:w-full", 
    isActive
      ? "text-teal-500 after:w-full after:bg-teal-500" 
      : "",
  ].join(" ");

interface NavbarLeftProps {
    user: JwtUser | null
}

export function NavbarLeft({ user }: NavbarLeftProps) {

    const { theme } = useTheme();

    return (
        <div className="hidden lg:flex items-center gap-5">

            <NavLink to={"/"}> <img src={theme === "dark" ? logoLight : logoDark}
                alt="logo"
                className="cursor-pointer w-30 aspect-square object-fit object-center" />
            </NavLink>

            {user && <ul className="hidden lg:flex items-center gap-5 text-lg mb-5">
                <li>
                    <NavLink to="/" className={linkClasses}>
                        <span className="text-sm">Home</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/about" className={linkClasses}>

                        <span className="text-sm">About</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink to={`/dashboard/${user?.id}`} className={linkClasses}>
                        <span className="text-sm">Dashboard</span>
                    </NavLink>
                </li>

                




            </ul>}
        </div>
    )
}