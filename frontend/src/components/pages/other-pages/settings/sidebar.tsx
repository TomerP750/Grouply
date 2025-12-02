import { BiLogOut, BiShield, BiUser } from "react-icons/bi";
import { MdDisplaySettings } from "react-icons/md";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../../../redux/AuthSlice";
import { useTransition } from "react";
import { useTranslation } from "react-i18next";

const menuItem =
  "cursor-pointer inline-flex items-center gap-3 w-full py-2 px-3 rounded-lg transition-colors text-slate-600 dark:text-slate-300 hover:bg-sky-500/10 hover:text-sky-600 dark:hover:bg-teal-500/10 dark:hover:text-teal-400";

const active =
  "bg-sky-500/20 text-sky-700 dark:bg-teal-500/20 dark:text-teal-300 font-semibold";



export function SettingsSidebar() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  }

  return (
    <aside className="w-55 lg:w-75 min-h-screen font-medium">
      <ul className="flex flex-col items-start px-3 py-5 gap-0.5">

        <li className="w-full">
          <NavLink
            to="/settings"
            end
            className={({ isActive }) =>
              `${menuItem} ${isActive ? active : ""}`
            }
          >
            <BiUser size={25} />
            <p>{t("setting.account")}</p>
          </NavLink>
        </li>

        <li className="w-full">
          <NavLink
            to="/settings/security"
            className={({ isActive }) =>
              `${menuItem} ${isActive ? active : ""}`
            }
          >
            <BiShield size={25} />
            <p>{t('setting.security')}</p>
          </NavLink>
        </li>

        <li className="w-full">
          <NavLink
            to="/settings/display"
            className={({ isActive }) =>
              `${menuItem} ${isActive ? active : ""}`
            }
          >
            <MdDisplaySettings size={25} />
            <p>{t('setting.display')}</p>
          </NavLink>
        </li>

        <li className="w-full">
          <button onClick={handleLogout} className={`${menuItem}`}>
            <BiLogOut size={25} />
            <p>{t('setting.logout')}</p>
          </button>
        </li>

      </ul>
    </aside>
  );
}
