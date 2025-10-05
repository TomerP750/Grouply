import { useEffect, useMemo, useState } from "react";
import { BiLoaderAlt, BiPlus } from "react-icons/bi";
import type { PostDTO } from "../../../dtos/models_dtos/PostDTO";
import projectPostService from "../../../service/PostService";
import { Navbar } from "../../layout/navbar/Navbar";
import { CreatePostForm } from "./create_post_form";
import { Filters, type FeedFilters } from "./Filters";
import { PostCard } from "./post_card/post_card";



export function Feed() {

    const [posts, setPosts] = useState<PostDTO[]>([]);

    const [filters, setFilters] = useState<FeedFilters>({
        postTitle: "",
        startDate: "",
    })

    const filteredPosts = useMemo(() => {
        
        return posts.filter((post) => {
            
            const matchProjectName =
                !filters.postTitle ||
                post.title
                    .toLowerCase()
                    .includes(filters.postTitle.toLowerCase());

            const matchStartDate =
                !filters.startDate ||
                new Date(post.postedAt) >= new Date(filters.startDate);

            const matchRole =
                !filters.roleDemand ||
                post.positions.some(
                    (p) => p.position === filters.roleDemand
                );

            return matchProjectName && matchStartDate && matchRole;
        });
    }, [posts, filters]);

    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);

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


    const handleAdd = (newPost: PostDTO) => {
        setPosts(prev => [...prev, newPost]);
    };


    const handleRemove = (deletePostId: number) => {
        setPosts(prev => prev.filter(p => p.id !== deletePostId))
    }

    return (
        <main className="min-h-screen bg-gray-200 dark:bg-gradient-to-r dark:from-slate-900 dark:via-teal-950 dark:to-stone-900 pb-10">

            <Navbar />

            {/* POSTS AND FILTERS */}
            <div className="flex flex-col pt-10 md:pt-0 md:mt-5 px-5 md:px-0 lg:flex-row w-full items-center lg:items-start gap-6">
                <Filters value={filters} setValue={setFilters}/>

                {/* Main area */}
                <div className="w-full flex justify-center px-0 sm:px-5 pt-6">
                    {/* Width cap + centered */}
                    <div className="w-full grid grid-cols-1 justify-items-center lg:justify-items-start gap-y-10">
                        <div className="flex max-w-3/4 justify-center">
                            <button
                                onClick={() => setModalOpen(true)}
                                className="inline-flex items-center gap-1 rounded-lg text-white bg-blue-600 px-3 py-1.5 cursor-pointer hover:bg-blue-500 transition-colors">
                                <BiPlus size={20} /><span>Add Post</span>
                            </button>
                        </div>
                        {filteredPosts?.map(p => (
                            <PostCard
                                key={p.id}
                                projectPost={p}
                                onRemove={() => handleRemove(p.id)}
                            />
                        ))}
                    </div>
                </div>
            </div>


            {/* Pagination */}
            {posts && posts.length > 3 && <div className="mt-10 flex justify-center gap-1 text-white">
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