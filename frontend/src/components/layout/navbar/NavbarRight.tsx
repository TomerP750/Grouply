import { useState } from "react";
import { BiBell, BiChat, BiMenu } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { useUserSelector } from "../../../redux/hooks";
import { Avatar } from "../../elements/Avatar";
import { Badge } from "../../elements/Badge";
import { NavbarDrawer } from "./Navbar-Drawer";



const navbarItems = [
  { to: "/", label: "Home", end: true }, // end=true so "/" doesn't match every route
  { to: "/about", label: "About" },
];

const linkClasses = ({ isActive }: { isActive: boolean }) =>
  ["px-3 py-1 rounded-xl transition", isActive
    ? "bg-black text-white dark:bg-white dark:text-black font-semibold"
    : "text-gray-500 hover:underline hover:underline-offset-4 dark:text-gray-300",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400",
  ].join(" ");


export function NavbarRight() {

  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const user = useUserSelector(state => state.authSlice.user);

  const [notificationOpen, setNotificationOpen] = useState<boolean>(false);
  const [messageOpen, setMessageOpen] = useState<boolean>(false);

  return (
    <nav className="flex items-center gap-5">

      <ul className="hidden lg:flex items-center gap-6 text-lg">

        {navbarItems.map(({ to, label, end }) => (
          <li key={to}>
            <NavLink to={to} end={end} className={linkClasses}>
              {label}
            </NavLink>
          </li>
        ))}

        <div className="relative">
          <button onClick={() => {
            setNotificationOpen(!notificationOpen)
            setMessageOpen(false)
            }}>
            <Badge Icon={BiBell} size={25} className="cursor-pointer" />
            </button>
          {notificationOpen && <div className="absolute right-0 mt-2 bg-white w-60 max-w-70 min-h-30"/>}
        </div>

        <div className="relative">
          <button onClick={() => {
            setMessageOpen(!messageOpen)
            setNotificationOpen(false)
          }}>
            <Badge Icon={BiChat} size={25} className="cursor-pointer" />
            </button>
          {messageOpen && <div className="absolute right-0 mt-2 bg-white w-60 max-w-70 min-h-30"/>}
        </div>
        


        {user
          ? <Avatar className="cursor-pointer" user={user} size={40} onClick={() => setMenuOpen(true)} />
          : <NavLink
            to="/login"
            className="hidden md:inline-flex items-center justify-center 
          rounded-3xl bg-[#0f0f10] dark:bg-teal-700 dark:hover:bg-teal-500 px-5 py-3 text-white font-bold hover:bg-gray-800 
          focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400
          transition-colors
          "
          >
            Login
          </NavLink>}

      </ul>

      <button
        onClick={() => setMenuOpen(true)}
        className="block lg:hidden p-1 rounded"
        aria-label="Open menu"
      >
        <BiMenu className="text-current" size={40} />
      </button>


      {menuOpen && <NavbarDrawer user={user} open={menuOpen} onClose={() => setMenuOpen(false)} />}

    </nav>
  );
}