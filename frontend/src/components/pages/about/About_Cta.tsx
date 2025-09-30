import { NavLink } from "react-router-dom";



export function AboutCta() {
    return (
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-20">
            <div className="rounded-2xl p-6 text-center shadow-sm ">
                <h3 className="text-2xl font-bold">Ready to meet your next team?</h3>
                <p className="mt-2 text-slate-600 dark:text-slate-300">
                    Start filtering projects, join a room, and put shipped features on your profile.
                </p>
                <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                    <NavLink
                        to="/signup"
                        className="inline-flex items-center justify-center 
                        rounded-xl bg-white px-5 py-2.5 
                        text-sm font-semibold hover:bg-slate-50 
                        focus:outline-none focus:ring-2 focus:ring-slate-300 
                        dark:bg-gradient-to-bl dark:from-teal-900 dark:via-teal-700 dark:to-teal-800"
                    >
                        Sign Up Free
                    </NavLink>
                </div>
            </div>
        </section>
    )
}