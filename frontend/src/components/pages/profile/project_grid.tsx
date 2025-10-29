import { useState } from "react"



export function ProjectGrid() {

    const [finishedProjects, setFinishedProjects] = useState();

    return (
        <div className="space-y-5 pb-10 flex flex-col w-full items-center">
            <h2 className="text-xl font-medium">10 Projects</h2>
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-items-center gap-8">
                <div className="h-90 aspect-square border" />
                <div className="h-90 aspect-square border" />
                <div className="h-90 aspect-square border" />
                <div className="h-90 aspect-square border" />
                <div className="h-90 aspect-square border" />
                <div className="h-90 aspect-square border" />

            </section>
        </div>
    )
}