import { useState } from "react";
import { BiHomeAlt2, BiSearch } from "react-icons/bi";
import { FaCode } from "react-icons/fa";
import { MdBookmarkBorder, MdDashboard, MdHome } from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";
import type { JwtUser } from "../../../redux/AuthSlice";
import { SearchBar } from "./search.bar/search_bar";
import { useFilters } from "../../../context/filter_context";
import { useTranslation } from "react-i18next";

const linkClasses = ({ isActive }: { isActive: boolean }) =>
  [
    "relative inline-flex items-center gap-2 px-3 py-1 text-base font-medium transition-all duration-200",
    "text-black dark:text-white",
    "after:content-[''] after:absolute after:left-0 after:-bottom-9 after:h-[2px] after:w-0 after:rounded-full after:transition-all after:duration-300",
    "after:bg-black dark:after:bg-slate-600 hover:after:w-full hover:after:bg-black dark:hover:after:bg-teal-400",
    isActive &&
    [
      "bg-black text-white py-2 rounded-lg",
      "dark:bg-teal-600 dark:text-slate-900",

      "after:w-0 hover:after:w-0 hover:after:bg-transparent dark:hover:after:bg-transparent",
    ].join(" "),
  ]
    .filter(Boolean)
    .join(" ");


const btn =
  [
    "cursor-pointer text-slate-600 dark:text-slate-300 hover:bg-gray-500/20 p-3",
  ].join(" ");

const hebrewStyle = "font-semibold text-xl";
const englishStyle = "font-normal text-sm";

interface NavbarCenterProps {
  user: JwtUser | null;
}

export function NavbarCenter({ user }: NavbarCenterProps) {

  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const { t, i18n } = useTranslation();
  const isHebrew = i18n.language === "he";
  const textClass = isHebrew ? hebrewStyle : englishStyle;

  const { clear } = useFilters();

  return (
    <div className="">
      {/* {user && <SearchBar />} */}
      {user && <ul className="hidden lg:flex items-center gap-5 text-lg ">
        <li>
        <NavLink onClick={clear} to="/" className={linkClasses}>
          <MdHome size={22} />
          <span className={textClass}>{t("nav.home")}</span>
        </NavLink>
      </li>

      <li>
        <NavLink onClick={clear} to="/archived" className={linkClasses}>
          <MdBookmarkBorder size={22} />
          <span className={textClass}>{t("nav.archived")}</span>
        </NavLink>
      </li>

      <li>
        <NavLink to="/review-project" className={linkClasses}>
          <FaCode size={22} />
          <span className={textClass}>{t("nav.reviewProject")}</span>
        </NavLink>
      </li>

      <li>
        <NavLink to={`/dashboard/${user?.id}`} className={linkClasses}>
          <MdDashboard size={22} />
          <span className={textClass}>{t("nav.dashboard")}</span>
        </NavLink>
      </li>


      </ul>}

      {searchOpen && <SearchBar open={searchOpen} onClose={() => setSearchOpen(false)} />}
    </div>
  );
}
