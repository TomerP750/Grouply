

export function AboutHeader() {
    return (

        <section className="relative overflow-hidden">

            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <div className="flex flex-col items-start gap-6 md:gap-8">
                    
                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium shadow-sm dark:border-slate-700 dark:bg-slate-800">
                        <span className="inline-block h-2 w-2 rounded-full bg-indigo-500" />
                        Built for devs who want to build together
                    </span>

                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                        Grouply — Find a Team. Ship Projects. Grow Your Portfolio.
                    </h1>

                    <p className="max-w-3xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
                        You’re a junior or self‑taught developer looking for a team and real projects. Grouply helps you discover
                        ongoing feature teams, filter by tech stack or project name, join collaborative rooms with chat, and
                        showcase every project you’ve shipped on a clean profile that’s ready for HR.
                    </p>

                    {/* badges */}
                    <div className="flex flex-wrap items-center gap-3">
                        {[
                            "Filter by technologies",
                            "Project name search",
                            "Realtime rooms & chat",
                            "Profile with past projects",
                            "Team building",
                        ].map((t) => (
                            <span
                                key={t}
                                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium dark:bg-slate-800/80 dark:text-slate-200"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

        </section>
    )
}