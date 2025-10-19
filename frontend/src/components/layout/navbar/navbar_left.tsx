import { NavLink } from "react-router-dom";
import logoDark from "../../../assets/logodark.png";
import logoLight from "../../../assets/logolight.png";
import { useTheme } from "../../../context/ThemeContext";
import type { JwtUser } from "../../../redux/AuthSlice";




interface NavbarLeftProps {
    user: JwtUser | null
}

export function NavbarLeft({ user }: NavbarLeftProps) {

    const { theme } = useTheme();

    return (
        <div className="hidden lg:flex items-center gap-5">

            <NavLink to={"/"}> <img src={theme === "dark" ? logoLight : logoDark}
                alt="logo"
                className="cursor-pointer w-30 mt-4 aspect-square object-fit object-center" />
            </NavLink>

            
        </div>
    )
}