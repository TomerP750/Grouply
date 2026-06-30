import { NavLink } from 'react-router-dom';
import './Hero.css';

export function Hero() {

  return (
    <div
      className={`lg:sticky lg:top-0 lg:z-0 Hero min-h-screen shadow-lg shadow-gray-200 dark:shadow-gray-800
        bg-gradient-to-b
        from-neutral-200 via-blue-100 to-neutral-300
        dark:from-stone-900 dark:via-sky-950 dark:to-stone-950
        flex flex-col bg-cover bg-center pb-10`}
    >
     
      <header className="dark:text-white w-full md:w-2/3 flex-1 flex flex-col items-start justify-center px-10 gap-8">

        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <span className="inline-block h-2 w-2 rounded-full bg-sky-500 dark:bg-sky-500" />
          Built for devs who want to build together
        </span>

        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-400 w-5/6 text-4xl sm:text-3xl md:text-5xl lg:text-7xl font-bold ">
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
        bg-sky-500 hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-500 transition-colors duration-200
        px-4 py-2 rounded-lg font-medium'>
          <NavLink to={"/signup"}>Get Started</NavLink>
          </button>
        </div>

      </header>

    </div>
  );
}