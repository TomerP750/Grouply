import { Outlet } from "react-router-dom";



export function Panel() {
    return (
        <div className="flex-1 mx-10 my-5 ring-1ring-gray-500/50 rounded-xl
            bg-gradient-to-r from-sky-100 to-indigo-200 dark:from-slate-950 dark:to-stone-900
        ">
            <Outlet/>
        </div>
    )
}