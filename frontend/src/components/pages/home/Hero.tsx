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

        <h1 className="w-4/5 text-4xl sm:text-3xl md:text-5xl lg:text-7xl font-semibold">
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
        bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 
        hover:bg-gradient-to-l hover:from-indigo-500 hover:via-indigo-600 hover:to-indigo-700 
        px-4 py-2 
        rounded-lg font-medium'><NavLink to={"/signup"}>Get Started</NavLink>
        </button>

      </div>

      
    </div>
  );
}