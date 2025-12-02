import { useCallback, useEffect, useState } from "react";
import { BiFilter, BiLoaderAlt } from "react-icons/bi";
import { FilterProvider, useFilters } from "../../../context/filter_context";
import type { PostDTO } from "../../../dtos/models_dtos/post_dto";
import projectPostService from "../../../service/post_service";
import { Navbar } from "../../layout/navbar/Navbar";
import { FeedHeader } from "./feed_header";
import { Filters } from "./filters_area/filters";
import { PostCard } from "./post_card/post_card";
import { usePagination } from "../../../util/helper_hooks";
import postService from "../../../service/post_service";
import { toast } from "react-toastify";
import { MobileFilters } from "./filters_area/mobile_filters";
import { useNavigate } from "react-router-dom";
import { useSyncFiltersWithUrl } from "../../../hooks/useFiltersWithUrls";



export function Feed() {

    const [posts, setPosts] = useState<PostDTO[]>([]);

    const { sortDirection ,selectedRoles, selectedTechnologies } = useFilters();

    const [loading, setLoading] = useState<boolean>(false);

    const { pageCount, pagination } = usePagination(5);

    const navigate = useNavigate();


    const [hasMore, setHasMore] = useState<boolean>(false);


    useEffect(() => {
        setLoading(true)

        projectPostService.allPosts(pagination.pageIndex, pagination.pageSize)
            .then(res => {
                setPosts(res.content);
                setHasMore(res.last);
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

    const handleFilterChange = useCallback(() => {
        setLoading(true);
        postService.searchPosts(selectedRoles, selectedTechnologies, sortDirection)
            .then(res => {
                setPosts(res.content);
            })
            .catch(err => {
                toast.error(err.response.data);
            })
            .finally(() => {
                setLoading(false);
                console.log("selected roles:", selectedRoles);
                console.log("selected techs:", selectedTechnologies);

            })
    }, [selectedRoles, selectedTechnologies, sortDirection]);

    useEffect(() => {
        handleFilterChange();
    }, [handleFilterChange])

    
    useSyncFiltersWithUrl(selectedRoles, selectedTechnologies, sortDirection);

    return (
        <main className="min-h-screen pb-10">

            <Navbar />

            {/* POSTS AND FILTERS */}
            <div className="flex flex-col pt-10 md:pt-0 md:mt-5 px-5 md:px-0 lg:flex-row w-full items-center lg:items-start gap-6">
                <Filters />

                <MobileFilters/>
                {/* Main area */}
                <section className="w-full flex justify-center px-0 sm:px-5 pt-6">
                    {/* Width cap + centered */}
                    <div className="w-full grid grid-cols-1 justify-items-center lg:justify-items-start gap-y-10">

                        <FeedHeader />

                        {posts?.map(p => (
                            <PostCard
                                key={p.id}
                                projectPost={p}
                                onRemove={() => handleRemove(p.id)}
                            />
                        ))}
                    </div>



                </section>
            </div>


            {/* Pagination */}
            {hasMore && <div className="mt-10 flex justify-center gap-1 text-white">
                <button
                    disabled={loading}
                    className={`inline-flex justify-center cursor-pointer bg-blue-600 
                hover:bg-blue-800 px-3 py-2 rounded-xl min-w-30 disabled:opacity-50 disabled:cursor-not-allowed`}>
                    {loading ? <BiLoaderAlt size={20} className="animate-spin" /> : "Load More"}
                </button>
            </div>}

        </main>

    )
}