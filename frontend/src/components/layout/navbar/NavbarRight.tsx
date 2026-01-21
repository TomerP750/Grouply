import { useState } from "react";
import { BiBell, BiChat, BiChevronDown } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import type { JwtUser } from "../../../redux/AuthSlice";
import { Avatar } from "../../elements/Avatar";
import { Badge } from "../../elements/Badge";
import { SearchBar } from "./search.bar/search_bar";
import { UserMenu } from "./user_menu";
import { Menu } from "../../elements/Menu";
import { ConnectionMenu } from "./menus/connections_menu";
import { NotificationMenu } from "./menus/notification_menu";
import { ConnectionBadge } from "./connection.badge";
import { NotificationBadge } from "./notification.badge";


interface NavbarRightProps {
  user: JwtUser | null;
  className?: string
}

const loginBtn = `
  hidden md:inline-flex items-center justify-center
  rounded-3xl px-5 py-1 font-bold text-white
  bg-sky-600 hover:bg-sky-500
  dark:bg-sky-700 dark:hover:bg-sky-600
  focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400
  transition-transform duration-200 hover:scale-110
`;


export function NavbarRight({ user, className }: NavbarRightProps) {

  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const [notificationOpen, setNotificationOpen] = useState<boolean>(false);
  const [connectionsOpen, setConnectionOpen] = useState<boolean>(false);


  const [notificationCount, setNotificationCount] = useState<number>(0);

  const onConnectionOpen = () => {
    setConnectionOpen(!connectionsOpen);
    setMenuOpen(false);
    setNotificationOpen(false);
  }

  const onNotificationOpen = () => {
    setNotificationOpen(!notificationOpen);
    setMenuOpen(false);
    setConnectionOpen(false);
  }

  return (
    <nav className="flex items-center gap-5">

      <ul className="hidden lg:flex items-center text-lg">

        {/* Connection Menu */}
        {user && <ConnectionBadge onOpen={onConnectionOpen} open={connectionsOpen} />}

        {user && <NotificationBadge onOpen={onNotificationOpen} open={notificationOpen} />}



        {/* Avatar / Login */}
        {user
          ?
          <div className="relative ml-3 mt-3">
            <button
              onClick={() => {
                setMenuOpen(!menuOpen)
                setConnectionOpen(false);
                setNotificationOpen(false);
              }}
              className={"relative inline-flex items-center gap-1 transition-colors duration-200 cursor-pointer"}>

              <Avatar size={40} className="rounded-lg" />
              <BiChevronDown />

            </button>
            {menuOpen && <UserMenu user={user} />}
          </div>
          :
          <div className="flex items-center gap-3">
            <NavLink
              to="/login"
              className={`${loginBtn}`}
            >
              Login
            </NavLink>

          </div>}



      </ul>



    </nav>
  );
}