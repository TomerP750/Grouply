import { NavLink } from "react-router-dom";
import { Menu } from "../../elements/Menu";
import { HiUserGroup, HiFolderOpen, HiCpuChip } from "react-icons/hi2";
import { HiClipboardList } from "react-icons/hi";

const linkClasses = ({ isActive }: { isActive: boolean }) =>
  [
    "flex items-center gap-3 px-3 py-2 rounded-xl transition-colors duration-200",
    "hover:bg-teal-500/10 dark:hover:bg-teal-400/10",
    isActive
      ? "text-teal-600 dark:text-teal-400 font-semibold"
      : "text-gray-800 dark:text-gray-200",
  ].join(" ");


interface AdminMenuProps {
  onClose: () => void;
}

export function AdminMenu({ onClose }: AdminMenuProps) {

  return (
    <Menu className="absolute right-0 mt-3 w-80 p-5 rounded-2xl shadow-2xl border border-gray-200/40 dark:border-slate-800/60 bg-white/80 dark:bg-slate-950/90 backdrop-blur-xl">

      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Admin Menu</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">Manage data & content</p>
      </div>

      <ul className="space-y-2">
        <li>
          <button onClick={onClose}>
            <NavLink to="manage/users" className={linkClasses}>
              <HiUserGroup size={18} /> Users
            </NavLink>
          </button>
        </li>
        <li>
          <button onClick={onClose}>
            <NavLink to="manage/posts" className={linkClasses}>
              <HiClipboardList size={18} /> Posts
            </NavLink>
          </button>
        </li>
        <li>
          <button onClick={onClose}>
            <NavLink to="manage/projects" className={linkClasses}>
              <HiFolderOpen size={18} /> Projects
            </NavLink>
          </button>
        </li>
        <li>
          <button onClick={onClose}>
            <NavLink to="manage/technologies" className={linkClasses}>
              <HiCpuChip size={18} /> Technologies
            </NavLink>
          </button>
        </li>
      </ul>
    </Menu>
  );
}
