import { BiErrorCircle } from "react-icons/bi";
import { resultDummy } from "../pages/review_project_page";

interface ImprovementsProps {
    
}

export function Improvements() {
    return (
        <div className="rounded-2xl border border-amber-200/60 bg-amber-50/60 shadow-sm p-5 dark:border-amber-900/40 dark:bg-amber-900/10">
            <h2 className="text-lg font-semibold text-amber-800 mb-3 dark:text-amber-300">
                Improvements
            </h2>
            <ul className="space-y-2">
                {resultDummy.feedback.improvements.map((p) => (
                    <li
                        key={p}
                        className="flex items-start gap-3 text-amber-900 dark:text-amber-200"
                    >
                        <BiErrorCircle className="mt-0.5" size={20} />
                        <span>{p}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}