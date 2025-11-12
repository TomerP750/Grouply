import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export function FooterBottom() {
  return (
    <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 dark:text-slate-400">
      <p className="text-sm font-medium ">
        &copy; {new Date().getFullYear()} Grouply, Inc. All rights reserved.
      </p>
      <div className="flex items-center gap-5">
        <NavLink to="#">
          <FaLinkedin
            size={22}
            className=" hover:text-[#0A66C2] dark:hover:text-[#0A66C2]"
          />
        </NavLink>

        <NavLink to="#">
          <FaGithub
            size={22}
            className="hover:text-purple-600 dark:hover:text-purple-400"
          />
        </NavLink>


        <NavLink to="#">
          <FaInstagram
            size={22}
            className="hover:text-pink-500  dark:hover:text-pink-400"
          />
        </NavLink>


      </div>
    </div>
  )
}