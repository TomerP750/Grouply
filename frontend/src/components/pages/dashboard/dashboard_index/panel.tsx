import { Outlet } from "react-router-dom";



export function Panel() {
    return (
        <div className="flex-1 mx-10 my-5 bg-gray-300 dark:bg-slate-950 ring-1 ring-gray-500/50 rounded-xl">
            <Outlet/>
        </div>
    )
}