import { useState } from "react";
import { BiBell, BiChat, BiMenu } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { Avatar } from "../../elements/Avatar";
import { Badge } from "../../elements/Badge";
import { NavbarDrawer } from "./Navbar-Drawer";
import type { JwtUser } from "../../../redux/AuthSlice";


interface NavbarRightProps {
  user: JwtUser | null;
}


export function NavbarRight({ user }: NavbarRightProps) {

  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const [notificationOpen, setNotificationOpen] = useState<boolean>(false);
  const [messageOpen, setMessageOpen] = useState<boolean>(false);

  return (
    <nav className="flex items-center gap-5">

      <ul className="hidden lg:flex items-center text-lg">


        {user && <div className="relative hover:bg-gray-500/20">
          <button onClick={() => {
            setNotificationOpen(!notificationOpen)
            setMessageOpen(false)
          }}>
            <Badge Icon={BiBell} size={28} className="cursor-pointer p-3" />
          </button>
          {notificationOpen && <div className="absolute right-0 mt-2 bg-white w-60 max-w-70 min-h-30" />}
        </div>}

        {user && <div className="relative hover:bg-gray-500/20 mr-3">
          <button onClick={() => {
            setMessageOpen(!messageOpen)
            setNotificationOpen(false)
          }}>
            <Badge Icon={BiChat} size={28} className="cursor-pointer p-3" />
          </button>
          {messageOpen && <div className="absolute right-0 mt-2 bg-white w-60 max-w-70 min-h-30" />}
        </div>}



        {user
          ? <Avatar className="cursor-pointer" user={user} size={40} onClick={() => setMenuOpen(true)} />
          : <NavLink
            to="/login"
            className="hidden md:inline-flex items-center justify-center 
          rounded-3xl bg-[#0f0f10] dark:bg-teal-700 dark:hover:bg-teal-600 px-5 py-1 text-white font-bold hover:bg-gray-800 
          focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400
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