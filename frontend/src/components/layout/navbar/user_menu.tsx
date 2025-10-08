import { BiChevronRight, BiCog, BiFolder, BiLogOut, BiMoon, BiQuestionMark, BiSun } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { logout, type JwtUser } from '../../../redux/AuthSlice';
import './user_menu_styles.css';
import { HiOutlineQuestionMarkCircle, HiQuestionMarkCircle } from 'react-icons/hi';
import { NavLink, useNavigate } from 'react-router-dom';
import { MdDashboard } from 'react-icons/md';
import { useTheme } from '../../../context/ThemeContext';
import { IoColorPaletteOutline } from 'react-icons/io5';
import { useState } from 'react';
import { toTitleCase } from '../../../util/util_functions';

interface UserMenuProps {
    user: JwtUser | null;
}

export function UserMenu({ user }: UserMenuProps) {

    if (!user) return null;

    const { firstName, lastName, email } = user;

    const fullName = firstName + " " + lastName;

    const { theme, toggle } = useTheme();
    const [themeOptionOpen, setThemeOptionOpen] = useState<boolean>(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    
    return (
        <main className="z-1000 user-menu gap-5 bg-gray-200 dark:bg-slate-950 flex flex-col items-start py-5 px-4 absolute -bottom-95 right-2 w-85 min-h-64 rounded-2xl shadow-2xl dark:text-gray-300">

            <section className='flex flex-col w-full '>
                <p>{fullName}</p>
                <p className='text-sm'>{user.email}</p>
                <NavLink to={`/profile/${user.id}`} className='inline-flex hover:underline justify-end text-sm self-end'>View Profile</NavLink>
            </section>

            <section className='flex flex-col gap-1 w-full'>

                {/* Dashboard */}
                <NavLink to={`/dashboard/${user.id}`} className="flex items-center justify-between hover:bg-slate-700/50 py-1 px-2 cursor-pointer">
                    <div className='flex gap-2'>
                        <MdDashboard size={20} />
                        <span className='text-sm'>Dashboard</span>
                    </div>
                    <BiChevronRight size={20} />
                </NavLink>

                {/* Projects */}
                <NavLink to={"/"} className="flex items-center justify-between hover:bg-slate-700/50 py-1 px-2 cursor-pointer">
                    <div className='flex gap-2'>
                        <BiFolder size={20} />
                        <span className='text-sm'>Projects</span>
                    </div>
                    <BiChevronRight size={20} />
                </NavLink>

                {/* Settings */}
                <div className="flex items-center hover:bg-slate-700/50 py-1 px-2 cursor-pointer"
                    onClick={() => navigate("/settings")}>
                    <div className='flex gap-2'>
                        <BiCog size={20} />
                        <span className='text-sm'>Settings</span>
                    </div>
                </div>
            </section>

            <div className="flex w-full font-medium dark:text-gray-300 justify-end items-center gap-2 px-2 py-1 cursor-pointer ">
                <IoColorPaletteOutline size={20} />
                <button onClick={toggle} className="text-sm cursor-pointer hover:underline">Theme: {theme === "dark" ? "Dark" : "Light"}</button>
            </div>

            <div className="flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-slate-700/50">
                <HiOutlineQuestionMarkCircle size={20} />
                <span className='text-sm'>Help and About</span>
            </div>


            <button
                onClick={handleLogout}
                className='w-full inline-flex gap-2 items-center px-2 py-1 text-rose-500 cursor-pointer hover:bg-slate-700/50'>
                <BiLogOut size={20} />
                <span className='text-sm'>Logout</span>
            </button>


        </main>
    )
}
