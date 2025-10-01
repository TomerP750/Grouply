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

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalPages, setTotalPages] = useState<number | null>(null);
    const [posts, setPosts] = useState<ProjectPostDTO[]>([]);

    const loadMore = () => {
        if (loading) return;
        if (totalPages !== null && page + 1 >= totalPages) return; // if no more pages
        setPage(p => p + 1);
    }

    useEffect(() => {
        setLoading(true)

        projectPostService.allPosts(page, size)
            .then(res => {
                setPosts(prev => (page === 0 ? res.content : [...prev, ...res.content]));
                setTotalPages(res.page.totalPages);
            })
            .catch(err => {
                console.log(err.response.data);
            })
            .finally(() => {
                setLoading(false)
            })
    }, [page, size]);


    const handleAdd = (newPost: ProjectPostDTO) => {
        setPosts(prev => [...prev, newPost]);
    };


    const handleRemove = (deletePostId: number) => {
        setPosts(prev => prev.filter(p => p.id !== deletePostId))
    }

    return (
        <main className="min-h-screen bg-gray-200 dark:bg-gradient-to-r dark:from-slate-900 dark:via-teal-950 dark:to-stone-900 pb-10">

            <Navbar />

            {/* FILTERS + ADD POST BUTTON */}
            <div className="flex items-center px-10">
                <div className="flex-1"><Filters /></div>
                <button
                    onClick={() => setModalOpen(true)}
                    className="inline-flex gap-1 text-white bg-blue-600 h-1/2 px-3 py-2 cursor-pointer hover:bg-blue-500 transition-colors">
                    <span>Add Post</span> <MdPostAdd size={25} />
                </button>

                {modalOpen && <CreatePostForm open={modalOpen} onClose={() => setModalOpen(false)} onAdd={(newPost) => handleAdd(newPost)} />}
            </div>

            {/* <div className="flex w-full items-start"> */}
                {/* POSTS */}
                <div className="shadow-4xl flex-1 shadow-white grid grid-cols-1 px-5 sm:px-0 justify-items-center gap-y-10 py-15">
                    {posts && posts.map(p => <ProjectCard key={p.id} projectPost={p} onRemove={() => handleRemove(p.id)} />)}
                </div>
                {/* <div className="hidden lg:block  bg-blue-500 w-70 h-90 fixed right-15"></div> */}
            {/* </div> */}



            {/* Pagination */}
            {posts && posts.length > 1 && <div className="flex justify-center gap-1 text-white">
                <button
                    disabled={loading}
                    onClick={loadMore}
                    className={`inline-flex justify-center cursor-pointer bg-blue-600 
                hover:bg-blue-800 px-3 py-2 rounded-xl min-w-30 disabled:opacity-50 disabled:cursor-not-allowed`}>
                    {loading ? <BiLoaderAlt size={20} className="animate-spin" /> : "Load More"}
                </button>
            </div>}
        </main>
    )
}