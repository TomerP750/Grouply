import { NavLink } from "react-router-dom";
import logoDark from "../../../assets/logodark.png";
import logoLight from "../../../assets/logolight.png";
import { useTheme } from "../../../context/ThemeContext";
import type { JwtUser } from "../../../redux/AuthSlice";
import { NavbarCenter } from "./navbar-center";
import { SearchBar } from "./search_bar";

interface NavbarLeftProps {
    user: JwtUser | null
}

export function NavbarLeft({ user }: NavbarLeftProps) {

    const { theme } = useTheme();

    return (
        <div className="hidden lg:flex items-center w-full">
            <div className="flex items-center w-2/3 gap-3">
                <NavLink to={"/"}> <img src={theme === "dark" ? logoLight : logoDark}
                    alt="logo"
                    className="cursor-pointer w-30 aspect-square object-fit object-center" /></NavLink>

                {user && <SearchBar/>}
            </div>
            {user && <NavbarCenter user={user} />}
        </div>
    )
}