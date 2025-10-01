import { useEffect, useState } from "react";
import { Navbar } from "../../layout/navbar/Navbar";
import { Filters } from "./Filters";
import { ProjectCard } from "./project_card/project_card";
import { BiLoaderAlt } from "react-icons/bi";
import type { ProjectPostDTO } from "../../../dtos/models_dtos/ProjectPostDTO";
import projectPostService from "../../../service/ProjectPostService";
import { MdPostAdd } from "react-icons/md";
import { Modal } from "../../elements/Modal";
import { CreatePostForm } from "./create_post_form";



export function SearchProjectsPage() {

    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);

    const [posts, setPosts] = useState<ProjectPostDTO[]>([]);


    useEffect(() => {
        setLoading(true)

        projectPostService.allPosts(0, 10)
            .then(res => {
                setPosts(res.content);
            })
            .catch(err => {
                console.log(err.response.data);
            })
            .finally(() => {
                setLoading(false)
            })
    }, []);


    const handleAdd = (newPost: ProjectPostDTO) => {
        setPosts(prev => [...prev, newPost]);
    };


    const handleRemove = (deletePostId: number) => {
        setPosts(prev => prev.filter(p => p.id !== deletePostId))
    }

    return (
        <main className="min-h-screen bg-gray-200 dark:bg-gradient-to-r dark:from-slate-900 dark:via-teal-950 dark:to-stone-900 pb-10">

            <Navbar />

            {/* ADD POST BUTTON */}

            <button
                onClick={() => setModalOpen(true)}
                className="inline-flex gap-1 text-white bg-blue-600 h-1/2 px-3 py-2 cursor-pointer hover:bg-blue-500 transition-colors">
                <span>Add Post</span> <MdPostAdd size={25} />
            </button>


            {/* POSTS AND FILTERS */}


            <div className="flex flex-col mt-5 md:mt-0 px-5 md:px-0 md:flex-row w-full items-start gap-6">
                <Filters />

                {/* Main area */}
                <div className="w-full flex justify-center px-0 sm:px-5 pt-6">
                    {/* Width cap + centered */}
                    <div className="w-full grid grid-cols-1 gap-y-10">
                        {posts?.map(p => (
                            <ProjectCard
                                key={p.id}
                                projectPost={p}
                                onRemove={() => handleRemove(p.id)}
                            />
                        ))}
                    </div>
                </div>
            </div>







            {/* Pagination */}
            {posts && posts.length > 1 && <div className="flex justify-center gap-1 text-white">
                <button
                    disabled={loading}
                    className={`inline-flex justify-center cursor-pointer bg-blue-600 
                hover:bg-blue-800 px-3 py-2 rounded-xl min-w-30 disabled:opacity-50 disabled:cursor-not-allowed`}>
                    {loading ? <BiLoaderAlt size={20} className="animate-spin" /> : "Load More"}
                </button>
            </div>}



            {modalOpen && <CreatePostForm open={modalOpen} onClose={() => setModalOpen(false)} onAdd={(newPost) => handleAdd(newPost)} />}

        </main>
    )
}