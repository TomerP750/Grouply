import { Outlet } from "react-router-dom";



export function Panel() {
    return (
        <div className="flex-1 mx-10 my-5 ring-1ring-gray-500/50 rounded-xl
            bg-transparent shadow-2xl 
        ">
            <Outlet/>
        </div>
    )
}