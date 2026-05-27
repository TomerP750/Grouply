import { BiCheckCircle } from "react-icons/bi";
import { resultDummy } from "../pages/review_project_page";


interface PositivesProps {
    
}

export function Positives() {
    return (
        <section>
            <div className="rounded-2xl border border-emerald-200/60 bg-emerald-50/60 shadow-sm p-5 dark:border-emerald-900/40 dark:bg-emerald-900/10">
                <h2 className="text-lg font-semibold text-emerald-800 mb-3 dark:text-emerald-300">
                    Positives
                </h2>
                <ul className="space-y-2">
                    {resultDummy.feedback.positives.map((p) => (
                        <li
                            key={p}
                            className="flex items-start gap-3 text-emerald-900 dark:text-emerald-200"
                        >
                            <BiCheckCircle className="mt-0.5" size={20} />
                            <span>{p}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}