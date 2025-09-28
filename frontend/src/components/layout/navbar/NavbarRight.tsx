import { useState } from "react";
import { BiMenu, BiMoon, BiSun } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";
import { NavbarDrawer } from "./Navbar-Drawer";
import { useUser, useUserSelector } from "../../../redux/hooks";
import { Avatar } from "../../elements/Avatar";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/AuthSlice";



const navbarItems = [
  { to: "/", label: "Home", end: true }, // end=true so "/" doesn't match every route
  { to: "/about", label: "About" },
  { to: "/search-projects", label: "Search Projects" },
  // { to: "/pricing", label: "Pricing" },
];

const linkClasses = ({ isActive }: { isActive: boolean }) =>
  ["px-3 py-1 rounded-xl transition", isActive
    ? "bg-black text-white dark:bg-white dark:text-black font-semibold"
    : "text-gray-500 hover:underline hover:underline-offset-4 dark:text-gray-300",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400",
  ].join(" ");


export function NavbarRight() {

  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const { theme, toggle } = useTheme();

  const user = useUserSelector(state => state.authSlice.user);

  const navigate = useNavigate();
  const dispatch = useDispatch()

  return (
    <nav className="flex items-center gap-5">
      {/* Desktop links */}
      <ul className="hidden md:flex items-center gap-6 text-lg">
        {navbarItems.map(({ to, label, end }) => (
          <li key={to}>
            <NavLink to={to} end={end} className={linkClasses}>
              {label}
            </NavLink>
          </li>
        ))}

        {/* Login button */}
        {user
          ? <Avatar user={user} size={40} onClick={() => navigate(`/profile/${user?.id}`)} />
          : <NavLink
            to="/login"
            className="hidden md:inline-flex items-center justify-center 
          rounded-3xl bg-[#0f0f10] px-5 py-3 text-white font-bold hover:bg-gray-800 
          focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          >
            Login
          </NavLink>}

          {user && <button className="cursor-pointer hover:bg-purple-600" onClick={() => dispatch(logout())}>
            Logout
          </button>}

        {/* Theme toggle */}
        <button
          onClick={toggle}
          className={`cursor-pointer hidden md:inline-flex items-center justify-center p-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${theme === "dark" ? "text-yellow-400 bg-blue-900" : "bg-black text-white"
            }`}
          aria-label="Toggle theme"
          title="Toggle theme"
        >
          {theme === "dark" ? <BiSun size={22} /> : <BiMoon size={22} />}
        </button>

      </ul>



      {/* Mobile menu button */}
      <button
        onClick={() => setMenuOpen(true)}
        className="md:hidden p-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
        aria-label="Open menu"
      >
        <BiMenu className="text-current" size={40} />
      </button>



      {/* Drawer */}
      {menuOpen && <NavbarDrawer onClose={() => setMenuOpen(false)} />}
    </nav>
  );
}