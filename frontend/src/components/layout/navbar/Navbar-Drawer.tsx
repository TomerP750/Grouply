import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { BiMoon, BiSun, BiX, BiUser, BiCog, BiLogOut } from "react-icons/bi";
import { useTheme } from "../../../context/ThemeContext";
import { useDispatch } from "react-redux";
import { logout, type JwtUser } from "../../../redux/AuthSlice";
import { Avatar } from "../../elements/Avatar";
import { useNavigate } from "react-router-dom";
import type { IconType } from "react-icons";

interface NavbarDrawerProps {
    user: JwtUser | null;
    open: boolean;
    onClose: () => void;
}

export function NavbarDrawer({ onClose, open, user }: NavbarDrawerProps) {
    const dispatch = useDispatch();
    const { theme, toggle } = useTheme();

    // Mount/unmount for exit animation
    const [mounted, setMounted] = useState(open);
    useEffect(() => {
        if (open) setMounted(true);
    }, [open]);


    useEffect(() => {
        if (!mounted) return;
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, [mounted]);


    const panelRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();

    const handleNavItemClick = (to: string) => {
        navigate(to)
        onClose()
    }

    const handleLogout = () => dispatch(logout());

    if (!mounted) return null;

    return (
        <>
            {/* Overlay */}
            <button
                aria-label="Close drawer"
                onClick={onClose}
                className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity duration-300
                   ${open ? "opacity-100" : "opacity-0"}`}
            />

            {/* Panel */}
            <div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                className={`fixed right-0 top-0 z-[70] h-full w-[22rem] max-w-[90vw]
                    bg-white dark:bg-slate-900
                    shadow-2xl border-l border-slate-200/70 dark:border-slate-800
                    transition-transform duration-300
                    ${open ? "translate-x-0" : "translate-x-full"}`}
                onTransitionEnd={() => { if (!open) setMounted(false); }}
            >
                {/* Header */}
                <div className="flex items-center justify-between gap-3 p-4 border-b border-slate-200/70 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                        <Avatar user={user} size={40} />
                        <div className="flex flex-col leading-tight">
                            <span className="text-sm text-slate-500 dark:text-slate-400">Signed in as</span>
                            <span className="text-base font-medium text-slate-900 dark:text-slate-100">
                                {user?.username || user?.email || "Unknown User"}
                            </span>
                        </div>
                    </div>
                    <button onClick={onClose} aria-label="Close" className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                        <BiX size={22} />
                    </button>
                </div>

                {/* Nav */}
                <nav className="p-2">
                    <DrawerButton label="Profile" icon={<BiUser size={20} />} onClick={() => handleNavItemClick(`/profile/${user?.id}`)} />
                    <DrawerButton label="Settings" icon={<BiCog size={20} />} onClick={() => handleNavItemClick("/settings")} />
                    <hr className="my-3 border-slate-200 dark:border-slate-800" />
                    <DrawerButton
                        label="Sign out"
                        icon={<BiLogOut size={20} />}
                        onClick={handleLogout}
                        className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30"
                    />
                </nav>

                {/* Footer actions */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200/70 dark:border-slate-800 flex items-center justify-center">

                    <button
                        onClick={toggle}
                        className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl transition
                        cursor-pointer
                        ${theme === "dark" ? "bg-indigo-900/40 text-yellow-300" : "bg-slate-900 text-white"}`}
                        aria-label="Toggle theme"
                    >
                        {theme === "dark" ? <BiSun size={18} /> : <BiMoon size={18} />}
                        <span className="text-sm">{theme === "dark" ? "Light" : "Dark"}</span>
                    </button>
                </div>
            </div>
        </>
    );
}

type DrawerButton = {
    label: string
    icon: ReactNode
    onClick?: () => void 
    className?: string 
}

function DrawerButton({ label, icon, onClick, className}: DrawerButton) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer
                 text-slate-800 dark:text-slate-100
                 hover:bg-slate-100 dark:hover:bg-slate-800 transition ${className}`}
        >
            <span className="grid place-items-center h-8 aspect-square ">
                {icon}
            </span>
            <span className="text-base">{label}</span>
        </button>
    );
}
