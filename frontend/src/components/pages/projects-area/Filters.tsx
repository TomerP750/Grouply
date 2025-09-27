import { BiChevronDown } from "react-icons/bi";



export function Filters() {
    return (
        <div className="grid grid-cols-5 gap-5 dark:text-white w-full px-5">
            <label className="inline-flex flex-col gap-3">
                Search By Project Name
                <input type="search" className="px-2 py-1 bg-gray-300 dark:bg-slate-800 focus:outline-none" />
            </label>

            <label className="inline-flex flex-col gap-3">
                Search By Start Of Project
                <input type="date" className="bg-gray-300 dark:bg-slate-800 px-2 py-1 focus:outline-none " />
            </label>


            <select
                className="w-43 rounded-lg border border-slate-300 
                bg-gray-300 px-3 text-sm text-slate-700 shadow-sm
             dark:bg-slate-800 dark:text-slate-200 
             dark:border-slate-600 appearance-none"
            >

                <option value="">Search By Role Demand</option>
                <option value="backend">Backend</option>
                <option value="frontend">Frontend</option>
                <option value="fullstack">Full Stack</option>

            </select>


        </div>
    )
}