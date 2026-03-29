

const faqData = [
    {
        q: "Is Grouply only for juniors?",
        a: "No—anyone who wants to collaborate can join. But it’s especially helpful for juniors building experience.",
    },
    {
        q: "How do filters work?",
        a: "Filter by technologies (e.g., React, Spring, Node, WebSockets) and by project name to quickly find a match.",
    },
    {
        q: "What goes on my profile?",
        a: "Projects you participated in, your role, tech stack, and links to demos/PRs so HR can evaluate quickly.",
    },
]

export function AboutFaq() {
    return (
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <h2 className="text-2xl font-bold sm:text-3xl">FAQ</h2>
            <div className="mt-6 grid grid-cols-1 gap-4">
                {faqData.map((item) => (
                    <details key={item.q} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm open:shadow-md dark:border-slate-700 dark:bg-slate-800">
                        <summary className="cursor-pointer list-none text-base font-semibold">
                            {item.q}
                            <span className="float-right transition group-open:rotate-180">▾</span>
                        </summary>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.a}</p>
                    </details>
                ))}
            </div>
        </section>
    )
}