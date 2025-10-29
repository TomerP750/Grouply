import { useState } from 'react';
import { BiChevronRight, BiCog, BiFolder, BiLogOut } from 'react-icons/bi';
import { HiOutlineQuestionMarkCircle } from 'react-icons/hi';
import { IoColorPaletteOutline } from 'react-icons/io5';
import { MdDashboard } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTheme } from '../../../context/ThemeContext';
import { logout, type JwtUser } from '../../../redux/AuthSlice';
import './user_menu_styles.css';


const rowStyle = "flex items-center justify-between hover:bg-gray-300/40 dark:hover:bg-gray-300/10 py-1 px-2 cursor-pointer";

interface UserMenuProps {
    user: JwtUser | null;
}

export function UserMenu({ user }: UserMenuProps) {

    if (!user) return null;

    const { firstName, lastName } = user;

    const fullName = firstName + " " + lastName;

    const { theme, toggle } = useTheme();
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    
    return (
        <main className="z-1000 user-menu gap-5 bg-gray-200 dark:bg-slate-950 flex flex-col items-start py-5 px-4 absolute top-0 mt-15 -right-3 w-85 min-h-64 rounded-2xl shadow-2xl dark:text-gray-300">

            <section className='flex flex-col w-full '>
                <p>{fullName}</p>
                <p className='text-sm'>{user.email}</p>
                <NavLink to={`/profile/${user.id}`} className='inline-flex hover:underline justify-end text-sm self-end'>View Profile</NavLink>
            </section>

            <section className='flex flex-col gap-1 w-full'>

                {/* Dashboard */}
                <NavLink to={`/dashboard/${user.id}`} className={`${rowStyle}`}>
                    <div className='flex gap-2'>
                        <MdDashboard size={20} />
                        <span className='text-sm'>Dashboard</span>
                    </div>
                    <BiChevronRight size={20} />
                </NavLink>

                {/* Projects */}
                <NavLink to={"/"} className={`${rowStyle}`}>
                    <div className='flex gap-2'>
                        <BiFolder size={20} />
                        <span className='text-sm'>Projects</span>
                    </div>
                    <BiChevronRight size={20} />
                </NavLink>

                {/* Settings */}
                <div className={`${rowStyle}`}
                    onClick={() => navigate("/settings")}>
                    <div className='flex gap-2'>
                        <BiCog size={20} />
                        <span className='text-sm'>Settings</span>
                    </div>
                </div>
            </section>

            <div className="flex w-full font-medium dark:text-gray-300 justify-end items-center gap-2 px-2 py-1 ">
                <IoColorPaletteOutline size={20} />
                <button onClick={toggle} className="text-sm cursor-pointer hover:underline">Theme: {theme === "dark" ? "Dark" : "Light"}</button>
            </div>

            <NavLink to={"/about"} className="flex w-full items-center gap-2 px-2 py-1 cursor-pointer hover:bg-gray-300/40 dark:hover:bg-gray-300/10">
                <HiOutlineQuestionMarkCircle size={20} />
                <span className='text-sm'>Help and About</span>
            </NavLink>


            <button
                onClick={handleLogout}
                className='w-full inline-flex gap-2 items-center px-2 py-1 text-rose-500 cursor-pointer hover:bg-slate-700/50 dark:hover:bg-gray-300/10'>
                <BiLogOut size={20} />
                <span className='text-sm'>Logout</span>
            </button>


        </main>
    )
}
