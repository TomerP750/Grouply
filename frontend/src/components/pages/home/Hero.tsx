import './Hero.css'
import { Navbar } from "../../layout/navbar/Navbar";
import heroLight from "../../../assets/heroLight.png";
import heroDark from "../../../assets/heroDark.png";
import { useTheme } from "../../../context/ThemeContext";
import { NavLink } from 'react-router-dom';

export function Hero() {

  const { theme } = useTheme();

  return (
    <div
      className="Hero min-h-screen flex flex-col bg-cover bg-center pb-10"
      style={{
        backgroundImage: `url(${theme === "dark" ? heroDark : heroLight})`,
      }}
    >
      <Navbar />

      <div className="dark:text-white w-full md:w-2/3 flex-1 flex flex-col items-start justify-center px-10 gap-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <span className="inline-block h-2 w-2 rounded-full bg-teal-500" />
          Built for devs who want to build together
        </span>
        <h1 className="w-5/6 text-4xl sm:text-3xl md:text-5xl lg:text-7xl font-extrabold">
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

        <button className='cursor-pointer text-white 
        bg-gradient-to-r 
        hover:bg-gradient-to-l 
        px-4 py-2 

        dark:from:teal-700 dark:via-teal-500 dark:to-teal-600 
        dark:hover:from-teal-700 dark:hover:via-teal-500 dark:hover:to-teal-600 

        from-teal-900 via-teal-700 to-teal-800 
        hover:from-teal-700 hover:via-teal-500 hover:to-teal-600 

        rounded-lg font-medium'><NavLink to={"/signup"}>Get Started</NavLink>
        </button>

      </div>



    </div>
  );
}