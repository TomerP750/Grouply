import { useState } from "react";
import { BiBell, BiChat } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import type { JwtUser } from "../../../redux/AuthSlice";
import { Avatar } from "../../elements/Avatar";
import { Badge } from "../../elements/Badge";
import { SearchBar } from "./search_bar";
import { UserMenu } from "./user_menu";
import { Menu } from "../../elements/Menu";
import { ConnectionMenu } from "./menus/connections_menu";
import { NotificationMenu } from "./menus/notification_menu";


interface NavbarRightProps {
  user: JwtUser | null;
}


export function NavbarRight({ user }: NavbarRightProps) {

  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const [notificationOpen, setNotificationOpen] = useState<boolean>(false);
  const [connectionsOpen, setConnectionOpen] = useState<boolean>(false);
  const [messageOpen, setMessageOpen] = useState<boolean>(false);

  return (
    <nav className="flex items-center gap-5">

      <ul className="hidden md:flex items-center text-lg">

        {/* Connection Menu */}
        {user && <div className="relative hover:bg-gray-500/20">
          <button onClick={() => {
            setConnectionOpen(!connectionsOpen);
            setMessageOpen(false);
            setNotificationOpen(false);
          }}>
            <Badge Icon={HiOutlineGlobeAlt} size={28} count={2} className="cursor-pointer p-3" />
          </button>

          {connectionsOpen && <ConnectionMenu />}
        </div>}

        {/* Notifications Menu */}
        {user && <div className="relative hover:bg-gray-500/20">
          <button onClick={() => {
            setNotificationOpen(!notificationOpen);
            setConnectionOpen(false);
            setMessageOpen(false);
          }}>
            <Badge Icon={BiBell} size={28} count={3} className="cursor-pointer p-3" />
          </button>
          {notificationOpen &&
            <Menu className=" gap-5 bg-gray-200 dark:bg-slate-950 flex flex-col flex-wrap items-start py-5 px-4 absolute top-0 mt-15 -right-2 w-95 max-w-95 min-h-64 rounded-2xl shadow-2xl dark:text-gray-300">
              <NotificationMenu />
            </Menu>}
        </div>}

        {/* {user && <div className="relative hover:bg-gray-500/20 mr-3">
          <button onClick={() => {
            setMessageOpen(!messageOpen)
            setNotificationOpen(false)
          }}>
            <Badge Icon={BiChat} size={28} className="cursor-pointer p-3" />
          </button>
          {messageOpen && <div className="absolute right-0 mt-2 bg-white w-60 max-w-70 min-h-30" />}
        </div>} */}


        {/* Avatar / Login */}
        {user
          ?
          <div className="relative ml-3 mt-3">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={"relative inline-flex flex-col items-center gap-1 transition-colors duration-200 cursor-pointer"}>
              <Avatar size={40} />
              {/* <div className="text-sm flex items-center">
                <span>{user?.username}</span>
                <span><BiChevronDown size={20} className={`${menuOpen && 'rotate-180'} transition duration-200`} /></span>
              </div> */}
            </button>
            {menuOpen && <UserMenu user={user} />}
          </div>
          :
          <NavLink
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



    </nav>
  );
}