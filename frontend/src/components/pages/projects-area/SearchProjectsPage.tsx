import { useState } from "react";
import { Navbar } from "../../layout/navbar/Navbar";
import { Filters } from "./Filters";
import { ProjectCard } from "./project_card";


const dummies = [
    {id: 1, name:"project1", desc: "description very long description very long desciption"},
    {id: 2, name:"project2", desc: "description very long description very long desciption"},
    {id: 3, name:"project3", desc: "description very long description very long desciption"},
    {id: 4, name:"project4", desc: "description very long description very long desciption"},
]

export function SearchProjectsPage() {

    const [projects, setProjects] = useState<undefined>();

    return (
        <main className="min-h-screen bg-gray-200 dark:bg-slate-900 px-5">
         
            <Navbar/>
            <Filters/>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 justify-items-center gap-y-10 py-10">
                {dummies.map(d => <ProjectCard key={d.id} dummy={d}/>)}
                
            </div>

        </main>
    )
}