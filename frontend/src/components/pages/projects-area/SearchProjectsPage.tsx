import { useState } from "react";
import { Navbar } from "../../layout/navbar/Navbar";
import { Filters } from "./Filters";
import { ProjectCard } from "./project_card";
import { BiLoaderAlt } from "react-icons/bi";
import { dummies } from "./dummies";
import type { ProjectPostDTO } from "../../../dtos/models_dtos/ProjectPostDTO";



export function SearchProjectsPage() {

    const [loading, setLoading] = useState<boolean>(false);

    const [posts, setPosts] = useState<ProjectPostDTO[]>();

    return (
        <main className="min-h-screen bg-gray-200 dark:bg-slate-950 px-5 pb-10">

            <Navbar />
            <Filters />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 justify-items-center gap-y-10 py-15">
                {dummies.map(p => <ProjectCard key={p.id} projectPost={p} />)}

            </div>


            {/* Pagination */}
            {dummies.length > 9 && <div className="flex justify-center gap-1 text-white">
                <button
                    disabled={loading}
                    onClick={() => setLoading(!loading)}
                    className={`inline-flex justify-center cursor-pointer bg-blue-600 
                hover:bg-blue-800 px-3 py-2 rounded-xl min-w-30 disabled:opacity-50 disabled:cursor-not-allowed`}>
                    {loading ? <BiLoaderAlt size={20} className="animate-spin" /> : "Load More"}
                </button>
            </div>}
        </main>
    )
}