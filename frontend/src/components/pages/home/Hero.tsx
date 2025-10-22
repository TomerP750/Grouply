import { FaArrowRight } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { Navbar } from "../../layout/navbar/Navbar";
import './Hero.css';

export function Hero() {


  return (
    <div
      className={`lg:sticky lg:top-0 lg:z-0 Hero min-h-screen shadow-lg shadow-gray-200 dark:shadow-gray-800
        bg-gradient-to-tr
        from-gray-200 via-blue-100 to-gray-300
        dark:from-gray-900 dark:via-teal-950 dark:to-gray-950
        flex flex-col bg-cover bg-center pb-10`}
    >
      <Navbar />

      <div className="dark:text-white w-full md:w-2/3 flex-1 flex flex-col items-start justify-center px-10 gap-8">

        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <span className="inline-block h-2 w-2 rounded-full bg-teal-500" />
          Built for devs who want to build together
        </span>

        <h1 className="w-5/6 text-4xl sm:text-3xl md:text-5xl lg:text-7xl text-blue-500 dark:text-white font-extrabold">
          Organize study groups with ease.
        </h1>

        <div className="dark:text-gray-400 text-xl text-black">
          <h2 className="text-md max-w-3xl">
            Create sessions, track progress, and keep your peers aligned — all in one place.
          </h2>
          <h2 className="text-md max-w-3xl">
            Share the project, or find open project to join
          </h2>
        </div>

        <div className="flex items-center gap-5">
          <button className='cursor-pointer text-white 
        bg-teal-600 hover:bg-teal-500 transition-colors duration-200
        px-4 py-2 
        
        from-teal-900 via-teal-700 to-teal-800 
        hover:from-teal-700 hover:via-teal-500 hover:to-teal-600 

        rounded-lg font-medium'><NavLink to={"/signup"}>Get Started</NavLink>
          </button>
          <NavLink to={"/about"}
            className='hover:scale-110 duration-200 inline-flex gap-2 items-center'>Learn More <FaArrowRight /></NavLink>
        </div>

        <p className={"text-gray-400 inline-flex items-center gap-2"}>Recruiter and looking for talent? 
          <NavLink to={"/recruiter/signup"} className='text-white cursor-pointer bg-teal-600 hover:bg-teal-500 transition-colors duration-200 px-3 py-2 rounded-lg'>Register Here</NavLink>
          </p>

      </div>



    </div>
  );
}