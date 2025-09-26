import { BiChevronDown } from "react-icons/bi";



export function Filters() {
    return (
        <div className="grid grid-cols-5 gap-5 text-white w-full px-5">
            <label className="inline-flex flex-col gap-3">
                Search By Project Name
                <input type="text" className="border-b border-white focus:outline-none" />
            </label>

            <label className="inline-flex flex-col gap-3">
                Search By Start Of Project
                <input type="date" className="border-b border-white focus:outline-none" />
            </label>


            <select
                className="w-43 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 shadow-sm
             focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition
             dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600 appearance-none"
            >

                <option value="">Search By Role Needed</option>
                <option value="backend">Backend</option>
                <option value="frontend">Frontend</option>
                <option value="fullstack">Full Stack</option>

            </select>


        </div>
    )
}