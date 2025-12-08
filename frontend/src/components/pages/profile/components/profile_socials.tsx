import { FaLinkedin, FaGithub, FaLink } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import type { ProfileDTO } from "../../../../dtos/models_dtos/profile_dto";

const linkStyle = [
  "inline-flex items-center justify-center gap-2",
  "rounded-full px-4 py-1.5",
  "border text-xs sm:text-sm font-medium",
  // light
  "border-slate-300 text-slate-700 bg-white/95",
  "hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50",
  // dark
  "dark:border-slate-700 dark:text-slate-100 dark:bg-slate-900/90",
  "dark:hover:border-blue-500 dark:hover:text-blue-300 dark:hover:bg-slate-800",
  "transition-colors duration-150",
].join(" ");


interface ProfileSocialsProps {
  profile: ProfileDTO;
}

export function ProfileSocials({ profile }: ProfileSocialsProps) {
  
  return (
    <section className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm">
      <NavLink to="/" className={linkStyle}>
        <FaLinkedin size={18} />
        <span>LinkedIn</span>
      </NavLink>

      <NavLink to="/" className={linkStyle}>
        <FaGithub size={18} />
        <span>GitHub</span>
      </NavLink>

      <NavLink to="/" className={linkStyle}>
        <FaLink size={18} />
        <span>Portfolio</span>
      </NavLink>
    </section>
  );
}

