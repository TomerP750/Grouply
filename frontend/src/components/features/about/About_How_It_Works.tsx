
const data = [
    { step: 1,title: "Create your profile",desc: "Tell us your stack, interests, and availability." },
    { step: 2, title: "Filter & discover", desc: "Find projects by technologies or by name." },
    { step: 3, title: "Join a room", desc: "Collaborate in realtime chat with task planning." },
    { step: 4, title: "Show your work", desc: "Every shipped feature appears on your profile." },
]

export function AboutHowItWorks() {
    return (
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <h2 className="text-2xl font-bold sm:text-3xl">How it works</h2>
            <ol className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {data.map((s) => (
                    <li
                        key={s.step}
                        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800"
                    >
                        <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-teal-700 text-white font-semibold">
                            {s.step}
                        </div>
                        <h3 className="mt-3 text-base font-semibold">{s.title}</h3>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{s.desc}</p>
                    </li>
                ))}
            </ol>
        </section>
    )
}