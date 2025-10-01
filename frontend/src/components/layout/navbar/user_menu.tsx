import { BiChevronRight, BiCog, BiFolder, BiLogOut, BiQuestionMark } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { logout, type JwtUser } from '../../../redux/AuthSlice';
import './user_menu_styles.css';
import { HiOutlineQuestionMarkCircle, HiQuestionMarkCircle } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';
import { MdDashboard } from 'react-icons/md';

interface UserMenuProps {
    user: JwtUser | null;
}

export function UserMenu({ user }: UserMenuProps) {

    if (!user) return null;

    const { firstName, lastName, email } = user;

    const fullName = firstName + " " + lastName;

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <main className="user-menu gap-5 bg-slate-950 flex flex-col items-start py-5 px-4 absolute -bottom-82 right-2 w-85 min-h-64 dark:text-white rounded-2xl shadow-2xl">

            <section className='flex flex-col w-full'>
                <p>{fullName}</p>
                <p className='text-sm'>something</p>
                <NavLink to={`/profile/${user.id}`} className='inline-flex justify-end text-sm self-end'>View Profile</NavLink>
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
                <div className="flex items-center justify-between hover:bg-slate-700/50 py-1 px-2 cursor-pointer">
                    <div className='flex gap-2'>
                        <BiCog size={20} />
                        <span className='text-sm'>Settings</span>
                    </div>
                </div>
            </section>

            <section className='flex flex-col w-full'>
                <div className="flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-slate-700/50">
                    <HiOutlineQuestionMarkCircle size={20} />
                    <span className='text-sm'>Help and About</span>
                </div>
            </section>

            <button
                onClick={handleLogout}
                className='w-full inline-flex gap-2 items-center px-2 py-1 text-rose-500 cursor-pointer hover:bg-slate-700/50'>
                <BiLogOut size={20} />
                <span className='text-sm'>Logout</span>
            </button>


        </main>
    )
}
