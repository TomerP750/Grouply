import { FaFilter, FaSearch, FaComments, FaUserCircle, FaUsers } from "react-icons/fa";


const featureData2 = [
    {
        icon: <FaUsers size={22} />,
        title: "Find Teams",
        desc: "Discover ongoing groups that ship features together.",
    },
    { icon: <FaFilter size={22} />, title: "Smart Filters", desc: "Match by tech stack or project name." },
    { icon: <FaComments size={22} />, title: "Project Rooms", desc: "Realtime chat for planning & reviews." },
    { icon: <FaUserCircle size={22} />, title: "Your Profile", desc: "Show projects you participated in." },
]

const featureData1 = [
    { icon: <FaFilter className="shrink-0" />, text: "Filter projects by tech (e.g., React, Spring, Node) & by name" },
    { icon: <FaSearch className="shrink-0" />, text: "Search and discover active teams looking for members" },
    { icon: <FaComments className="shrink-0" />, text: "Join realtime rooms with chat for planning & standups" },
    { icon: <FaUserCircle className="shrink-0" />, text: "Showcase your shipped work on a clean, HR‑friendly profile" },
]


export function AboutWhatIs() {
    return (
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="flex flex-col justify-center gap-4">
                    <h2 className="text-2xl font-bold sm:text-3xl">What is Grouply?</h2>
                    <p className="text-slate-600 dark:text-slate-300">
                        Grouply is a hub for developers who want to build in public and level‑up fast. Find a constant group that
                        ships feature projects together, or jump into an existing project room. Use powerful filters to match your
                        stack, then add shipped work to your portfolio‑ready profile.
                    </p>
                    <ul className="mt-2 space-y-2 text-sm">
                        {featureData1.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <span className="mt-1 text-teal-400">{item.icon}</span>
                                <span className="text-slate-700 dark:text-slate-200">{item.text}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Feature cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {featureData2.map((f) => (
                        <div
                            key={f.title}
                            className="rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md dark:bg-slate-800"
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-500/10">
                                    <span className="text-teal-400 dark:text-teal-400">{f.icon}</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-base font-semibold">{f.title}</h3>
                                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{f.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

    )
}