import { useState } from "react";
import { Navbar } from "../../layout/navbar/Navbar";
import { Filters } from "./Filters";
import { ProjectCard } from "./project_card";
import { BiLoaderAlt } from "react-icons/bi";


const dummies = [
    { id: 1, name: "project1", desc: "description very long description very long desciption" },
    { id: 2, name: "project2", desc: "description very long description very long desciption" },
    { id: 3, name: "project3", desc: "description very long description very long desciption" },
    { id: 4, name: "project4", desc: "description very long description very long desciption" },
]

export function SearchProjectsPage() {

    const [loading, setLoading] = useState<boolean>(false);

    const [projects, setProjects] = useState<undefined>();

    return (
        <main className="min-h-screen bg-gray-200 dark:bg-slate-950 px-5 pb-10">

            <Navbar />
            <Filters />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 justify-items-center gap-y-10 py-15">
                {dummies.map(d => <ProjectCard key={d.id} dummy={d} />)}

            </div>


            {/* Pagination */}
            <div className="flex justify-center gap-1 text-white">
                <button
                    disabled={loading}
                    onClick={() => setLoading(!loading)}
                    className={`inline-flex justify-center cursor-pointer bg-blue-600 
                hover:bg-blue-800 px-3 py-2 rounded-xl min-w-30 disabled:opacity-50 disabled:cursor-not-allowed`}>
                    {loading ? <BiLoaderAlt size={20} className="animate-spin" /> : "Load More"}
                </button>
            </div>
        </main>
    )
}