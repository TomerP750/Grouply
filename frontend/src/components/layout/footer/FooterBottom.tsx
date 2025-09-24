import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export function FooterBottom() {
    return (
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} Grouply, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <NavLink to="#"><FaLinkedin size={22} className="hover:text-indigo-400" /></NavLink>
            <NavLink to="#"><FaGithub size={22} className="hover:text-indigo-400" /></NavLink>
            <NavLink to="#"><FaInstagram size={22} className="hover:text-indigo-400" /></NavLink>
          </div>
        </div>
    )
}